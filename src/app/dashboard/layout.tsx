// src/app/dashboard/layout.tsx
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-grow pl-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}