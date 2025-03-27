import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Navbar from "./components/navbar/Navbar";
import ProfileList from "./components/profile/ProfileList";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {

  return (
    <html lang="es">
      <body className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <AuthProvider>
          <Navbar />
          <ProfileList />
          <div className="flex justify-start items-center w-full">
            <Menu />
            <div className="w-full pl-52">
              {children}
            </div>
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
};