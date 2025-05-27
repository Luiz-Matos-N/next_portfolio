"use client";

import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_xxxxxxx";
const EMAILJS_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_xxxxxxx";
const EMAILJS_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "xxxxxxxxxxxxxxx";

interface EmailData {
  user_name: string;
  user_email: string;
  user_subject: string;
  message: string;
}

function validateEmailJSConfig() {
  const missing = [];
  if (!EMAILJS_SERVICE_ID) missing.push("NEXT_PUBLIC_EMAILJS_SERVICE_ID");
  if (!EMAILJS_TEMPLATE_ID) missing.push("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID");
  if (!EMAILJS_PUBLIC_KEY) missing.push("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");

  if (missing.length > 0) {
    console.error("EmailJS: Variáveis de ambiente faltando:", missing);
    return false;
  }
  return true;
}

let emailjsInitialized = false;

function initializeEmailJS() {
  if (typeof window === "undefined") return false;

  if (!validateEmailJSConfig()) return false;

  if (!emailjsInitialized) {
    try {
      emailjs.init(EMAILJS_PUBLIC_KEY!);
      emailjsInitialized = true;
      console.log("EmailJS inicializado com sucesso");
    } catch (error) {
      console.error("Erro ao inicializar EmailJS:", error);
      return false;
    }
  }
  return true;
}

export async function sendConfirmationEmailJS(data: EmailData) {
  try {
    // Verifica se estamos no cliente
    if (typeof window === "undefined") {
      console.error("EmailJS: Tentativa de uso no servidor");
      return { success: false, error: "EmailJS só funciona no cliente" };
    }

    // Inicializa o EmailJS
    if (!initializeEmailJS()) {
      console.error("EmailJS: Falha na inicialização");
      return { success: false, error: "Configuração do EmailJS inválida" };
    }

    const templateParams = {
      user_name: data.user_name,
      user_email: data.user_email,
      user_subject: data.user_subject,
      message: data.message,
      to_email: data.user_email,
      reply_to: data.user_email,
      from_name: "Luiz Fernandes - Portfólio",
    };

    // Envia o email de confirmação
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID!,
      EMAILJS_TEMPLATE_ID!,
      templateParams
    );

    console.log("EmailJS: Email enviado com sucesso:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("EmailJS: Erro detalhado:", error);

    // Log mais detalhado do erro
    if (error instanceof Error) {
      console.error("EmailJS: Mensagem do erro:", error.message);
      console.error("EmailJS: Stack do erro:", error.stack);
    }

    return { success: false, error: error };
  }
}

export function testEmailJSConfig() {
  console.log("Service ID:", EMAILJS_SERVICE_ID ? "Configurado" : "Faltando");
  console.log("Template ID:", EMAILJS_TEMPLATE_ID ? "Configurado" : "Faltando");
  console.log("Public Key:", EMAILJS_PUBLIC_KEY ? "Configurado" : "Faltando");
  console.log(
    "Ambiente:",
    typeof window !== "undefined" ? "Cliente" : "Servidor"
  );

  return validateEmailJSConfig();
}
