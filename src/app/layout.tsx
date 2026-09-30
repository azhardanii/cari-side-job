import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Cari SIDE JOB - Personal Recommendation Tool & Remote Work",
  description: "Temukan side job yang paling sesuai dengan skill, minat, dan kondisimu. Bukan sekadar lowongan, tapi personal recommendation tool cerdas untuk mulai menghasilkan penghasilan remote dari rumah.",
};

export const viewport: Viewport = {
  themeColor: "#1D64EC",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${plusJakartaSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
