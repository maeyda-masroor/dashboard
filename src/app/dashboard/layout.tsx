
"use client";
import Link from "next/link";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white p-5">
        <h2 className="text-xl font-bold mb-5">Dashboard</h2>
        <nav className="space-y-3">
          <Link href="/dashboard/product" className="block p-2 bg-blue-500 rounded">
            Products
          </Link>
          <Link href="/dashboard" className="block p-2 bg-blue-500 rounded">
            Products
          </Link>
          
        </nav>
        <button
          className="mt-5 bg-red-500 text-white p-2 rounded w-full"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
