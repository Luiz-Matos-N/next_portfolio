import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { aboutData } from "@/data/about";

export const metadata: Metadata = {
  title: "Sobre | Meu Portfólio",
  description: "Conheça mais sobre mim e minha trajetória profissional",
};

export default function AboutPage() {
  return (
    <main className='container py-12 md:py-16 px-4 md:px-6'>
      <div className='space-y-2 text-center mb-8'>
        <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
          Sobre Mim
        </h1>
        <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
          Conheça mais sobre minha trajetória e experiência profissional
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-start'>
        <div className='md:col-span-1'>
          <Card>
            <CardContent className='pt-6'>
              <div className='aspect-square relative overflow-hidden rounded-lg mb-4'>
                <Image
                  src={
                    aboutData.profileImage ||
                    "/placeholder.svg?height=400&width=400"
                  }
                  alt='Foto de perfil'
                  fill
                  className='object-cover'
                />
              </div>
              <h2 className='text-xl font-bold'>{aboutData.name}</h2>
              <p className='text-muted-foreground'>{aboutData.title}</p>

              <div className='mt-4'>
                <h3 className='font-semibold mb-2'>Habilidades</h3>
                <div className='flex flex-wrap gap-2'>
                  {aboutData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className='px-2 py-1 text-xs rounded-full bg-primary/10 text-primary'>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='md:col-span-2 space-y-8'>
          <Card>
            <CardContent className='pt-6'>
              <h2 className='text-xl font-bold mb-4'>Biografia</h2>
              <div className='space-y-4'>
                {aboutData.bio.map((paragraph, index) => (
                  <p key={index} className='text-muted-foreground'>
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <h2 className='text-xl font-bold mb-4'>Experiência</h2>
              <div className='space-y-6'>
                {aboutData.experience.map((exp, index) => (
                  <div
                    key={index}
                    className='border-l-2 border-primary/50 pl-4'>
                    <h3 className='font-semibold'>{exp.role}</h3>
                    <p className='text-sm text-muted-foreground'>
                      {exp.company} | {exp.period}
                    </p>
                    <p className='mt-2'>{exp.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <h2 className='text-xl font-bold mb-4'>Educação</h2>
              <div className='space-y-6'>
                {aboutData.education.map((edu, index) => (
                  <div
                    key={index}
                    className='border-l-2 border-primary/50 pl-4'>
                    <h3 className='font-semibold'>{edu.degree}</h3>
                    <p className='text-sm text-muted-foreground'>
                      {edu.institution} | {edu.period}
                    </p>
                    <p className='mt-2'>{edu.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
