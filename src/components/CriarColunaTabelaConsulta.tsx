'use client'

import { faArrowDown, faArrowUp, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { CellContext, Column, ColumnDef, Table } from '@tanstack/react-table'
import { Checkbox } from '../components/ui/checkbox'

/**
 * Interface para configuração das colunas da tabela
 * @param selectVisible Define se a coluna de seleção deve ser exibida
 * @param colunaAtivo Define se a coluna de status ativo deve ser exibida
 * @param colunas Array com as configurações de cada coluna
 */
export interface CriaColunasProps {
    selectVisible?: boolean
    colunaAtivo?: boolean
    colunas: {
        accessorKey: string // Chave de acesso aos dados
        label: string // Texto de exibição no cabeçalho
        colunaWithBadge?: boolean // Define se a coluna deve exibir um badge
        style?: string // Estilos CSS adicionais
        width?: string // Largura da coluna (ex: '100px', '10%')
        ordenavel?: boolean // Define se a coluna pode ser ordenada (padrão: true)
        formatador?: (valor: any) => string // Função para formatar o valor exibido
    }[]
}

/**
 * Função que cria as definições de colunas para a tabela
 * @param configs Configurações das colunas
 * @returns Array de definições de colunas para o TanStack Table
 */
export function criaColunas<T>(configs: CriaColunasProps): ColumnDef<T>[] {
    // Definição da coluna de seleção (checkbox)
    const colunaSelect: ColumnDef<T> = {
        id: 'select',
        header: ({ table }: { table: Table<T> }) => (
            <div className="flex items-center justify-center h-full w-[30px]">
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Selecionar todas as linhas"
                />
            </div>
        ),
        cell: ({ row }: CellContext<T, unknown>) => (
            <div className="flex items-center justify-center h-full w-[30px]">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Selecionar linha"
                />
            </div>
        ),
    }

    // Mapeia as configurações para definições de colunas
    const colunas = configs.colunas.map<ColumnDef<T>>((config) => ({
        accessorKey: config.accessorKey,
        header: ({ column }: { column: Column<T, unknown> }) => {
            // Se a coluna não for ordenável, retorna apenas o label
            if (config.ordenavel === false) {
                return <div className={`p-1 ${config.style || ''}`}>{config.label}</div>
            }

            // Caso contrário, retorna um botão com ícones de ordenação
            return (
                <button
                    className={`flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded ${config.style || ''}`}
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    style={config.width ? { width: config.width } : undefined}
                    aria-label={`Ordenar por ${config.label}`}
                >
                    {config.label}
                    <span className="ml-2">
                        {column.getIsSorted() === 'asc' ? (
                            <FontAwesomeIcon icon={faArrowUp} className="h-3 w-3" />
                        ) : column.getIsSorted() === 'desc' ? (
                            <FontAwesomeIcon icon={faArrowDown} className="h-3 w-3" />
                        ) : (
                            <span className="h-3 w-3 opacity-0">•</span>
                        )}
                    </span>
                </button>
            )
        },
        // Configuração de largura da coluna, se fornecida
        size: config.width ? Number.parseInt(config.width) : undefined,
        // Célula com formatador personalizado, se fornecido
        cell: config.formatador
            ? ({ getValue }) => {
                  const valor = getValue()
                  return config.formatador ? config.formatador(valor) : String(valor || '')
              }
            : undefined,
    }))

    // Definição da coluna de status ativo
    const colunaAtivo: ColumnDef<T> = {
        accessorKey: 'ativo',
        header: ({ column }: { column: Column<T, unknown> }) => (
            <button
                className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                aria-label="Ordenar por status ativo"
            >
                Ativo
                <span className="ml-2">
                    {column.getIsSorted() === 'asc' ? (
                        <FontAwesomeIcon icon={faArrowUp} className="h-3 w-3" />
                    ) : column.getIsSorted() === 'desc' ? (
                        <FontAwesomeIcon icon={faArrowDown} className="h-3 w-3" />
                    ) : (
                        <span className="h-3 w-3 opacity-0">•</span>
                    )}
                </span>
            </button>
        ),
        cell: ({ row }: CellContext<T, unknown>) => (
            <div className="flex justify-center">
                {(row?.original as any)?.ativo ? (
                    <FontAwesomeIcon icon={faCheck} className="text-green-500" aria-label="Ativo" />
                ) : (
                    <span className="text-gray-400" aria-label="Inativo">
                        -
                    </span>
                )}
            </div>
        ),
    }

    // Monta o array final de colunas
    let colunasFinais = [...colunas]

    // Adiciona a coluna de status ativo, se configurado
    if (configs.colunaAtivo) {
        colunasFinais.push(colunaAtivo)
    }

    // Adiciona a coluna de seleção no início, se configurado
    if (configs.selectVisible) {
        colunasFinais = [colunaSelect, ...colunasFinais]
    }

    return colunasFinais
}
