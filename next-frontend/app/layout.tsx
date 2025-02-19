import type { Metadata } from "next";
import { Playfair_Display, Lato, Merriweather } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const lato = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tuturo",
  description: "The best way to track your screentimes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <AuthProvider>
        <body className={`${playfairDisplay.className} antialiased min-h-screen`}>
          <Navbar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
