import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { ChartAreaInteractive } from '@/components/charts/chart-area-interactive';
import { DataTable } from '@/components/tables/data-table';
import { SectionCards } from '@/components/cards/section-cards';
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
