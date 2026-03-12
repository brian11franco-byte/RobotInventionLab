import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Robot Inventor Lab",
  description: "Interactive English learning for Cambridge Global English Stage 3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-nunito bg-slate-950 text-white antialiased`}>
        <Nav />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
