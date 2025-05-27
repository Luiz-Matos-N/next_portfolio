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

if (typeof window !== "undefined") {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

export async function sendConfirmationEmailJS(data: EmailData) {
  try {
    if (typeof window === "undefined") {
      throw new Error("EmailJS só funciona no cliente");
    }
    const result = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      user_name: data.user_name,
      user_email: data.user_email,
      user_subject: data.user_subject,
      message: data.message,
      to_email: data.user_email,
    });

    console.log("Email de confirmação enviado: ", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error ao enviar email de confirmação: ", error);
    return { success: false, error: error };
  }
}
