"use client";

import localFont from "next/font/local";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "@/context/context";
import "./globals.css";
import { useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

// Import local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  WebApp.enableClosingConfirmation()

  useEffect(() => {
    // Dynamically import WebApp to avoid issues during SSR
    const loadWebApp = async () => {
      const { default: WebApp } = await import("@twa-dev/sdk");

      const backButton = WebApp.BackButton;
      WebApp.expand();

      if (pathname === "/") {
        backButton.hide(); // Hide back button on homepage
      } else {
        backButton.show(); // Show back button on other pages
      }

      backButton.onClick(() => {
        if (typeof window !== "undefined") {
          window.history.back();
        }
      });

      return () => {
        backButton.hide();
      };
    };

    loadWebApp().catch(console.error);
  }, [pathname]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ChakraProvider>
          <UserProvider>{children}</UserProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
