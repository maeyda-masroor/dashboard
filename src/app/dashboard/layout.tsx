
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
      <aside className="w-64 bg-violet text-white p-5">
        <h2 className="text-xl font-bold mb-5">Dashboard</h2>
        <nav className="space-y-3">
          <Link href="/dashboard/product" className="block p-2 bg-blue-500 rounded">
            Products
          </Link>
          <Link href="/dashboard/category" className="block p-2 bg-blue-500 rounded">
            Category
          </Link> 
          <Link href="/dashboard/rating" className="block p-2 bg-blue-500 rounded">
            Review
          </Link>
          <Link href="/dashboard/order" className="block p-2 bg-blue-500 rounded">
            Order
          </Link>
        </nav>
        <button
          className="mt-5 bg-pink text-white p-2 rounded w-full"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
