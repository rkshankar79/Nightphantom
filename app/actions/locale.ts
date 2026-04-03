"use server";

import { cookies } from "next/headers";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n";

export async function setPreferredLocale(locale: unknown) {
  const safe: Locale = locale === "es" ? "es" : "en";
  const jar = await cookies();
  jar.set(LOCALE_COOKIE, safe, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
