import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
