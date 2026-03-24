import { useState, useEffect, useRef } from 'react';

const services = [
  { label: 'Video Production', href: '/services/corporate-video-production' },
  { label: 'Motion Graphics', href: '/services/motion-graphics' },
  { label: 'Graphic Design', href: '/services/graphic-design' },
  { label: '2D & 3D Animation', href: '/services/2d-animation' },
  { label: 'Video Editing', href: '/services/video-editing' },
  { label: 'Brand Identity', href: '/services/brand-identity-design' },
  { label: 'Presentation Design', href: '/services/presentation-design' },
  { label: 'Creative Strategy', href: '/services/creative-strategy' },
  { label: 'View All Services →', href: '/services' },
];

const industries = [
  { label: 'SaaS', href: '/industries/saas-video-production' },
  { label: 'Fintech', href: '/industries/fintech-video-production' },
  { label: 'Healthcare', href: '/industries/healthcare-video-production' },
  { label: 'Tech', href: '/industries/tech-video-production' },
  { label: 'E-commerce', href: '/industries/ecommerce-video-production' },
  { label: 'Pharma', href: '/industries/pharma-video-production' },
  { label: 'View All Industries →', href: '/industries' },
];

const navLinks = [
  { label: 'What we do', href: '#capabilities' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Recent work', href: '#recent-work' },
  { label: 'Blog', href: '/blog' },
];

export default function LiquidGlassNav() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleMenuEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(menu);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 200);
  };

  const megaMenuItems = (items: typeof services) => (
    <div
      className="glass-floating"
      onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
      onMouseLeave={handleMenuLeave}
      style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '12px',
        display: 'grid',
        gridTemplateColumns: items.length > 7 ? '1fr 1fr' : '1fr',
        gap: '2px',
        minWidth: items.length > 7 ? '380px' : '220px',
        animation: 'fadeInDown 200ms ease-out',
      }}
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          style={{
            display: 'block',
            padding: '8px 14px',
            fontSize: '14px',
            fontWeight: item.label.includes('→') ? 600 : 400,
            color: item.label.includes('→') ? 'var(--color-purple-500)' : 'var(--color-text-primary)',
            borderRadius: '8px',
            transition: 'background 150ms ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.background = 'rgba(124,58,237,0.08)'; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'transparent'; }}
        >
          {item.label}
        </a>
      ))}
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
        @media (min-width: 901px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile-toggle { display: none !important; }
        }
      `}</style>
      <nav
        ref={navRef}
        className={`glass-nav ${scrolled ? 'glass-nav--scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: scrolled ? '6px 16px' : '10px 24px',
          transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
          maxWidth: '95vw',
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '1.125rem',
            color: 'var(--color-purple-600)',
            marginRight: '12px',
            whiteSpace: 'nowrap',
          }}
        >
          Moonb
        </a>

        {/* Desktop nav */}
        <div className="nav-desktop" style={{ alignItems: 'center', gap: '2px' }}>
          {/* Services dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => handleMenuEnter('services')}
            onMouseLeave={handleMenuLeave}
          >
            <button
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
                padding: '6px 12px',
                borderRadius: '9999px',
                transition: 'background 150ms ease',
                background: openMenu === 'services' ? 'rgba(124,58,237,0.08)' : 'transparent',
                cursor: 'pointer',
              }}
            >
              Services ▾
            </button>
            {openMenu === 'services' && megaMenuItems(services)}
          </div>

          {/* Industries dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => handleMenuEnter('industries')}
            onMouseLeave={handleMenuLeave}
          >
            <button
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
                padding: '6px 12px',
                borderRadius: '9999px',
                transition: 'background 150ms ease',
                background: openMenu === 'industries' ? 'rgba(124,58,237,0.08)' : 'transparent',
                cursor: 'pointer',
              }}
            >
              Industries ▾
            </button>
            {openMenu === 'industries' && megaMenuItems(industries)}
          </div>

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
                padding: '6px 12px',
                borderRadius: '9999px',
                transition: 'background 150ms ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.background = 'rgba(124,58,237,0.08)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'transparent'; }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="/book-a-demo"
          className="btn btn--primary"
          style={{
            marginLeft: 'auto',
            padding: '7px 20px',
            fontSize: '14px',
          }}
        >
          Book a Demo
        </a>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{
            marginLeft: '8px',
            width: '36px',
            height: '36px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            fontSize: '18px',
          }}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="glass-floating"
          style={{
            position: 'fixed',
            top: '80px',
            left: '16px',
            right: '16px',
            zIndex: 99,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            animation: 'fadeInDown 200ms ease-out',
          }}
        >
          {[...navLinks, { label: 'Services', href: '/services' }, { label: 'Industries', href: '/industries' }].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                padding: '12px 16px',
                fontSize: '16px',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
                borderRadius: '12px',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
