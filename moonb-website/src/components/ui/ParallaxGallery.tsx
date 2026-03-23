import { useEffect, useRef } from 'react';

interface GalleryItem {
  title: string;
  image: string;
  href?: string;
}

interface Props {
  items: GalleryItem[];
}

export default function ParallaxGallery({ items }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP ScrollTrigger will be initialized here once GSAP is loaded
    // For now, items render statically with CSS-based parallax hints
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'var(--space-8)',
        padding: 'var(--space-8) 0',
      }}
    >
      {items.map((item, i) => (
        <div
          key={item.title}
          className="card"
          data-parallax-speed={i % 2 === 0 ? '0.8' : '1.2'}
          style={{
            overflow: 'hidden',
            padding: 0,
            transform: i % 2 === 0 ? 'translateY(20px)' : 'translateY(-20px)',
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            style={{
              width: '100%',
              height: '240px',
              objectFit: 'cover',
            }}
          />
          <div style={{ padding: 'var(--space-6)' }}>
            <h3 style={{ fontSize: 'var(--text-h4)' }}>{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
