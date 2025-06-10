import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { menu } from "@/lib/data"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { addTask, deleteTaskById, getTaskById, updateTask, type Task, type TaskData } from "@/lib/actions";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

export default function TaskForm() {
    const task = useLoaderData();
    const navigate = useNavigate();
    const params = useParams()
    const [newTask, setNewTask] = useState<TaskData>({
        title: task?.title || "",
        description: task?.description || "",
        due_date: task?.due_date || new Date().toISOString().split("T")[0],
        category: task?.category || "",
        completed: false
    });
    const handleClose = () => {
        navigate(`/${params.section}?refresh=${Date.now()}`, { replace: true });
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (task) {
                await updateTask(task.id, newTask)
            } else {
                await addTask(newTask);
            }
        } catch (error) {
            console.log("error in adding/ updating task")
        }

        handleClose()
    }

    const handleDelete = async () => {
        await deleteTaskById(task.id)
        handleClose()
    }

    return (
        <Dialog open={true} onOpenChange={(open) => { if (!open) handleClose(); }}>
            <DialogContent className="sm:max-w-[425px]" tabIndex={-1}>
                <DialogHeader>
                    <DialogTitle>Add to To-do List</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSave}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title" className="text-gray-800">Task Title</Label>
                            <Input id="title" name="title" placeholder="e.g. Finish homework" className="bg-neutral-50"
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="description" className="text-gray-800">
                                Description<span className="text-sm text-gray-600 font-normal -ml-1">(Optional)</span>
                            </Label>
                            <Textarea placeholder="Add details about your task" name="description" className="resize-none h-32 bg-neutral-50"
                                value={newTask.description}
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-row gap-3">
                            <div className="flex flex-col w-1/2 gap-2">
                                <Label htmlFor="due_date" className="text-gray-800">Date</Label>
                                <Input id="due_date" className="bg-neutral-50" name="due_date" type="date"
                                    value={newTask.due_date}
                                    onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                                    autoFocus={true}
                                />
                            </div>
                            <div className="flex flex-col w-1/2 gap-2">
                                <Label htmlFor="category" className="text-gray-800">
                                    Category
                                </Label>
                                <Select onValueChange={(value) => setNewTask({ ...newTask, category: value })}>
                                    <SelectTrigger className="w-full bg-neutral-50" >
                                        <SelectValue placeholder="e.g. Work, Personal" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-50">
                                        <SelectGroup>
                                            {menu.categories.map((category, index) => (
                                                <SelectItem key={index} value={category.label}>
                                                    {category.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        {task && <Button type="button" size={"lg"} className="bg-red-700 hover:bg-red-800" onClick={(e) => handleDelete()}>
                            <span>Delete</span>
                        </Button>}
                        <Button type="submit" size={"lg"} className="bg-blue-500 hover:bg-blue-600">
                            <span>{task ? "Save Changes" : "Add"}</span>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export const loader = async ({ params }: { params: any }): Promise<Task | null> => {
    const task = await getTaskById(Number(params.id))
    return task;
};