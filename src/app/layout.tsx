import "../globals.css";
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
      {/* TODO: WARNING! remove surpressHydration before production. This was added to prevent popups that are caused by browser extensions */}
      <body suppressHydrationWarning>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
