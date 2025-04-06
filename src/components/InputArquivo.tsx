import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function InputArquivo() {
    return (
        <div className="w-full max-w-sm gap-1.5 flex flex-row items-center">
            <Label htmlFor="picture">Arquivo</Label>
            <Input id="picture" type="file" />
        </div>
    )
}
