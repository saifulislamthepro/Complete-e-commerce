'use client'


import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import WhatsApp from "@/components/WhatsApp";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>        
        <Navbar/>
        <WhatsApp/>
        {children}
        <Footer/>
      </body>
    </html>
    </SessionProvider>
  );
}
