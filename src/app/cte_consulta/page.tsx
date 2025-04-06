'use client'

import { useState } from 'react'
import type { CTEDTO } from '@/app/dto/cte.dto'
import type { CriaColunasProps } from '@/components/CriarColunaTabelaConsulta'
import { TabelaPadrao } from '../../components/TabelaConsulta'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import MenuVertical from '@/components/MenuVertical'
import { formatarData, formatarMoeda, formatarPeso } from '@/lib/utils'

const dadosEstaticos: CTEDTO[] = [
    {
        id: 1,
        chave: '42123456789012345678901234567890123456789012',
        data: '2023-01-15T08:30:00',
        municipio_id_inicio: 3550308,
        municipio_id_fim: 3304557,
        pessoa_id_emitente: 1001,
        pessoa_id_remetente: 2001,
        pessoa_id_destinatario: 3001,
        valor_servico: 1250.5,
        valor_carga: 25000.0,
        peso: 1250.75,
        municipio_inicio: 'São Paulo - SP',
        municipio_fim: 'Rio de Janeiro - RJ',
        pessoa_emitente: 'Transportadora ABC Ltda',
        pessoa_remetente: 'Indústria XYZ S.A.',
        pessoa_destinatario: 'Comércio 123 Ltda',
    },
    {
        id: 2,
        chave: '42098765432109876543210987654321098765432109',
        data: '2023-01-16T10:45:00',
        municipio_id_inicio: 4106902,
        municipio_id_fim: 3550308,
        pessoa_id_emitente: 1001,
        pessoa_id_remetente: 2002,
        pessoa_id_destinatario: 3002,
        valor_servico: 980.75,
        valor_carga: 18500.0,
        peso: 875.25,
        municipio_inicio: 'Curitiba - PR',
        municipio_fim: 'São Paulo - SP',
        pessoa_emitente: 'Transportadora ABC Ltda',
        pessoa_remetente: 'Fábrica QWE Ltda',
        pessoa_destinatario: 'Distribuidora 456 S.A.',
    },
    {
        id: 3,
        chave: '42111122223333444455556666777788889999000011',
        data: '2023-01-17T14:20:00',
        municipio_id_inicio: 3304557,
        municipio_id_fim: 2304400,
        pessoa_id_emitente: 1002,
        pessoa_id_remetente: 2001,
        pessoa_id_destinatario: 3003,
        valor_servico: 2100.0,
        valor_carga: 42000.0,
        peso: 2150.0,
        municipio_inicio: 'Rio de Janeiro - RJ',
        municipio_fim: 'Fortaleza - CE',
        pessoa_emitente: 'Transportes XYZ S.A.',
        pessoa_remetente: 'Indústria XYZ S.A.',
        pessoa_destinatario: 'Atacado 789 Ltda',
    },
    {
        id: 4,
        chave: '42222233334444555566667777888899990000111122',
        data: '2023-01-18T09:15:00',
        municipio_id_inicio: 2927408,
        municipio_id_fim: 3106200,
        pessoa_id_emitente: 1002,
        pessoa_id_remetente: 2003,
        pessoa_id_destinatario: 3004,
        valor_servico: 1450.25,
        valor_carga: 31500.0,
        peso: 1680.5,
        municipio_inicio: 'Salvador - BA',
        municipio_fim: 'Belo Horizonte - MG',
        pessoa_emitente: 'Transportes XYZ S.A.',
        pessoa_remetente: 'Empresa RTY Ltda',
        pessoa_destinatario: 'Loja 321 S.A.',
    },
    {
        id: 5,
        chave: '42333344445555666677778888999900001111222233',
        data: '2023-01-19T16:40:00',
        municipio_id_inicio: 5300108,
        municipio_id_fim: 3550308,
        pessoa_id_emitente: 1003,
        pessoa_id_remetente: 2004,
        pessoa_id_destinatario: 3005,
        valor_servico: 3200.0,
        valor_carga: 65000.0,
        peso: 3250.75,
        municipio_inicio: 'Brasília - DF',
        municipio_fim: 'São Paulo - SP',
        pessoa_emitente: 'Logística 123 Ltda',
        pessoa_remetente: 'Distribuidora UIO S.A.',
        pessoa_destinatario: 'Supermercado 654 Ltda',
    },
    {
        id: 6,
        chave: '42444455556666777788889999000011112222333344',
        data: '2023-01-20T11:30:00',
        municipio_id_inicio: 4314902,
        municipio_id_fim: 4106902,
        pessoa_id_emitente: 1003,
        pessoa_id_remetente: 2005,
        pessoa_id_destinatario: 3006,
        valor_servico: 1850.5,
        valor_carga: 37500.0,
        peso: 1950.25,
        municipio_inicio: 'Porto Alegre - RS',
        municipio_fim: 'Curitiba - PR',
        pessoa_emitente: 'Logística 123 Ltda',
        pessoa_remetente: 'Indústria PAS Ltda',
        pessoa_destinatario: 'Centro Distribuição 987 S.A.',
    },
    {
        id: 7,
        chave: '42555566667777888899990000111122223333444455',
        data: '2023-01-21T13:45:00',
        municipio_id_inicio: 2611606,
        municipio_id_fim: 2704302,
        pessoa_id_emitente: 1004,
        pessoa_id_remetente: 2006,
        pessoa_id_destinatario: 3007,
        valor_servico: 1680.75,
        valor_carga: 29800.0,
        peso: 1580.0,
        municipio_inicio: 'Recife - PE',
        municipio_fim: 'Maceió - AL',
        pessoa_emitente: 'Transportadora DEF S.A.',
        pessoa_remetente: 'Fábrica DFG Ltda',
        pessoa_destinatario: 'Varejo 159 Ltda',
    },
    {
        id: 8,
        chave: '42666677778888999900001111222233334444555566',
        data: '2023-01-22T08:20:00',
        municipio_id_inicio: 1501402,
        municipio_id_fim: 1302603,
        pessoa_id_emitente: 1004,
        pessoa_id_remetente: 2007,
        pessoa_id_destinatario: 3008,
        valor_servico: 4500.0,
        valor_carga: 85000.0,
        peso: 4200.5,
        municipio_inicio: 'Belém - PA',
        municipio_fim: 'Manaus - AM',
        pessoa_emitente: 'Transportadora DEF S.A.',
        pessoa_remetente: 'Empresa HJK S.A.',
        pessoa_destinatario: 'Distribuidor 753 Ltda',
    },
    {
        id: 9,
        chave: '42777788889999000011112222333344445555666677',
        data: '2023-01-23T15:10:00',
        municipio_id_inicio: 3550308,
        municipio_id_fim: 5300108,
        pessoa_id_emitente: 1005,
        pessoa_id_remetente: 2008,
        pessoa_id_destinatario: 3009,
        valor_servico: 2750.25,
        valor_carga: 52000.0,
        peso: 2680.75,
        municipio_inicio: 'São Paulo - SP',
        municipio_fim: 'Brasília - DF',
        pessoa_emitente: 'Transportes GHI Ltda',
        pessoa_remetente: 'Indústria LZX Ltda',
        pessoa_destinatario: 'Comércio 852 S.A.',
    },
    {
        id: 10,
        chave: '42888899990000111122223333444455556666777788',
        data: '2023-01-24T10:30:00',
        municipio_id_inicio: 3106200,
        municipio_id_fim: 2927408,
        pessoa_id_emitente: 1005,
        pessoa_id_remetente: 2009,
        pessoa_id_destinatario: 3010,
        valor_servico: 1950.5,
        valor_carga: 41500.0,
        peso: 2050.25,
        municipio_inicio: 'Belo Horizonte - MG',
        municipio_fim: 'Salvador - BA',
        pessoa_emitente: 'Transportes GHI Ltda',
        pessoa_remetente: 'Fábrica CVB S.A.',
        pessoa_destinatario: 'Atacadista 963 Ltda',
    },
    {
        id: 11,
        chave: '42999900001111222233334444555566667777888899',
        data: '2023-01-25T14:15:00',
        municipio_id_inicio: 2304400,
        municipio_id_fim: 2611606,
        pessoa_id_emitente: 1006,
        pessoa_id_remetente: 2010,
        pessoa_id_destinatario: 3011,
        valor_servico: 2100.75,
        valor_carga: 47500.0,
        peso: 2250.0,
        municipio_inicio: 'Fortaleza - CE',
        municipio_fim: 'Recife - PE',
        pessoa_emitente: 'Logística JKL S.A.',
        pessoa_remetente: 'Empresa NMB Ltda',
        pessoa_destinatario: 'Distribuição 741 S.A.',
    },
    {
        id: 12,
        chave: '42000011112222333344445555666677778888999900',
        data: '2023-01-26T09:45:00',
        municipio_id_inicio: 4106902,
        municipio_id_fim: 4314902,
        pessoa_id_emitente: 1006,
        pessoa_id_remetente: 2011,
        pessoa_id_destinatario: 3012,
        valor_servico: 1800.0,
        valor_carga: 36000.0,
        peso: 1850.5,
        municipio_inicio: 'Curitiba - PR',
        municipio_fim: 'Porto Alegre - RS',
        pessoa_emitente: 'Logística JKL S.A.',
        pessoa_remetente: 'Indústria QPO Ltda',
        pessoa_destinatario: 'Varejo 852 Ltda',
    },
    {
        id: 13,
        chave: '42111122223333444455556666777788889999000011',
        data: '2023-01-27T16:20:00',
        municipio_id_inicio: 1302603,
        municipio_id_fim: 1501402,
        pessoa_id_emitente: 1007,
        pessoa_id_remetente: 2012,
        pessoa_id_destinatario: 3013,
        valor_servico: 5200.5,
        valor_carga: 98000.0,
        peso: 5150.75,
        municipio_inicio: 'Manaus - AM',
        municipio_fim: 'Belém - PA',
        pessoa_emitente: 'Transportadora MNO Ltda',
        pessoa_remetente: 'Empresa WER S.A.',
        pessoa_destinatario: 'Atacado 159 Ltda',
    },
    {
        id: 14,
        chave: '42222233334444555566667777888899990000111122',
        data: '2023-01-28T11:10:00',
        municipio_id_inicio: 2704302,
        municipio_id_fim: 2304400,
        pessoa_id_emitente: 1007,
        pessoa_id_remetente: 2013,
        pessoa_id_destinatario: 3014,
        valor_servico: 1650.25,
        valor_carga: 32500.0,
        peso: 1750.25,
        municipio_inicio: 'Maceió - AL',
        municipio_fim: 'Fortaleza - CE',
        pessoa_emitente: 'Transportadora MNO Ltda',
        pessoa_remetente: 'Fábrica TYU Ltda',
        pessoa_destinatario: 'Comércio 357 S.A.',
    },
    {
        id: 15,
        chave: '42333344445555666677778888999900001111222233',
        data: '2023-01-29T13:30:00',
        municipio_id_inicio: 3550308,
        municipio_id_fim: 3106200,
        pessoa_id_emitente: 1008,
        pessoa_id_remetente: 2014,
        pessoa_id_destinatario: 3015,
        valor_servico: 1950.0,
        valor_carga: 43500.0,
        peso: 2050.0,
        municipio_inicio: 'São Paulo - SP',
        municipio_fim: 'Belo Horizonte - MG',
        pessoa_emitente: 'Transportes PQR S.A.',
        pessoa_remetente: 'Indústria IOP S.A.',
        pessoa_destinatario: 'Distribuidor 951 Ltda',
    },
]

const colunas: CriaColunasProps = {
    selectVisible: true,
    colunas: [
        {
            accessorKey: 'data',
            label: 'Data/Hora',
            style: 'text-center',
            width: '140px',
            formatador: formatarData,
        },
        {
            accessorKey: 'municipio_inicio',
            label: 'Município Origem',
            style: 'text-left',
            width: '140px',
            formatador: (valor: string) => valor || '-',
        },
        {
            accessorKey: 'municipio_fim',
            label: 'Município Destino',
            style: 'text-left',
            width: '140px',
            formatador: (valor: string) => valor || '-',
        },
        {
            accessorKey: 'pessoa_destinatario',
            label: 'Destinatário',
            style: 'text-left',
            width: '140px',
            formatador: (valor: string) => valor || '-',
        },
        {
            accessorKey: 'valor_servico',
            label: 'Valor Serviço',
            width: '120px',
            style: 'text-right',
            formatador: formatarMoeda,
        },
        {
            accessorKey: 'valor_carga',
            label: 'Valor Carga',
            width: '120px',
            style: 'text-right',
            formatador: formatarMoeda,
        },
        {
            accessorKey: 'peso',
            label: 'Peso',
            width: '120px',
            style: 'text-right',
            formatador: formatarPeso,
        },
    ],
}

const colunasStyle = [
    { id: 'select', style: 'text-center w-[35px]' },
    { id: 'data', style: 'text-center' },
    { id: 'municipio_inicio', style: 'text-left' },
    { id: 'municipio_fim', style: 'text-left' },
    { id: 'pessoa_destinatario', style: 'text-left' },
    { id: 'valor_servico', style: 'text-right' },
    { id: 'valor_carga', style: 'text-right' },
    { id: 'peso', style: 'text-right' },
]

export default function CTEConsulta() {
    const [filtro, setFiltro] = useState('')

    const dadosFiltrados = dadosEstaticos.filter((cte) => {
        if (!filtro) return true

        const termoLowerCase = filtro.toLowerCase()
        return (
            cte.id.toString().includes(termoLowerCase) ||
            // cte.chave.includes(termoLowerCase) ||
            cte.data?.toLowerCase().includes(termoLowerCase) ||
            cte.municipio_inicio?.toLowerCase().includes(termoLowerCase) ||
            cte.municipio_fim?.toLowerCase().includes(termoLowerCase) ||
            cte.pessoa_destinatario?.toLowerCase().includes(termoLowerCase) ||
            cte.valor_servico?.toString().toLowerCase().includes(termoLowerCase) ||
            cte.valor_carga?.toString().toLowerCase().includes(termoLowerCase) ||
            cte.peso?.toString().toLowerCase().includes(termoLowerCase)
        )
    })

    // const exportarCSV = () => {
    //     const headers = [
    //         'ID',
    //         'Chave',
    //         'Data',
    //         'Município Origem',
    //         'Município Destino',
    //         'Emitente',
    //         'Remetente',
    //         'Destinatário',
    //         'Valor Serviço',
    //         'Valor Carga',
    //         'Peso',
    //     ]

    //     const csvData = dadosFiltrados.map((item) => [
    //         item.id,
    //         item.chave,
    //         formatarData(item.data),
    //         item.municipio_inicio || '',
    //         item.municipio_fim || '',
    //         item.pessoa_emitente || '',
    //         item.pessoa_remetente || '',
    //         item.pessoa_destinatario || '',
    //         formatarMoeda(item.valor_servico).replace('R$', '').trim(),
    //         formatarMoeda(item.valor_carga).replace('R$', '').trim(),
    //         formatarPeso(item.peso).replace(' kg', ''),
    //     ])

    //     const csvContent = [headers.join(','), ...csvData.map((row) => row.join(','))].join('\n')

    //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    //     const link = document.createElement('a')
    //     const url = URL.createObjectURL(blob)

    //     link.setAttribute('href', url)
    //     link.setAttribute('download', 'ctes.csv')
    //     link.style.visibility = 'hidden'

    //     document.body.appendChild(link)
    //     link.click()
    //     document.body.removeChild(link)
    // }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <MenuVertical />

            <main className="flex-1 p-1 md:p-2 lg:p-4 overflow-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                    <h1 className="text-xl font-bold text-gray-800">Consulta de CTE's</h1>
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filtros
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuItem>Por Data</DropdownMenuItem>
                                <DropdownMenuItem>Por Município Início</DropdownMenuItem>
                                <DropdownMenuItem>Por Município Fim</DropdownMenuItem>
                                <DropdownMenuItem>Por Destinatário</DropdownMenuItem>
                                <DropdownMenuItem>Por Valor do Serviço</DropdownMenuItem>
                                <DropdownMenuItem>Por Valor da Carga</DropdownMenuItem>
                                <DropdownMenuItem>Por Peso</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Pesquisar CTEs..."
                            className="pl-8"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                    </div>
                    {/* <div className="flex gap-2">
                        <Button variant="outline" onClick={exportarCSV}>
                            <FileDown className="mr-2 h-4 w-4" />
                            Exportar
                        </Button>
                        <Button onClick={() => alert('Adicionar novo CTE')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Novo CTE
                        </Button>
                    </div> */}
                </div>
                <div className="m-0 p-0">
                    <TabelaPadrao
                        data={dadosFiltrados}
                        colunas={colunas}
                        colunasStyle={colunasStyle}
                        mensagemVazia="Nenhum CTE encontrado"
                        // onRowClick={handleRowClick}
                        // className="mb-6"
                    />
                </div>
            </main>
        </div>
    )
}
