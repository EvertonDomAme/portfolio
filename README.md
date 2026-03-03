# Everton Oliveira — Portfolio

Personal portfolio built with Next.js 16, React, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.local
```
Fill in `.env.local` with your Gmail App Password and WhatsApp number.

**Gmail App Password setup:**
1. Go to your Google Account → Security → 2-Step Verification
2. At the bottom, choose App passwords
3. Generate a password for "Mail" and paste it as `EMAIL_PASS`

### 3. Add your assets
Place these files in `/public/assets/`:
- `Resume.pdf` — your resume
- `platform_dev_badge.png` — Salesforce Platform Developer badge
- `agentforce_badge.png` — Salesforce Agentforce Specialist badge
- `udemy_logo_white_bg.png` — Udemy logo with white background

### 4. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## 📦 Deploy to Vercel

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in Vercel dashboard:
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
4. Deploy!

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Email**: Nodemailer (Gmail)
- **Hosting**: Vercel

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── page.tsx              # Main page
│   ├── layout.tsx            # Root layout + fonts
│   ├── globals.css           # Global styles
│   └── api/contact/route.ts  # Email API route
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Certifications.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
└── public/assets/            # Images, badges, resume
```
