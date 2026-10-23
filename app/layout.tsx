import type { Metadata } from "next";

import "./globals.css";
import "./fonts.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";



export const metadata: Metadata = {
  title: "Tesla",
  description: "Tesla",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" >
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
