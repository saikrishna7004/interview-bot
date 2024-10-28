"use client";
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { useRouter } from 'next/navigation';

export function Providers({ children }) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider>
        {children}
        <ProgressBar
          height="2px"
          color="#E69B2E"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </NextThemesProvider>
    </NextUIProvider>
  )
}