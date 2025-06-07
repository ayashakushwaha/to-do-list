import { data } from "@/lib/data";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
} from "@/components/ui/sidebar"
import { NewTaskForm } from "./NewTaskForm";

export default function AppMenu() {
    return (
        <Sidebar variant="inset" className="pt-7 pl-7 pr-2 ">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <h1 className="text-lg mb-4 text-black">
                            {data.sidebar.title}
                        </h1>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {data.sidebar.items.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <NavLink
                                        to={item.path}
                                        key={index}
                                        className={({ isActive, isPending }) =>
                                            `flex w-full text-md items-center space-x-4 p-3 rounded-md ` +
                                            (isActive ? 'bg-[#e7edf4] ' : 'hover:bg-gray-100') +
                                            (isPending ? 'pending:bg-gray-200 ' : '')
                                        }
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span>{item.label}</span>
                                    </NavLink>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="mb-5">
                <NewTaskForm />
            </SidebarFooter>
        </Sidebar>
    );
}