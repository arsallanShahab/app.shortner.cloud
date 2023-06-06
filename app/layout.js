"use client";

import Navbar from "@/components/Navbar";

import Provider from "@/components/Provider";
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata = {
  title: "Shortner - a url shortner app",
  description: "A url shortner",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className="font-inter">
        <Provider>
          <Navbar />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}