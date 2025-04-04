'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface DatePickerProps {
    selected?: Date
    onChange: (date?: Date) => void
    placeholderText?: string
}

export function DatePicker({ selected, onChange, placeholderText = 'Selecione uma data' }: DatePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn('w-[215px] justify-start text-left font-normal', !selected && 'text-muted-foreground')}
                >
                    <CalendarIcon />
                    {selected ? format(selected, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : <span>{placeholderText}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={selected} onSelect={onChange} initialFocus />
            </PopoverContent>
        </Popover>
    )
}
