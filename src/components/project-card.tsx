import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface ProjectProps {
  project: {
    title: string;
    description: string;
    logo: string;
    linkText: string;
    link: string;
    repoText: string;
    repo: string;
    image?: string;
    tags?: string[];
  };
}

export default function ProjectCard({ project }: ProjectProps) {
  return (
    <Card className='overflow-hidden flex flex-col h-full'>
      {project.image && (
        <div className='relative w-full h-48 overflow-hidden'>
          <Image
            src={project.image || "/placeholder.svg?height=200&width=400"}
            alt={project.title}
            fill
            className='object-cover'
          />
        </div>
      )}
      <CardHeader>
        <div className='flex items-center gap-2'>
          <div className='w-6 h-6'>
            <img
              src={project.logo || "/placeholder.svg"}
              alt={`${project.title} logo`}
              className='w-full h-full object-contain'
            />
          </div>
          <CardTitle>{project.title}</CardTitle>
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className='flex-grow'>
        {project.tags && (
          <div className='flex flex-wrap gap-2 mt-2'>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className='px-2 py-1 text-xs rounded-full bg-primary/10 text-primary'>
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className='flex justify-between gap-2'>
        <Button asChild variant='outline' size='sm'>
          <Link href={project.link} target='_blank' rel='noopener noreferrer'>
            {project.linkText}
            <ExternalLink className='ml-1 h-3 w-3' />
          </Link>
        </Button>
        <Button asChild variant='outline' size='sm'>
          <Link href={project.repo} target='_blank' rel='noopener noreferrer'>
            {project.repoText}
            <Github className='ml-1 h-3 w-3' />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
