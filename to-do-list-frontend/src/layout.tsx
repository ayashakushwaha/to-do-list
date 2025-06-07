import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppMenu from "./components/custom/AppMenu"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider style={{
            "--sidebar-width": "22.5rem",
            "--sidebar-width-mobile": "10rem",
            "--sidebar-background": "#e7edf4",
        }} className="w-full min-h-screen" >
            <AppMenu />
            <main className='flex flex-row space-x-2 items-start'>
                <SidebarTrigger className="md:hidden" />
                {children}
            </main>
        </SidebarProvider>
    )
}