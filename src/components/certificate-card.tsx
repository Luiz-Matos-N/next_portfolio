import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink } from "lucide-react";

interface CertificateProps {
  certificate: {
    date: string;
    title: string;
    description: string;
    link: string;
  };
}

export default function CertificateCard({ certificate }: CertificateProps) {
  return (
    <Card className='flex flex-col h-full'>
      <CardHeader>
        <div className='flex items-center gap-2 text-sm text-muted-foreground mb-2'>
          <Calendar className='h-4 w-4' />
          <span>{certificate.date}</span>
        </div>
        <CardTitle className='line-clamp-2'>{certificate.title}</CardTitle>
        <CardDescription className='line-clamp-3'>
          {certificate.description}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-grow'></CardContent>
      <CardFooter>
        <Button asChild variant='outline' size='sm'>
          <Link
            href={certificate.link}
            target='_blank'
            rel='noopener noreferrer'>
            Ver Certificado
            <ExternalLink className='ml-1 h-3 w-3' />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
