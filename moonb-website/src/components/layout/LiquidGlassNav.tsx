import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/pricing' },
];

export default function LiquidGlassNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`glass-nav ${scrolled ? 'glass-nav--scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 'var(--z-nav)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: scrolled ? '6px 16px' : '8px 20px',
        transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        maxWidth: '90vw',
      }}
    >
      <a
        href="/"
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: '1.125rem',
          color: 'var(--color-purple-600)',
          marginRight: '16px',
          whiteSpace: 'nowrap',
        }}
      >
        Moonb
      </a>

      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          style={{
            fontSize: 'var(--text-small)',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-pill)',
            transition: 'background 150ms ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = 'rgba(124,58,237,0.08)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = 'transparent';
          }}
        >
          {link.label}
        </a>
      ))}

      <a
        href="/book-a-demo"
        className="btn btn--primary"
        style={{
          marginLeft: '8px',
          padding: '6px 20px',
          fontSize: 'var(--text-small)',
        }}
      >
        Book a Demo
      </a>
    </nav>
  );
}
