import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pentgon | Luca McAtarsney",
  description:
    "Interactive experiments in code, graphics and sound by Luca McAtarsney.",
};

// Set the theme before first paint so there is no flash.
const themeScript = `(function(){try{if(localStorage.getItem('theme')==='light'){document.documentElement.classList.add('light-mode')}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
