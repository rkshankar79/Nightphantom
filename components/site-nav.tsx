"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

type NavLink =
  | { href: string; label: string; external?: false }
  | { href: string; label: string; external: true };

const links: NavLink[] = [
  { href: "#trinity", label: "Trinity" },
  { href: "/vape-tech", label: "Vape tech" },
  { href: "#story", label: "Story" },
  { href: "#stores", label: "Stores" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <nav className="np-nav" aria-label="Primary">
        <Link className="np-nav-logo" href="/" onClick={close} aria-label="Night Phantom home">
          Night Phantom
        </Link>
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
        <button
          type="button"
          className={`hamburger ${open ? "open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu ${open ? "open" : ""}`}
        role="navigation"
        aria-label="Mobile"
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
        <div className="menu-tagline">Untamed Spirit</div>
      </div>
    </>
  );
}
