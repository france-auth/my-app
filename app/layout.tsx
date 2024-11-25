// app/layout.tsx
import ClientLayout from "./ClientLayout";
import { metadata as appMetadata } from "./metadata";


export const metadata = appMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
