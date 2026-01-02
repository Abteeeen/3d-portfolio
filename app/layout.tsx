import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abhiram Anil | Data Scientist & Automation Engineer",
  description: "Portfolio of Abhiram Anil - Data Scientist & Automation Engineer specializing in AI, Machine Learning, n8n workflows, and intelligent automation solutions.",
  keywords: ["Data Scientist", "Automation Engineer", "AI", "Machine Learning", "n8n", "Python", "TensorFlow", "Portfolio"],
  authors: [{ name: "Abhiram Anil" }],
  creator: "Abhiram Anil",
  openGraph: {
    title: "Abhiram Anil | Data Scientist & Automation Engineer",
    description: "Portfolio showcasing AI projects, automation workflows, and data science solutions.",
    url: "https://abhiram-anil.vercel.app",
    siteName: "Abhiram Anil Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abhiram Anil Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhiram Anil | Data Scientist & Automation Engineer",
    description: "Portfolio showcasing AI projects, automation workflows, and data science solutions.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Abhiram Anil",
    "jobTitle": "Data Scientist & Automation Engineer",
    "url": "https://abhiram-anil.vercel.app",
    "email": "abhiramaanil@gmail.com",
    "sameAs": [
      "https://www.linkedin.com/in/abhiram-anil-092946223/",
      "https://github.com/Abteeeen"
    ],
    "knowsAbout": [
      "Data Science",
      "Machine Learning",
      "Artificial Intelligence",
      "n8n Automation",
      "Python",
      "TensorFlow",
      "Deep Learning"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Add your Google Analytics ID here: <GoogleAnalytics gaId="G-XXXXXXXXXX" /> */}
        {children}
      </body>
    </html>
  );
}
