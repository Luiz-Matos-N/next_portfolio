"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { sendConfirmationEmail, sendEmail } from "@/lib/email";

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await sendEmail(values);

      try {
        const confirmationResult = await sendConfirmationEmail(
          values.email,
          values.name
        );
        if (confirmationResult.success && confirmationResult.message) {
          console.log(confirmationResult.message);
        }
      } catch (confirmationError) {
        // Se falhar o email de confirmação, não impede o sucesso do principal
        console.warn(
          "Email de confirmação não enviado (modo de teste):",
          confirmationError
        );
      }

      toast.success("Mensagem enviada!", {
        description:
          "Obrigado por entrar em contato. Responderei o mais breve possível.",
      });
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
