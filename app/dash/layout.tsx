import Layout from "@/components/dash/layout";
import { SidebarProvider } from "@/contexts/sidebar.context";


export default function DashLayout({ children }: Readonly<{children: React.ReactNode; }>) {
    return (
        <SidebarProvider>
            <Layout>
                {children}
            </Layout>
        </SidebarProvider>
    );
}
