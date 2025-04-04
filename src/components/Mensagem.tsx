import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

export const MensagemSucesso = (mensagem: string) => {
    toast.success(mensagem, {
        icon: <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />,
        style: {
            backgroundColor: '#bbf7d0',
            color: '#22c55e',
            border: '1px solid #22c55e',
        },
        action: {
            label: 'Fechar',
            onClick: () => console.log('Toast fechado'),
        },
        position: 'top-center',
        duration: 5000,
    })
}

export const MensagemErro = (mensagem: string) => {
    toast.error(mensagem, {
        icon: <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />,
        style: {
            backgroundColor: '#fecaca',
            color: '#ef4444',
            border: '1px solid #ef4444',
        },
        action: {
            label: 'Fechar',
            onClick: () => console.log('Toast fechado'),
        },
        position: 'top-center',
        duration: 5000,
    })
}

export const MensagemAviso = (mensagem: string) => {
    toast.warning(mensagem, {
        icon: <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-400" />,
        style: {
            backgroundColor: '#fef08a',
            color: '#ca8a04',
            border: '1px solid #ca8a04',
        },
        action: {
            label: 'Fechar',
            onClick: () => console.log('Toast fechado'),
        },
        position: 'top-center',
        duration: 5000,
    })
}

export const MensagemInfo = (mensagem: string) => {
    toast.info(mensagem, {
        icon: <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500" />,
        style: {
            backgroundColor: '#bfdbfe',
            color: '#3b82f6',
            border: '1px solid #3b82f6',
        },
        action: {
            label: 'Fechar',
            onClick: () => console.log('Toast fechado'),
        },
        position: 'top-center',
        duration: 5000,
    })
}
