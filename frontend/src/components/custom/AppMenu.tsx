import { menu } from "@/lib/data";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";

export default function AppMenu() {
    const navigate = useNavigate();
    const params = useParams()
    const addNewTaskPath = `/${params.section}/tasks/new`;

    return (
        <Sidebar variant="inset" className="pt-7 pl-7 pr-2 flex flex-col">

            <SidebarContent className="flex flex-col lg:justify-between">
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <h1 className="text-lg mb-4 text-black">{menu.sidebar.title}</h1>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {menu.sidebar.items.map(({ path, icon: Icon, label }, index) => (
                                <SidebarMenuItem key={index}>
                                    <NavLink
                                        to={path}
                                        className={({ isActive, isPending }) =>
                                            `flex w-full text-md items-center space-x-4 p-3 rounded-md ${isActive ? "bg-[#e7edf4]" : "hover:bg-gray-100"
                                            } ${isPending ? "pending:bg-gray-200" : ""} ${isActive && label === "Overdue" ? "text-red-500" :
                                                isActive && label === "Upcoming" ? "text-amber-500" :
                                                    isActive && label === "Completed" ? "text-green-600" :
                                                        isActive && label === "Today" ? "text-blue-600" : ""
                                            }`
                                        }
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span>{label}</span>
                                    </NavLink>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarFooter className="mb-5 ">
                    <Button
                        size="lg"
                        className="bg-blue-500 hover:bg-blue-600 w-full"
                        onClick={() => navigate(addNewTaskPath)}
                    >
                        <Plus className="w-5 h-5" />
                        <span>New Task</span>
                    </Button>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    );
}