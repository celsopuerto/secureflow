import "./globals.css";
import { Provider } from  "./provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
      <body>
        {children}
      </body>
      </Provider>
    </html>
  );
}
