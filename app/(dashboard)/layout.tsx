import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#FAF6F0] text-[#3A1E1A] font-sans">
      <Sidebar slug="vishmi-sanjana" />
      <main className="flex-1 overflow-y-auto p-6 md:p-10">{children}</main>
    </div>
  );
}
