import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { name, email, service, msg } = data;

  const { error } = await resend.emails.send({
    from: "Hello Human <onboarding@resend.dev>",
    to: "magarcesb@gmail.com",
    replyTo: email,
    subject: `Nuevo contacto: ${name} — ${service}`,
    html: `
      <table style="font-family:sans-serif;font-size:15px;color:#111;max-width:560px">
        <tr><td style="padding:32px 0 8px"><strong>Nuevo mensaje desde hhtech.dev</strong></td></tr>
        <tr><td style="padding:8px 0"><b>Nombre:</b> ${name}</td></tr>
        <tr><td style="padding:8px 0"><b>Email:</b> <a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px 0"><b>Servicio:</b> ${service}</td></tr>
        <tr><td style="padding:8px 0"><b>Mensaje:</b><br/>${msg || "—"}</td></tr>
      </table>
    `,
  });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
