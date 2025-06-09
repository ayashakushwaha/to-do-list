import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useNavigate, useSearchParams } from "react-router-dom";
import { updateTask, type Task } from '@/lib/actions';
import { useState } from 'react';

export default function TaskCard({ task }: { task: Task }) {
    const [isChecked, setIsChecked] = useState(task.completed);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const section = searchParams.get("section") || "today";
    const taskDetailsPath = `/${section}/tasks/${task.id}`;

    const handleCheckboxChange = (checked: boolean) => {
        setIsChecked(checked);
        updateTask(task.id, { completed: checked });
    };

    return (
        <Card className="w-full p-4" onClick={() => navigate(taskDetailsPath)}>
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
                        className="text-md"
                        onClick={(e) => e.preventDefault()} // Prevents getting checked on label click
                    >
                        <div>
                            <span className="text-base font-medium">{task.title}</span>
                            <div className="text-sm font-normal text-slate-400">{task.category}</div>
                        </div>
                    </Label>
                </div>
            </CardContent>
        </Card>
    );
}