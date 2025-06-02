import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Meu portfólio | Desenvolvedor Full Stack",
  description:
    "Portfólio pessoal com projetos, certificados e informações de contato",
  keywords: [
    "Desenvolvedor Full Stack",
    "Portfólio Web",
    "Projetos de Desenvolvimento",
    "Certificados de Programação",
    "Projetos de programação",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "HTML",
    "CSS",
    "JavaScript",
    "Frontend",
    "Backend",
  ],
  authors: [{ name: "Luiz Fernandes de Matos Neves" }],
  creator: "Luiz Fernandes de Matos Neves",
  openGraph: {
    title: "Meu portfólio | Desenvolvedor Full Stack",
    description:
      "Veja meus projetos, certificados e entre em contato. Desenvolvedor Full Stack apaixonado por tecnologia.",
    url: "",
    siteName: "Meu portfólio",
    locale: "pt-BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <head>
        <link rel='icon' href='/vercel.svg' />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div className='flex-1'>{children}</div>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
