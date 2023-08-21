import { Wrapper } from "@/components/wrapper";
import "./globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { Header } from "@/components/header";

const lato = Lato({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Windbnb",
  description: "Airbnb clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <Wrapper>
          <Header />
          {children}
        </Wrapper>
      </body>
    </html>
  );
}
