import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} Marketplace.</p>
        <nav className="flex gap-4 font-medium">
          <Link href="/" className="hover:text-zinc-900">
            Home
          </Link>
          <Link href="/cart" className="hover:text-zinc-900">
            Cart
          </Link>
        </nav>
      </div>
    </footer>
  );
}
