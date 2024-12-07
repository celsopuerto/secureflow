import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
        defaultTheme="system"
        enableSystem
        >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
