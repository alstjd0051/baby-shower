"use client";

import React, { Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import Header from "./header";

const LayoutWrapper = ({ children, ...props }: ThemeProviderProps) => {
  const [mounted, setMounted] = useState(false);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
            gcTime: 1000 * 60 * 5,
          },
        },
      })
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return;
  }
  return (
    <>
      <NextThemesProvider
        storageKey={"theme"}
        attribute="class"
        defaultTheme="dark"
        {...props}
      >
        <QueryClientProvider client={queryClient}>
          <Header />
          {children}
          {process.env.NODE_ENV === "development" && (
            <Suspense fallback={null}>
              <ReactQueryDevtools
                initialIsOpen={false}
                buttonPosition="bottom-left"
                position="bottom"
              />
            </Suspense>
          )}
        </QueryClientProvider>
      </NextThemesProvider>
    </>
  );
};

export default LayoutWrapper;
