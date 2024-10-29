import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Interview Bot",
  description: "An automated bot, to simulate an interview.",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  
  return (
    <html lang="en" >
      <body className="light min-h-[100vh]" style={{background: '#f2f2f2'}}>
        <SessionProvider session={session}>
          <Providers>
            <Navbar />
            {children}
            <Footer />
            <ToastContainer />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
