"use client";

import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import "./globals.css";

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>LinkLeap | shorten your links</title>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6RYR6WVE2Z"
          strategy="afterInteractive"
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', 'G-6RYR6WVE2Z');`}
        </Script>
      </head>
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
