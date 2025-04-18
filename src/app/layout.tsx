import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A2A Protocol - Agent-to-Agent Communication Standard",
  description:
    "A2A Protocol enables AI agents to communicate with each other, securely exchange information, and coordinate actions across enterprise platforms and applications.",
  metadataBase: new URL("https://www.a2aprotocal.com"),
  keywords: [
    "A2A Protocol",
    "Agent to Agent",
    "A2A protocols",
    "A2A communication",
    "A2A protocol list",
    "A2A protocol marketplace",
    "AI integration",
    "Protocol directory",
    "A2A protocol directory",
    "AI interoperability",
    "Agent protocols",
    "Enterprise AI",
    "AI collaboration",
    "AI messaging",
    "Agent-to-agent communication",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/a2a_protocol.png", sizes: "192x192", type: "image/png" },
      { url: "/a2a_protocol.png", sizes: "512x512", type: "image/png" },
      { url: "/a2a_protocol.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "A2A Protocol - Agent-to-Agent Communication Standard",
    description:
      "A2A Protocol enables AI agents to communicate with each other, securely exchange information, and coordinate actions across enterprise platforms and applications.",
    url: "https://www.a2aprotocal.com",
    siteName: "A2A Protocol",
    images: [
      {
        url: "/a2a_protocol.png",
        width: 1200,
        height: 630,
        alt: "A2A Protocol Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "A2A Protocol",
    card: "summary_large_image",
    description: "The standard for AI agent-to-agent communication protocols",
    images: ["/a2a_protocol.png"],
    creator: "@a2aprotocal",
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
  verification: {
    google: "yX3fbKT3ETGUoytOLhMUutoXUjp3Ec4X-z_2NbNq-Z4",
  },
  alternates: {
    canonical: "https://www.a2aprotocal.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="yX3fbKT3ETGUoytOLhMUutoXUjp3Ec4X-z_2NbNq-Z4" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://www.a2aprotocal.com",
              name: "A2A Protocol",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.a2aprotocal.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
            success: {
              style: {
                background: "#15803D",
              },
              icon: "✅",
            },
            error: {
              style: {
                background: "#B91C1C",
              },
              icon: "❌",
              duration: 6000,
            },
          }}
        />
        <Header />
        <main className="flex-1 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
