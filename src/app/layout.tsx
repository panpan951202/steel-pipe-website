import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import { SITE_NAME, SITE_URL, COMPANY_NAME } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${COMPANY_NAME} - Steel Pipe Manufacturer | SMLS, ERW, LSAW, SSAW, HSAW`,
  },
  description:
    "Leading manufacturer and exporter of SMLS, ERW, LSAW, SSAW, and HSAW steel pipes. Serving oil & gas, water, construction, and industrial sectors across 60+ countries with international quality standards.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: `${COMPANY_NAME} - Steel Pipe Manufacturer`,
    description:
      "Premium steel pipe manufacturer specializing in SMLS, ERW, LSAW, SSAW, and HSAW pipes for global infrastructure projects.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_NAME} - Steel Pipe Manufacturer`,
    description:
      "Premium steel pipe manufacturer specializing in SMLS, ERW, LSAW, SSAW, and HSAW pipes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <OrganizationSchema />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
