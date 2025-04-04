'use client'

import { useState } from 'react'
import MenuVertical from '@/components/MenuVertical'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { format, addMonths as addMonthsFn } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DatePicker } from '@/components/InputData'
import { MensagemAviso } from '@/components/Mensagem'

function gerarPeriodos() {
    const periodos = []
    const agora = new Date()
    for (let i = -6; i <= 6; i++) {
        const data = addMonthsFn(agora, i)
        periodos.push({ value: format(data, 'yyyy-MM'), label: format(data, 'MMMM/yyyy', { locale: ptBR }) })
    }
    periodos.push({ value: String(agora.getFullYear()), label: String(agora.getFullYear()) })
    periodos.push({ value: 'personalizado', label: 'Personalizado' })
    return periodos
}

export default function Home() {
    const mesAtual = format(new Date(), 'yyyy-MM')
    const [periodoSelecionado, setPeriodoSelecionado] = useState(mesAtual)
    const [dataInicial, setDataInicial] = useState<Date | undefined>(undefined)
    const [dataFinal, setDataFinal] = useState<Date | undefined>(undefined)
    const periodos = gerarPeriodos()

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <MenuVertical />

            <main className="flex-1 p-1 md:p-2 lg:p-4 overflow-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h1 className="text-xl font-bold text-gray-800">Controle Financeiro de Frete</h1>
                    <div className="flex items-center gap-2">
                        {periodoSelecionado === 'personalizado' && (
                            <>
                                <DatePicker selected={dataInicial} onChange={setDataInicial} placeholderText="Data Inicial" />
                                <DatePicker
                                    selected={dataFinal}
                                    onChange={(date) => {
                                        if (dataInicial && date && date < dataInicial) {
                                            MensagemAviso('A data final não pode ser menor que a data inicial.')
                                            return
                                        }
                                        setDataFinal(date)
                                    }}
                                    placeholderText="Data Final"
                                />
                            </>
                        )}
                        <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Selecione o período" />
                            </SelectTrigger>
                            <SelectContent>
                                {periodos.map((periodo) => (
                                    <SelectItem key={periodo.value} value={periodo.value}>
                                        {periodo.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Receitas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">R$ 45.250,00</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Despesas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">R$ 32.180,75</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Saldo</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-green-600">R$ 13.069,25</p>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2 lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Resumo Mensal</CardTitle>
                        </CardHeader>
                        <CardContent className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                            <p className="text-gray-500">Gráfico de resumo mensal será exibido aqui</p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
