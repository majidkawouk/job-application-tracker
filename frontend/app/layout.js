import "./globals.css";
import { UserProvider } from "@/components/UserContext";

export const metadata = {
  title: "Job App",
  description: "A simple job application tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
