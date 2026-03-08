import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'anDThe',
  description: 'Wardrobe catalog, outfit library, and AI styling guidance foundation.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <div className="links">
            <strong>General</strong>
            <Link href="/andthe">anDThe</Link>
            <Link href="/andthe/wardrobe">Wardrobe</Link>
            <Link href="/andthe/outfits">Outfits</Link>
            <Link href="/andthe/generate">Generate</Link>
            <Link href="/andthe/shop">Shop</Link>
            <Link href="/andthe/profile">Profile</Link>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
