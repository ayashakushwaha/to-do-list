import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { data } from "@/lib/data"

export function CategorySelector() {
    return (
        <Select >
            <SelectTrigger className="w-full bg-neutral-50" >
                <SelectValue placeholder="e.g. Work, Personal" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-50">
                <SelectGroup>
                    {data.categories.map((category, index) => (
                        <SelectItem key={index} value={category.label.toLowerCase()}>
                            {category.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
