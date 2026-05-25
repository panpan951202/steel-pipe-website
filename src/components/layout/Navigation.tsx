"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {mainNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-colors",
            pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
              ? "bg-blue-50 text-blue-900"
              : "text-gray-700 hover:text-blue-900 hover:bg-blue-50"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
