import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { certificates } from "@/data/certificates";
import ProjectCard from "@/components/project-card";
import CertificateCard from "@/components/certificate-card";

export default function Home() {
  // Mostrar apenas os 3 projetos mais recentes na página inicial
  const featuredProjects = projects.slice(-3).reverse();
  // Mostrar apenas os 3 certificados mais recentes na página inicial
  const recentCertificates = certificates.slice(-3).reverse();

  return (
    <main className='flex flex-col min-h-screen'>
      {/* Hero Section */}
      <section className='py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center text-center space-y-4'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>
                Olá, eu sou <span className='text-primary'>Luiz Fernandes</span>
              </h1>
              <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                Desenvolvedor Full Stack apaixonado por criar experiências web
                incríveis com as tecnologias mais modernas.
              </p>
            </div>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button asChild size='lg'>
                <Link href='/projects'>
                  Ver Projetos <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
              <Button asChild variant='outline' size='lg'>
                <Link href='/contact'>Entre em Contato</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Projetos em Destaque */}
      <section className='py-12 md:py-16 bg-white dark:bg-gray-950'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
            <div className='space-y-1'>
              <h2 className='text-2xl font-bold tracking-tight sm:text-3xl'>
                Projetos em Destaque
              </h2>
              <p className='text-gray-500 dark:text-gray-400'>
                Alguns dos meus trabalhos mais recentes
              </p>
            </div>
            <Button asChild variant='ghost'>
              <Link href='/projects'>
                Ver todos <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Certificados Recentes */}
      <section className='py-12 md:py-16 bg-gray-50 dark:bg-gray-900'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
            <div className='space-y-1'>
              <h2 className='text-2xl font-bold tracking-tight sm:text-3xl'>
                Certificados Recentes
              </h2>
              <p className='text-gray-500 dark:text-gray-400'>
                Minhas conquistas e aprendizados recentes
              </p>
            </div>
            <Button asChild variant='ghost'>
              <Link href='/certificates'>
                Ver todos <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
            {recentCertificates.map((certificate, index) => (
              <CertificateCard key={index} certificate={certificate} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
