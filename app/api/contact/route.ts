// This is a Next.js API Route [route.ts]

// NextResponse helper to send HTTP responses
import { NextResponse } from "next/server";

// nodemailer library to connect to Gmail SMTP in order to send emails from the contact form
import nodemailer from "nodemailer";

// Function to handle POST requests to /api/contact
export async function POST(req: Request) {
  // Parse the JSON body from the request(data sent by the contact form in Contact.tsx)
  const { name, email, subject, message } = await req.json();

  // Validate that all fields are present
  if (!name || !email || !subject || !message) {
    // If any field is missing return a 400 Bad Request response
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 },
    );
  }

  // Create a Nodemailer transporter to send emails using Gmail SMTP
  // process.env reads values from .env.local (local)
  const transporter = nodemailer.createTransport({
    service: "gmail", // tells nodemailer we are using Gmail
    auth: {
      user: process.env.EMAIL_USER, // Gmail address
      pass: process.env.EMAIL_PASS, // Gmail App Password
    },
  });

  try {
    // Send the email using the transporter
    await transporter.sendMail({
      from: `Portfolio Contact <${process.env.EMAIL_USER}>`, // sender shown in inbox
      to: process.env.EMAIL_USER, // sends to yourself — your own inbox
      replyTo: email, // when you hit Reply it goes to the sender
      subject: `[Portfolio] ${subject} — from ${name}`, // email subject line
      // html allows us to format the email with basic HTML
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f4c430; border-bottom: 2px solid #f4c430; padding-bottom: 10px;">
            New Portfolio Message
          </h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            Sent from your portfolio contact form
          </p>
        </div>
      `,
    });

    // Return 200 success response to the contact form
    return NextResponse.json({ success: true });
  } catch (error) {
    // Log the error on the server for debugging
    console.error("Email error:", error);

    // Return 500 error response to the contact form
    // This triggers the error state in Contact.tsx
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 },
    );
  }
}
