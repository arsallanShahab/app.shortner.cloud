"use client";

import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

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
