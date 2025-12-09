
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luca McAtarsney – Portfolio of Interactive Game Demos",
  description: "Experimental portfolio of interactive game demos and prototypes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
