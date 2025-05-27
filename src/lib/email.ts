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

//
export async function sendConfirmationEmail(
  userEmail: string,
  userName: string
) {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY não está configurada!");
    }

    const MY_EMAIL = "luiz.fernandes31matos@gmail.com";

    const isTestMode = userEmail !== MY_EMAIL;

    if (isTestMode) {
      console.log(`Modo de teste: email não será enviado para ${userEmail}`);

      return {
        success: true,
        message: "Modo de teste ativado - confirmação não enviada",
      };
    }

    const { data, error } = await resend.emails.send({
      from: "Portfólio <onboarding@resend.dev>",
      to: [userEmail],
      subject: "Confirmação de envio do formulário",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #28a745; padding-bottom: 10px;">
          Obrigado pelo contato ${userName}
        </h2>

        <div style="margin:20px 0;">
          <p>Olá ${userName}</p>
          <p>Recebi sua mensagem, entrarei em contato o mais breve possível!</p>
          <p>Normalmente, eu respondo em até 24h durante dias úteis</p>
        </div>

        <div style="background-color: #d4edda; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745; margin: 20px 0;">
          <p style="margin: 0; color: #155724">
            <strong>Dica: </strong>Enquanto isso, fique a vontade para escutar uma das músicas abaixo:
          </p>
          <ul style="margin: 10px 0; padding-left: 20px; color: #155724;">
            <li>
              <a href="https://youtu.be/QkF3oxziUI4?si=_d88XQiDErnatP3l" target="_blank" rel="noopener noreferrer" style="color: #155724;">
                Led Zeppelin - Stairway To Heaven
              </a>
            </li>
            <li>
              <a href="https://youtu.be/09839DpTctU?si=VXQbBF_NbX_uLN_n" target="_blank" rel="noopener noreferrer" style="color: #155724;">
                Eagles - Hotel California
              </a>
            </li>
            <li>
              <a href="https://youtu.be/tAGnKpE4NCI?si=L1YZd2rsmw12ew31" target="_blank" rel="noopener noreferrer" style="color: #155724;">
                Metallica: Nothing Else Matters
              </a>
            </li>
            <li>
              <a href="https://youtu.be/htgr3pvBr-I?si=9VnZHRCjKuvfee0X" target="_blank" rel="noopener noreferrer" style="color: #155724;">
                Toto - Hold The Line
              </a>
            </li>
            <li>
              <a href="https://youtu.be/L_jWHffIx5E?si=h6tRGftSn4j3GJTT" target="_blank" rel="noopener noreferrer" style="color: #155724;">
                Smash Mouth - All Star
              </a>
            </li>
          </ul> 
        </div>

         <div style="margin-top:30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px;">
          <p>Atenciosamente, <br/>Luiz Fernandes</p>
        </div>
      </div>
      `,
      text: `
      Obrigado pelo contato ${userName}!

      Recebi sua mensagem, entrarei em contato o mais breve possível!
      Normalmente, eu respondo em até 24h durante dias úteis.

      Atenciosamente,
      Luiz Fernandes 
      Dica: Enquanto isso, fique a vontade para escutar uma das músicas abaixo:
      Led Zeppelin - Stairway To Heaven: https://youtu.be/QkF3oxziUI4?si=_d88XQiDErnatP3l 
      Eagles - Hotel California: https://youtu.be/09839DpTctU?si=VXQbBF_NbX_uLN_n
      Metallica: Nothing Else Matters: https://youtu.be/tAGnKpE4NCI?si=L1YZd2rsmw12ew31
      Toto - Hold The Line: https://youtu.be/htgr3pvBr-I?si=9VnZHRCjKuvfee0X
      Smash Mouth - All Star: https://youtu.be/L_jWHffIx5E?si=h6tRGftSn4j3GJTT
      `,
    });

    if (error) {
      console.error("Erro ao enviar email de confirmação:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Erro ao enviar email de confirmação:", error);
    return {
      success: false,
      error:
        "Falha ao enviar email de confirmação. Tente novamente mais tarde.",
    };
  }
}
