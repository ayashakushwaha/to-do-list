import { Calendar1, CheckCircle, ClockAlert, GraduationCap, Home, Laptop, Plus, Settings, Sun, User} from "lucide-react";

export const menu = {
    "title": "To-Do List",
    "description": "A simple to-do list application to manage your tasks.",
    "sidebar": {
        title: "My To-Do",
        items: [
            { label: "Today", icon: Sun, path: "/today" },
            { label: "Overdue", icon: ClockAlert, path: "/overdue" },
            { label: "Upcoming", icon: Calendar1, path: "/upcoming" },
            { label: "Completed", icon: CheckCircle, path: "/completed" },
        ],
    },
    "categories": [
        {
            "label": "Work",
            "variant": "default",
            "icon": Laptop 
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
}