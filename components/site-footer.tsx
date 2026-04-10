import Link from "next/link";
import type { Messages } from "@/lib/i18n/types";
import { PoweredBy } from "@/components/powered-by";

type Props = {
  home: Messages["home"];
};

export function SiteFooter({ home }: Props) {
  return (
    <footer className="np-footer">
      <div className="np-footer-left">
        <p>
          © {new Date().getFullYear()} {home.footerRights}
        </p>
        <p className="np-footer-links">
          <Link className="footer-privacy-link" href="/privacy">
            {home.privacyLink}
          </Link>
          <span className="np-footer-sep" aria-hidden>
            ·
          </span>
          <Link className="footer-privacy-link" href="/compliance">
            {home.complianceLink}
          </Link>
        </p>
      </div>
      <p className="footer-disclaimer">{home.footerDisclaimer}</p>
      <PoweredBy />
    </footer>
  );
}
