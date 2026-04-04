"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { useLocale } from "@/components/locale-context";
import type { Locale } from "@/lib/i18n/types";

export function SiteNav() {
  const { locale, messages: t, switchLocale } = useLocale();
  const n = t.nav;
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  const links: { href: string; label: string; external?: true }[] = [
    { href: "/#trinity", label: n.trinity },
    { href: "/vape-tech", label: n.vapeTech },
    { href: "/#story", label: n.story },
    { href: "/contact", label: n.contact },
  ];

  const pickLocale = useCallback(
    async (next: Locale) => {
      if (next === locale) return;
      await switchLocale(next);
      close();
    },
    [locale, switchLocale, close],
  );

  return (
    <>
      <nav className="np-nav" aria-label={n.ariaPrimary}>
        <Link className="np-nav-logo" href="/" onClick={close} aria-label={n.ariaHome}>
          Night Phantom
        </Link>
        <div className="np-nav-cluster">
          <ul className="nav-links">
            {links.map(({ href, label, external }) => (
              <li key={href}>
                {external ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                ) : href.startsWith("/") ? (
                  <Link href={href}>{label}</Link>
                ) : (
                  <a href={href}>{label}</a>
                )}
              </li>
            ))}
          </ul>
          <div className="np-nav-tools">
            <div className="np-lang" role="group" aria-label={n.langSwitchTo}>
              <button
                type="button"
                className={`np-lang-btn ${locale === "en" ? "is-active" : ""}`}
                onClick={() => pickLocale("en")}
                aria-current={locale === "en" ? "true" : undefined}
              >
                {n.langEnglish}
              </button>
              <span className="np-lang-sep" aria-hidden>
                |
              </span>
              <button
                type="button"
                className={`np-lang-btn ${locale === "es" ? "is-active" : ""}`}
                onClick={() => pickLocale("es")}
                aria-current={locale === "es" ? "true" : undefined}
              >
                {n.langSpanish}
              </button>
            </div>
            <button
              type="button"
              className={`hamburger ${open ? "open" : ""}`}
              aria-label={open ? n.closeMenu : n.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu ${open ? "open" : ""}`}
        role="navigation"
        aria-label={n.mobileNav}
        aria-hidden={!open}
      >
        {links.map(({ href, label, external }) =>
          external ? (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
            >
              {label}
            </a>
          ) : href.startsWith("/") ? (
            <Link key={href} href={href} onClick={close}>
              {label}
            </Link>
          ) : (
            <a key={href} href={href} onClick={close}>
              {label}
            </a>
          ),
        )}
        <div className="mobile-menu-lang" role="group" aria-label={n.langSwitchTo}>
          <button
            type="button"
            className={`np-lang-btn ${locale === "en" ? "is-active" : ""}`}
            onClick={() => pickLocale("en")}
          >
            {n.langEnglish}
          </button>
          <span className="np-lang-sep" aria-hidden>
            |
          </span>
          <button
            type="button"
            className={`np-lang-btn ${locale === "es" ? "is-active" : ""}`}
            onClick={() => pickLocale("es")}
          >
            {n.langSpanish}
          </button>
        </div>
        <div className="menu-tagline">{n.tagline}</div>
      </div>
    </>
  );
}
