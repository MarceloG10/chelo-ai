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
    html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f4f4f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f0;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#0a0a0a;border-radius:16px 16px 0 0;padding:32px 40px;">
          <p style="margin:0;font-size:11px;letter-spacing:.12em;color:#6dff6d;font-weight:600;text-transform:uppercase;">Hello Human · hhtech.dev</p>
          <h1 style="margin:12px 0 0;font-size:24px;font-weight:700;color:#ffffff;line-height:1.3;">Nuevo mensaje<br/>de <span style="color:#6dff6d;">${name}</span></h1>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:32px 40px;">

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:0 0 20px;">
              <p style="margin:0 0 4px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#999;">Servicio de interés</p>
              <p style="margin:0;font-size:16px;font-weight:600;color:#111;">${service}</p>
            </td></tr>
            <tr><td style="border-top:1px solid #eee;padding:20px 0;">
              <p style="margin:0 0 4px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#999;">Email</p>
              <a href="mailto:${email}" style="margin:0;font-size:16px;color:#0070f3;text-decoration:none;">${email}</a>
            </td></tr>
            <tr><td style="border-top:1px solid #eee;padding:20px 0 0;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#999;">Mensaje</p>
              <p style="margin:0;font-size:15px;color:#333;line-height:1.6;">${msg || "—"}</p>
            </td></tr>
          </table>

          <!-- CTA -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
            <tr><td>
              <a href="mailto:${email}" style="display:inline-block;background:#0a0a0a;color:#6dff6d;font-size:14px;font-weight:600;padding:14px 28px;border-radius:999px;text-decoration:none;">Responder a ${name} →</a>
            </td></tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f4f4f0;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#999;">Hello Human · Barcelona · <a href="https://www.hhtech.dev" style="color:#999;">hhtech.dev</a></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
