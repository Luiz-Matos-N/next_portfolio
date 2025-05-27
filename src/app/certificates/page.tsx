import type { Metadata } from "next";
import CertificateCard from "@/components/certificate-card";
import { certificates } from "@/data/certificates";

export const metadata: Metadata = {
  title: "Certificados | Meu Portfólio",
  description: "Meus certificados e qualificações profissionais",
};

export default function CertificatesPage() {
  return (
    <main className='container py-12 md:py-16 px-4 md:px-6'>
      <div className='space-y-2 text-center mb-8'>
        <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
          Meus Certificados
        </h1>
        <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
          Certificados e qualificações que obtive ao longo da minha jornada
          profissional
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {certificates.map((certificate, index) => (
          <CertificateCard key={index} certificate={certificate} />
        ))}
      </div>
    </main>
  );
}
