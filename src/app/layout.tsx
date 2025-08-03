import type { Metadata } from "next";
import { Inter, Noto_Kufi_Arabic } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
const KufiArabic = Noto_Kufi_Arabic({subsets: ['arabic'], weight:['300', '500']})
export const metadata: Metadata = {
  title: "Cloud Hosting",
  description: "cloud hosting project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <ToastContainer theme='colored' position='top-center' />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
