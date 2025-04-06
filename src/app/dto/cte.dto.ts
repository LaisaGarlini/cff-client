export interface CTEDTO {
    id: number
    chave: string
    data: string
    municipio_id_inicio: number
    municipio_id_fim: number
    pessoa_id_emitente: number
    pessoa_id_remetente: number
    pessoa_id_destinatario: number
    valor_servico: number
    valor_carga: number
    peso: number
    // Campos adicionais para exibição
    municipio_inicio?: string
    municipio_fim?: string
    pessoa_emitente?: string
    pessoa_remetente?: string
    pessoa_destinatario?: string
}
