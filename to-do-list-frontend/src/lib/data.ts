import { Calendar1, CheckCircle, GraduationCap, Home, Laptop, Plus, Settings, Sun, User} from "lucide-react";

export const data = {
    "title": "To-Do List",
    "description": "A simple to-do list application to manage your tasks.",
    "sidebar": {
        title: "My Tasks",
        items: [
            { label: "Today", icon: Sun, path: "/today" }, // Changed icon to Calendar
            { label: "Upcoming", icon: Calendar1, path: "/upcoming" },
            { label: "Completed", icon: CheckCircle, path: "/completed" },
            { label: "Settings", icon: Settings, path: "/settings" }
        ],
        button:{label: "New Task", icon: Plus, path: "/new-task" }
    },
    "badges": [
        {
            "label": "Work",
            "variant": "default",
            "icon": Laptop // Consider importing Briefcase from lucide-react
        },
        {
            "label": "Personal",
            "variant": "secondary",
            "icon": User
        },
        {
            "label": "Home",
            "variant": "outline",
            "icon": Home
        },
        {
            "label": "Study",
            "variant": "success",
            "icon": GraduationCap
        },
    ],
    "tasks":[
        {title: "Schedule a doctor's appointment", description: "", completed: false},
        {title: "Prepare presentation for the client meeting", description: "Description for task 2", completed: true},
        {title: "Buy groceries for the week", description: "Description for task 3", completed: false}
    ],
}