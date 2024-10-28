import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Interview Bot",
  description: "An automated bot, based on Gemini API to simulate an interview.",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Providers>
            <Navbar />
            {children}
            <ToastContainer />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
