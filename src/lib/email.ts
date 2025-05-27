"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendEmail(data: EmailData) {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY não está configurada!");
    }

    const MY_EMAIL = "luiz.fernandes31matos@gmail.com";

    const { data: emailData, error } = await resend.emails.send({
      from: "Portfólio <onboarding@resend.dev>",
      to: [MY_EMAIL],
      subject: `Contato do Portfólio: ${data.subject}`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">Nova mensagem do seu portólio</h2>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #495057; margin-top:0;">Informações do contato:</h3>
          <p><strong>Nome:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Assunto:</strong> ${data.subject}</p>
        </div>

        <div style="margin: 20px 0">
          <h3 style="color: #495057;">Mensagem:</h3>
          <div style="background-color: #ffffff; padding:20px; border-left: 4px solid #007bff; border-radius: 4px">
            ${data.message.replace(/\n/g, "<br>")}
          </div>
        </div>

        <div style="margin-top:30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px;">
          <p>Esta mensagem foi enviada através do formulário de contato do seu portfólio.</p>
          <p>Para responder, utilize o email: <strong>${data.email}</strong></p>
        </div>
      </div>
      `,
      text: `
      Nova mensagem do seu portólio
      
      Nome: ${data.name}
      Email: ${data.email}
      Assunto: ${data.subject}

      Mensagem:
      ${data.message}

      ---
      Esta mensagem foi enviada através do formulário de contato do seu portfólio.
      Para responder, utilize o email: ${data.email}
      `,
    });

    if (error) {
      console.error("Erro ao enviar email:", error);
      throw new Error(error.message || "Erro ao enviar email");
    }

    console.log("Email enviado com sucesso:", emailData);
    return { success: true, data };
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    throw new Error("Falha ao enviar email. Tente novamente mais tarde.");
  }
}
