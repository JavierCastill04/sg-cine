"use client";
import "@/app/globals.css"
import { Provider } from "react-redux";
import store from "../redux/store";
import Navbar from "../components/navbar/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}