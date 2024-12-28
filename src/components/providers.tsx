"use client";

import { ReactNode } from "react";
import { Provider } from "jotai";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    // <Provider initialValues = {initialValues}>
    <Provider>
      <MantineProvider>{children}</MantineProvider>
    </Provider>
  );
};
