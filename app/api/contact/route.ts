import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: "akashp2605@gmail.com",
    subject: `New message from ${name}`,
    html: `
      <div style="font-family:monospace;background:#0a0a0a;color:#e0e0e0;padding:32px;border-radius:8px;border:1px solid #1a1a1a;">
        <h2 style="color:#00ff88;margin:0 0 24px;">// NEW_MESSAGE_RECEIVED</h2>
        <p><span style="color:#00ff88;">name:</span>    ${name}</p>
        <p><span style="color:#00e5ff;">email:</span>   <a href="mailto:${email}" style="color:#00e5ff;">${email}</a></p>
        <p><span style="color:#8b5cf6;">message:</span></p>
        <p style="background:#111;padding:16px;border-radius:4px;border-left:3px solid #00ff88;white-space:pre-wrap;">${message}</p>
      </div>
    `,
    replyTo: email,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
