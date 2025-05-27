"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { sendEmail } from "@/lib/email";
import { sendConfirmationEmailJS, testEmailJSConfig } from "@/lib/emailjs";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  subject: z.string().min(5, {
    message: "O assunto deve ter pelo menos 5 caracteres.",
  }),
  message: z.string().min(10, {
    message: "A mensagem deve ter pelo menos 10 caracteres.",
  }),
});

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailJSConfigured, setEmailJSConfigured] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  Label;
  // Testa a configuração do EmailJS quando o componente monta
  useEffect(() => {
    const isConfigured = testEmailJSConfig();
    setEmailJSConfigured(isConfigured);
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    let emailSent = false;
    let confirmationSent = false;
    try {
      // 1. Envia email principal via Resend (para você)
      console.log("Enviando email principal via Resend...");
      await sendEmail(values);
      emailSent = true;
      console.log("Email principal enviado com sucesso");

      // 2. Tenta enviar email de confirmação via EmailJS (para o usuário)
      if (emailJSConfigured) {
        console.log("Tentando enviar confirmação via EmailJS...");
        const confirmationResult = await sendConfirmationEmailJS({
          user_name: values.name,
          user_email: values.email,
          user_subject: values.subject,
          message: values.message,
        });

        if (confirmationResult.success) {
          confirmationSent = true;
          console.log("Email de confirmação enviado com sucesso");
        } else {
          console.error(
            "Falha no email de confirmação:",
            confirmationResult.error
          );
        }
      } else {
        console.warn("EmailJS não configurado, pulando confirmação");
      }

      // 3. Mostra toast baseado no resultado
      if (emailSent && confirmationSent) {
        toast.success("Mensagem enviada com sucesso!", {
          description:
            "Você receberá um email de confirmação em breve. Responderei o mais rápido possível!",
          duration: 6000,
        });
      } else if (emailSent) {
        toast.success("Mensagem enviada!", {
          description:
            "Sua mensagem foi enviada com sucesso. Responderei o mais breve possível.",
          duration: 5000,
        });
      }

      reset();
    } catch (error) {
      toast.error("Erro ao enviar mensagem", {
        description:
          "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='name'>Nome</Label>
        <Input
          id='name'
          placeholder='Seu nome'
          {...register("name")}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className='text-sm text-red-500'>{errors.name.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          placeholder='seu-email@exemplo.com'
          {...register("email")}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className='text-sm text-red-500'>{errors.email.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='subject'>Assunto</Label>
        <Input
          id='subject'
          placeholder='Assunto da mensagem'
          {...register("subject")}
          className={errors.subject ? "border-red-500" : ""}
        />
        {errors.subject && (
          <p className='text-sm text-red-500'>{errors.subject.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='message'>Mensagem</Label>
        <Textarea
          id='message'
          placeholder='Escreva sua mensagem aqui...'
          className={`min-h-[120px] ${errors.message ? "border-red-500" : ""}`}
          {...register("message")}
        />
        {errors.message && (
          <p className='text-sm text-red-500'>{errors.message.message}</p>
        )}
      </div>

      <Button
        type='submit'
        className='w-full cursor-pointer'
        disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Enviando...
          </>
        ) : (
          "Enviar Mensagem"
        )}
      </Button>
    </form>
  );
}
