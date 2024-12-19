import "../globals.css";
import { Header, Footer, PageStatus } from "@/components/index";
import { ProjectMetadata } from "@/util/types";

export const metadata = {
  title: ProjectMetadata.appName,
  description: ProjectMetadata.appDescription,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* TODO: WARNING! remove surpressHydration before production. This was added to prevent popups that are caused by browser extensions */}
      {/* <body className="tw-bg-background-100" suppressHydrationWarning> */}
      <body className="tw-bg-background-100">
        <PageStatus />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
