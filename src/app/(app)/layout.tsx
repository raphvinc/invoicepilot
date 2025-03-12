// src/app/(app)/layout.tsx
import Sidebar from '@/components/dashboard/Sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-grow pl-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}