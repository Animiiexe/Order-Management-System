"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl">📦</span>
        <h1 className="text-xl font-bold text-gray-800">OrderEase</h1>
      </div>

      {/* Right side button */}
      <Link
        href="/admin"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-1"
      >
        <span>⚙️</span>
        <span>Admin Orders</span>
      </Link>
    </nav>
  );
}
