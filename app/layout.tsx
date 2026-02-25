import type {Metadata} from 'next';
import { Inter, Comic_Neue } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const comicNeue = Comic_Neue({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-kids',
});

export const metadata: Metadata = {
  title: 'KiddoPDF - Stories for Kids',
  description: 'Turn any PDF into a story for 5-year-olds',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${comicNeue.variable}`}>
      <body suppressHydrationWarning className="bg-[#FFFDF5] text-[#4A3728] font-sans">
        {children}
      </body>
    </html>
  );
}
