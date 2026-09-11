"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/private-therapy", label: "Private Therapy" },
  { href: "/community-support", label: "Community Support" },
  { href: "/training", label: "Training" },
  { href: "/aint-books", label: "Books" },
  { href: "/collabs", label: "Collab & Awards" },
  { href: "/blog", label: "Blog" },
];

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    document.body.classList.remove("menu-open");
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  return (
    <>
      <div className="progress-bar" id="progressBar" />
      <header id="nav" className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="header-inner">
          <div className="header-top">
            <Link href="/" className="nav-logo" aria-label="AINT Foundation homepage">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="logo-image"
                src="/media/2026/05/AINT-Foundation-CIC-logo.webp"
                alt="AINT Foundation CIC logo"
              />
              <div className="logo-copy">
                <div className="logo-name">AINT Foundation CIC</div>
                <div className="logo-sub">Community Interest Company</div>
              </div>
            </Link>

            <div className="header-cta-group">
              <a className="header-btn header-btn-accent" href="tel:+443000301309">
                <span className="header-btn-full">Free Call +44 3000 301309</span>
                <span className="header-btn-short">Call</span>
              </a>
              <Link className="header-btn header-btn-primary" href="/book-private">
                Book a Session
              </Link>
            </div>

            <div className="mobile-header-actions">
              <a className="mobile-call-btn" href="tel:+443000301309" aria-label="Call AINT Foundation">
                <span aria-hidden="true">☎</span>
              </a>
              <Link className="header-btn header-btn-primary mobile-book-btn" href="/book-private">
                Book
              </Link>
              <button
                className="hamburger"
                id="hamburger"
                data-react-nav="true"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                aria-controls="mobileMenu"
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span /><span /><span />
              </button>
            </div>
          </div>

          <nav className="header-center-nav" aria-label="Primary navigation">
            <ul className="nav-links">
              {NAV.map((item) => (
                <li key={item.href} className={isCurrent(pathname, item.href) ? "is-current" : undefined}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`} id="mobileMenu">
        <ul className="mobile-nav-links">
          {NAV.map((item) => (
            <li key={item.href} className={isCurrent(pathname, item.href) ? "is-current" : undefined}>
              <Link href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-cta-group">
          <a className="header-btn header-btn-accent" href="tel:+443000301309">
            Free Call +44 3000 301309
          </a>
          <Link className="header-btn header-btn-primary" href="/book-private">
            Book a Session
          </Link>
        </div>
      </div>
    </>
  );
}
