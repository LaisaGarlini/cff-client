'use client'

import React from 'react'
import {
    faHome,
    faChartLine,
    faCog,
    faMoneyBillTransfer,
    faPlus,
    faFileCode,
    faReceipt,
    faTruckFast,
} from '@fortawesome/free-solid-svg-icons'
import { TooltipProvider } from '@/components/ui/tooltip'
import { MenuVerticalItem } from '@/components/MenuVerticalItem'

const VerticalMenu = () => {
    return (
        <TooltipProvider>
            <div className="flex flex-col w-16 bg-zinc-800 text-white h-screen p-4 rounded-tr-3xl rounded-br-3xl">
                <div className="flex-1 space-y-4">
                    <MenuVerticalItem href="/home" icon={faHome} title="Home" />

                    <MenuVerticalItem href="/dashboard" icon={faChartLine} title="Dashboards" />

                    <MenuVerticalItem href="/lancamento_financeiro_cadastro" icon={faPlus} title="Novo Lançamento Financeiro" />

                    <MenuVerticalItem href="/lancamento_financeiro" icon={faMoneyBillTransfer} title="Consultar Lançamentos Financeiros" />

                    <MenuVerticalItem href="/nota_fiscal_consulta" icon={faReceipt} title="Consultar Notas Fiscais" />

                    <MenuVerticalItem href="/cte_consulta" icon={faTruckFast} title="Consultar CT-e's" />

                    <MenuVerticalItem href="/importar_csv" icon={faFileCode} title="Importar Arquivo XML" />
                </div>

                <div className="mt-auto">
                    <MenuVerticalItem href="/configuracoes" icon={faCog} title="Configurações" />
                </div>
            </div>
        </TooltipProvider>
    )
}

export default VerticalMenu
