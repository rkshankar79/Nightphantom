"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { setPreferredLocale } from "@/app/actions/locale";
import type { Locale, Messages } from "@/lib/i18n/types";

type Ctx = {
  locale: Locale;
  messages: Messages;
  switchLocale: (locale: Locale) => Promise<void>;
};

const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const switchLocale = useCallback(
    async (next: Locale) => {
      await setPreferredLocale(next);
      router.refresh();
    },
    [router],
  );

  const value = useMemo(
    () => ({ locale, messages, switchLocale }),
    [locale, messages, switchLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
