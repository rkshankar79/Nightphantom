import { getLocale, getMessages } from "@/lib/i18n";

const SDG_URL = "https://sourdieselgroup.com";

export async function PoweredBy({ className = "" }: { className?: string }) {
  const t = getMessages(await getLocale());
  return (
    <p className={["np-powered-by", className].filter(Boolean).join(" ")}>
      <span>{t.site.poweredByLead}</span>{" "}
      <a href={SDG_URL} target="_blank" rel="noopener noreferrer">
        {t.site.poweredByName}
      </a>
    </p>
  );
}
