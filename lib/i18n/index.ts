import { cookies } from "next/headers";
import { en } from "@/lib/i18n/dictionaries/en";
import { es } from "@/lib/i18n/dictionaries/es";
import type { Locale, Messages } from "@/lib/i18n/types";

export const LOCALE_COOKIE = "np_locale";

const dictionaries: Record<Locale, Messages> = { en, es };

export async function getLocale(): Promise<Locale> {
  const v = (await cookies()).get(LOCALE_COOKIE)?.value;
  return v === "es" ? "es" : "en";
}

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}

export type { Locale, Messages } from "./types";
