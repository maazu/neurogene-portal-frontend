import { AppSidebar } from '@/components/sidebar/app-sidebar';

import { SiteHeader } from '@/components/header/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar variant='inset' />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
