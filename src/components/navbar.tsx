"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const routes = [
    { href: "/", label: "Início" },
    { href: "/about", label: "Sobre" },
    { href: "/projects", label: "Projetos" },
    { href: "/certificates", label: "Certificados" },
    { href: "/contact", label: "Contato" },
  ];

  const socialLinks = [
    { href: "https://github.com/Luiz-Matos-N", icon: Github, label: "GitHub" },
    {
      href: "https://linkedin.com/in/luiz-fernandes-matos-neves",
      icon: Linkedin,
      label: "LinkedIn",
    },
  ];

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='/' className='font-bold text-xl'>
            Luiz Fernandes
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-6'>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}>
              {route.label}
            </Link>
          ))}
        </nav>

        <div className='hidden md:flex items-center gap-4'>
          {socialLinks.map((link) => (
            <Button key={link.label} variant='ghost' size='icon' asChild>
              <Link
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={link.label}>
                <link.icon className='h-5 w-5' />
              </Link>
            </Button>
          ))}
          <ModeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className='flex md:hidden items-center gap-4'>
          <ModeToggle />
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}>
            {isMenuOpen ? (
              <X className='h-5 w-5' />
            ) : (
              <Menu className='h-5 w-5' />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden border-b'>
          <div className='container py-4 flex flex-col gap-4'>
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}>
                {route.label}
              </Link>
            ))}
            <div className='flex items-center gap-4 pt-2'>
              {socialLinks.map((link) => (
                <Button key={link.label} variant='ghost' size='icon' asChild>
                  <Link
                    href={link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={link.label}>
                    <link.icon className='h-5 w-5' />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
