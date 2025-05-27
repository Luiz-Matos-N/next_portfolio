import type { Metadata } from "next";
import ProjectCard from "@/components/project-card";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projetos | Meu Portfólio",
  description:
    "Conheça os projetos que desenvolvi utilizando diversas tecnologias",
};

export default function ProjectsPage() {
  return (
    <main className='container py-12 md:py-16 px-4 md:px-6'>
      <div className='space-y-2 text-center mb-8'>
        <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
          Meus Projetos
        </h1>
        <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
          Conheça os projetos que desenvolvi utilizando diversas tecnologias
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </main>
  );
}
