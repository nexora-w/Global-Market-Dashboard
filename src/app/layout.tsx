import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Global Market Dashboard | Live Index, Forex, Metals & Crypto Prices",
  description:
    "A professional dashboard for real-time global market data: Indexes, Forex, Metals, and Crypto. Powered by TradingView.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="A professional dashboard for real-time global market data: Indexes, Forex, Metals, and Crypto. Powered by TradingView." />
        <title>Global Market Dashboard | Live Index, Forex, Metals & Crypto Prices</title>
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
