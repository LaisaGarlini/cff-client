'use client'

import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
    type VisibilityState,
} from '@tanstack/react-table'
import { Card, CardContent } from '../components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { useState } from 'react'
import type { ColunaDTO } from '../app/dto/coluna.dto'
import { criaColunas, type CriaColunasProps } from '../components/CriarColunaTabelaConsulta'
import { Button } from '../components/ui/button'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

/**
 * Interface para as propriedades do componente TabelaPadrao
 * @param data Array de dados a serem exibidos na tabela
 * @param colunas Configuração das colunas da tabela
 * @param colunasStyle Estilos específicos para cada coluna
 * @param paginaInicial Página inicial (padrão: 0)
 * @param tamanhoPagina Tamanho da página (padrão: 12)
 * @param tamanhosPagina Opções de tamanho de página (padrão: [10, 20, 50])
 * @param carregando Indica se a tabela está carregando dados
 * @param mensagemVazia Mensagem a ser exibida quando não houver dados
 * @param onRowClick Função chamada ao clicar em uma linha
 */
interface TabelaPadraoProps<T> {
    data: T[]
    colunas: CriaColunasProps
    colunasStyle?: ColunaDTO[]
    paginaInicial?: number
    tamanhoPagina?: number
    tamanhosPagina?: number[]
    carregando?: boolean
    mensagemVazia?: string
    onRowClick?: (row: T) => void
    className?: string
}

/**
 * Componente de tabela padrão com recursos de ordenação, paginação e seleção
 */
export function TabelaPadrao<T>(props: TabelaPadraoProps<T>) {
    // Estados para controle da tabela
    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

    // Configurações padrão
    const tamanhoPagina = props.tamanhoPagina || 12
    // const tamanhosPagina = props.tamanhosPagina || [10, 20, 50]
    const mensagemVazia = props.mensagemVazia || 'Nenhum registro encontrado'

    // Cria as definições de colunas
    const columns: ColumnDef<T>[] = [
        ...criaColunas<T>({
            selectVisible: props.colunas.selectVisible,
            colunmAtivo: props.colunas.colunaAtivo,
            colunas: props.colunas.colunas,
        }),
    ]

    // Inicializa a tabela com o TanStack Table
    const table = useReactTable({
        data: props.data,
        columns: columns,
        state: {
            rowSelection,
            sorting,
            columnVisibility,
        },
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: tamanhoPagina,
                pageIndex: props.paginaInicial || 0,
            },
        },
    })

    /**
     * Retorna o estilo CSS para uma coluna específica
     * @param id ID da coluna
     * @returns String com classes CSS
     */
    function estiloColuna(id: string) {
        if (!props.colunasStyle) {
            return ''
        }

        const coluna = props.colunasStyle.find((coluna) => coluna.id === id)
        return coluna ? coluna.style : ''
    }

    /**
     * Cria um badge para exibir valores
     * @param value Valor a ser exibido no badge
     * @returns Elemento JSX com o badge
     */
    function badge(value: string) {
        return <span className={`px-2 py-1 rounded-full text-sm ${estiloColuna(value)}`}>{value}</span>
    }

    // Renderiza a tabela
    return (
        <Card className="m-0 p-0">
            <CardContent className="p-4">
                {props.carregando ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <TableHead key={header.id} className={estiloColuna(header.column.id)}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows.length > 0 ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                onClick={() => props.onRowClick && props.onRowClick(row.original)}
                                                className={props.onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : ''}
                                            >
                                                {row.getVisibleCells().map((cell) => {
                                                    const coluna = props.colunas.colunas.find(
                                                        (coluna) => coluna.accessorKey === cell.column.id,
                                                    )
                                                    return coluna?.colunaWithBadge ? (
                                                        <TableCell key={cell.id} className={estiloColuna(cell.column.id)}>
                                                            {badge(String(cell.getValue() || ''))}
                                                        </TableCell>
                                                    ) : (
                                                        <TableCell key={cell.id} className={estiloColuna(cell.column.id)}>
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </TableCell>
                                                    )
                                                })}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                                {mensagemVazia}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-3">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => table.setPageIndex(0)}
                                    disabled={!table.getCanPreviousPage()}
                                    aria-label="Primeira página"
                                    className="w-8 h-8 m-0 p-0"
                                >
                                    <ChevronsLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    aria-label="Página anterior"
                                    className="w-8 h-8 m-0 p-0"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                    aria-label="Próxima página"
                                    className="w-8 h-8 m-0 p-0"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                    disabled={!table.getCanNextPage()}
                                    aria-label="Última página"
                                    className="w-8 h-8 m-0 p-0"
                                >
                                    <ChevronsRight className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>
                                    Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                                </span>

                                {/* <span className="flex items-center gap-1">
                                    | Exibir
                                    <Select
                                        value={String(table.getState().pagination.pageSize)}
                                        onValueChange={(value) => table.setPageSize(Number(value))}
                                    >
                                        <SelectTrigger className="h-8 w-[70px]">
                                            <SelectValue placeholder={String(table.getState().pagination.pageSize)} />
                                        </SelectTrigger>
                                        <SelectContent side="top">
                                            {tamanhosPagina.map((pageSize) => (
                                                <SelectItem key={pageSize} value={String(pageSize)}>
                                                    {pageSize}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    por página
                                </span> */}
                            </div>

                            <div className="text-sm text-muted-foreground">
                                {table.getFilteredSelectedRowModel().rows.length > 0 && (
                                    <span>
                                        {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length}{' '}
                                        linha(s) selecionada(s)
                                    </span>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    )
}
