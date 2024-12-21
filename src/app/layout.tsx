import "../globals.css";
import { Header, Footer, PageStatus } from "@/components/index";

import { ProjectMetadata } from "@/util/types";
import { Providers } from "@/components/providers";
import { ReactNode } from "react";

export const metadata = {
  title: ProjectMetadata.appName,
  description: ProjectMetadata.appDescription,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/* TODO: WARNING! remove surpressHydration before production. This was added to prevent popups that are caused by browser extensions */}
      <body
        className="tw-bg-background-100 tw-h-screen tw-flex tw-flex-col"
        suppressHydrationWarning
      >
        {/* <body className="tw-bg-background-100"> */}
        <Providers>
          <PageStatus />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
