import Link from "next/link";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full border-t bg-background'>
      <div className='container px-4 md:px-6 py-8 md:py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Luiz Fernandes</h3>
            <p className='text-sm text-muted-foreground'>
              Desenvolvedor Full Stack apaixonado por criar experiências web
              incríveis com as tecnologias mais modernas.
            </p>
          </div>
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Links Rápidos</h3>
            <nav className='flex flex-col space-y-2'>
              <Link
                href='/'
                className='text-sm text-muted-foreground hover:text-primary transition-colors'>
                Início
              </Link>
              <Link
                href='/about'
                className='text-sm text-muted-foreground hover:text-primary transition-colors'>
                Sobre
              </Link>
              <Link
                href='/projects'
                className='text-sm text-muted-foreground hover:text-primary transition-colors'>
                Projetos
              </Link>
              <Link
                href='/certificates'
                className='text-sm text-muted-foreground hover:text-primary transition-colors'>
                Certificados
              </Link>
              <Link
                href='/contact'
                className='text-sm text-muted-foreground hover:text-primary transition-colors'>
                Contato
              </Link>
            </nav>
          </div>
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Contato</h3>
            <div className='space-y-2'>
              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <Mail className='h-4 w-4' />
                <span>luiz.fernandes31matos@gmail.com</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <MapPin className='h-4 w-4' />
                <span>São Carlos, SP</span>
              </div>
              <div className='flex items-center gap-4 pt-2'>
                <Link
                  href='https://github.com/Luiz-Matos-N'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='GitHub'>
                  <Github className='h-5 w-5 text-muted-foreground hover:text-primary transition-colors' />
                </Link>
                <Link
                  href='https://linkedin.com/in/luiz-fernandes-matos-neves'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='LinkedIn'>
                  <Linkedin className='h-5 w-5 text-muted-foreground hover:text-primary transition-colors' />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-8 pt-8 border-t text-center text-sm text-muted-foreground'>
          <p>
            © {currentYear} Luiz Fernandes de Matos Neves. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
