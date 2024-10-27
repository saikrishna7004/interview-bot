import "./globals.css";

export const metadata = {
  title: "Interview Bot",
  description: "An automated bot, based on Gemini API to simulate an interview.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
