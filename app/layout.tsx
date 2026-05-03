import type { Metadata } from "next";
import { Montserrat, Cinzel } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "BENHUR | Creative Developer & Cinematographer",
  description: "Award-winning immersive portfolio showcasing high-performance web applications, native Android ecosystems, and cinematic visual narratives.",
  openGraph: {
    title: "BENHUR | Creative Developer & Cinematographer",
    description: "Immersive portfolio bridging the gap between code and cinematography.",
    url: "https://benhur.dev",
    siteName: "BENHUR Portfolio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", 
        width: 1200,
        height: 630,
        alt: "Benhur Cinematic Portfolio",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-black">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
