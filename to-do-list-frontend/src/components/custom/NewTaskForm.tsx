import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { CategorySelector } from "./CategorySelector"

export function NewTaskForm() {

    return (
        <Dialog>
            <form>
                <DialogTrigger className="w-full" asChild>
                    <Button size={"lg"} className="bg-blue-500 hover:bg-blue-600 w-full" >
                        <Plus className="w-5 h-5" />
                        <span>New Task</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add to To-do List</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title" className="text-gray-800">Task Title</Label>
                            <Input id="title" name="title" placeholder="e.g. Finish homework" className="bg-neutral-50" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="description" className="text-gray-800">
                                Description<span className="text-sm text-gray-600 font-normal -ml-1">(Optional)</span>
                            </Label>
                            <Textarea placeholder="Add details about your task" name="description" className="resize-none h-32 bg-neutral-50" />
                        </div>
                        <div className="flex flex-row gap-3">
                            <div className="flex flex-col w-1/2 gap-2">
                                <Label htmlFor="date" className="text-gray-800">Date</Label>
                                <Input id="date" className="bg-neutral-50" name="date" type="date" defaultValue={(new Date()).toISOString().split("T")[0]} />
                            </div>
                            <div className="flex flex-col w-1/2 gap-2">
                                <Label htmlFor="category" className="text-gray-800">
                                    Category
                                </Label>
                                <CategorySelector />
                            </div>
                        </div>

                    </div>
                    <DialogFooter>
                        <Button size={"lg"} className="bg-blue-500 hover:bg-blue-600" >
                            <span>Save</span>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
