import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface MenuVerticalItemProps {
    href: string
    icon: IconDefinition
    title: string
}

export function MenuVerticalItem({ href, icon, title }: MenuVerticalItemProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link href={href} className="flex items-center justify-center p-2 hover:bg-zinc-700 rounded transition-all">
                    <FontAwesomeIcon icon={icon} className="text-xl" />
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
                <p>{title}</p>
            </TooltipContent>
        </Tooltip>
    )
}
