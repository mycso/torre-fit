import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Torre Fit",
  description: "Skill-to-job fit explorer using Torre APIs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-zinc-50 text-zinc-900"
      >
        <div>
          <header>
            <div>
              <h1></h1>
              <p></p>
            </div>
            <a
              href="https://torre.ai"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-zinc-600 hover:text-zinc-900"
            >torre.ai</a>
          </header>
          {children}
          <footer className="mt-10 border-t pt-6 text-xs text-zinc-500">
            Built for capability assesment - focus on architecture & clarity.
          </footer>
        </div>
      </body>
    </html>
  );
}
