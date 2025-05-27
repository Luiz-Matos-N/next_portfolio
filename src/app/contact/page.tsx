import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contato | Meu Portfólio",
  description:
    "Entre em contato comigo para oportunidades de trabalho ou colaborações",
};

export default function ContactPage() {
  return (
    <main className='container py-12 md:py-16 px-4 md:px-6'>
      <div className='space-y-2 text-center mb-8'>
        <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
          Entre em Contato
        </h1>
        <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
          Estou disponível para oportunidades de trabalho, colaborações ou
          apenas para trocar ideias
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <Card>
          <CardContent className='pt-6'>
            <h2 className='text-xl font-bold mb-4'>Informações de Contato</h2>
            <div className='space-y-4'>
              <div className='flex items-start gap-3'>
                <Mail className='h-5 w-5 text-primary mt-0.5' />
                <div>
                  <h3 className='font-semibold'>Email</h3>
                  <p className='text-muted-foreground'>
                    luiz.fernandes31matos@gmail.com
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <Phone className='h-5 w-5 text-primary mt-0.5' />
                <div>
                  <h3 className='font-semibold'>Telefone</h3>
                  <p className='text-muted-foreground'>(16) 9 9639-2245</p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <MapPin className='h-5 w-5 text-primary mt-0.5' />
                <div>
                  <h3 className='font-semibold'>Localização</h3>
                  <p className='text-muted-foreground'>São Carlos, SP</p>
                </div>
              </div>
            </div>

            <h2 className='text-xl font-bold mt-8 mb-4'>Redes Sociais</h2>
            <div className='space-y-4'>
              <div className='flex items-start gap-3'>
                <Github className='h-5 w-5 text-primary mt-0.5' />
                <div>
                  <h3 className='font-semibold'>GitHub</h3>
                  <Link
                    href='https://github.com/Luiz-Matos-N'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-muted-foreground hover:text-primary transition-colors'>
                    github.com/Luiz-Matos-N
                  </Link>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <Linkedin className='h-5 w-5 text-primary mt-0.5' />
                <div>
                  <h3 className='font-semibold'>LinkedIn</h3>
                  <Link
                    href='https://linkedin.com/in/luiz-fernandes-matos-neves'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-muted-foreground hover:text-primary transition-colors'>
                    linkedin.com/in/luiz-fernandes-matos-neves
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-6'>
            <h2 className='text-xl font-bold mb-4'>Envie uma Mensagem</h2>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
