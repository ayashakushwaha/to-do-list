import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { updateTask, type Task } from '@/lib/actions';
import { useState } from 'react';

export default function TaskCard({ task }: { task: Task }) {
    const [isChecked, setIsChecked] = useState(task.completed);
    const navigate = useNavigate();
    const params = useParams()
    const taskDetailsPath = `/${params.section}/tasks/${task.id}` || "/today";

    const handleCheckboxChange = (checked: boolean) => {
        setIsChecked(checked);
        updateTask(task.id, { completed: checked });
    };

    return (
        <Card className="lg:w-full w-80 p-4" onClick={() => navigate(taskDetailsPath)}>
            <CardContent className="space-y-4 p-0">
                <div className="flex items-center gap-4">
                    <Checkbox
                        checked={isChecked}
                        id={`task-${task.id}`}
                        className="h-5 w-5 border-slate-300 border-2 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        onCheckedChange={(checked) => handleCheckboxChange(checked as boolean)}
                        onClick={(e) => e.stopPropagation()} // Prevents card click triggering navigation
                    />
                    <Label
                        htmlFor={`task-${task.id}`}
                        className="text-md w-full"
                        onClick={(e) => e.preventDefault()} // Prevents getting checked on label click
                    >
                        <div className='flex flex-col items-start gap-2 w-full'>
                            <span className="text-base font-medium">{task.title}</span>
                            <div className='flex justify-between w-full'>
                                <div className="text-sm font-normal text-slate-400 "> {task.category}</div>
                                <div className="text-sm font-normal text-slate-400 ">{task.due_date}</div>
                            </div>

                        </div>
                    </Label>
                </div>
            </CardContent>
        </Card>
    );
}