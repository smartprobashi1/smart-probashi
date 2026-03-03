import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Probashi",
  description: "Smart Probashi personal finance app"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <div className="app-inner">{children}</div>
        </div>
      </body>
    </html>
  );
}
