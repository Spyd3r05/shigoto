import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font--roboto"
})


export const metadata: Metadata = {
  title: "SHIGOTO - Find Your Next Internship in Tech",
  description: "Real-time attachment opportunities for Computer Science students in Kenya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
