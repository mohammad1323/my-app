import "./globals.css";

export const metadata = {
  title: "Flappy Bird Next.js",
  description: "Ein cooles Flappy Bird Game mit Next.js.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-gradient-to-b from-blue-300 to-blue-600 text-white">
        {children}
      </body>
    </html>
  );
}
