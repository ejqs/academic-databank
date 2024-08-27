import "./globals.css";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import strings from "@/strings";

export const metadata = {
  title: strings.appName,
  description: strings.appDescription,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header></Header>
        <div>{children}</div>
        <Footer></Footer>
      </body>
    </html>
  );
}
