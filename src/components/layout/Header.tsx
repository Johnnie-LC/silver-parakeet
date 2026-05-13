"use client";

import Link from "next/link";

import { useCartStore } from "@/lib/store";

export function Header() {
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-zinc-900"
        >
          Marketplace
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-zinc-600 sm:gap-6">
          <Link href="/" className="text-zinc-900">
            Home
          </Link>
          <Link
            href="/cart"
            aria-label={`Cart${itemCount > 0 ? `, ${itemCount} items` : ""}`}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-900"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2 2h3l3.6 12.6a2 2 0 0 0 1.9 1.4h7.7a2 2 0 0 0 1.9-1.4L22 7H6" />
            </svg>
            {itemCount > 0 ? (
              <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-zinc-900 px-1.5 py-0.5 text-center text-xs font-semibold leading-none text-white">
                {itemCount}
              </span>
            ) : null}
          </Link>
        </nav>
      </div>
    </header>
  );
}
