import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppMenu from "./components/custom/AppMenu"
import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <SidebarProvider style={{
            "--sidebar-width": "22.5rem",
            "--sidebar-width-mobile": "10rem",
            "--sidebar-background": "#e7edf4",
        } as React.CSSProperties} className="w-full min-h-screen" >
            <AppMenu />
            <main className='container flex flex-row space-x-2 items-start'>
                <SidebarTrigger className="md:hidden" />
                <Outlet />
            </main>
        </SidebarProvider>
    )
}