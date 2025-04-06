'use client'

import MenuVertical from '@/components/MenuVertical'
import { InputArquivo } from '@/components/InputArquivo'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

export default function ImportarArquivo() {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <MenuVertical />

            <main className="flex-1 p-1 md:p-2 lg:p-4 overflow-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                    <h1 className="text-xl font-bold text-gray-800">Importar Arquivos</h1>
                </div>
                <Separator />
                <div className="flex flex-col my-4">
                    <div className="mb-4">
                        <Label className="mb-2">Tipo de Arquivo</Label>
                        {/* <p className="text-sm text-gray-500 mb-2 italic">Selecione o tipo de arquivo que deseja importar.</p> */}
                        <RadioGroup defaultValue="comfortable">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="nf" id="r1" />
                                <Label htmlFor="r1">NFe - Nota Fiscal Eletrônica</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cte" id="r2" />
                                <Label htmlFor="r2">CTe - Conhecimento de Frete Eletrônico</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div>
                        <div className="mb-4">
                            <InputArquivo />
                        </div>
                        <Separator />
                        <div className="mt-5">
                            {/* <Label className="mb-2">Logs</Label> */}
                            <Textarea
                                placeholder="Resultados das importações"
                                disabled
                                className="disabled:hover:cursor-default w-full h-[440px]"
                            />
                        </div>
                    </div>
                    {/* <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Pesquisar CTEs..."
                            className="pl-8"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                    </div> */}
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
            </main>
        </div>
    )
}
