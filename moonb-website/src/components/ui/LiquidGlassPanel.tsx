import type { CSSProperties, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  variant?: 'default' | 'hero' | 'card' | 'testimonial' | 'floating' | 'purple';
  className?: string;
  style?: CSSProperties;
}

const variantClass: Record<string, string> = {
  default: 'glass',
  hero: 'glass-hero',
  card: 'glass-card',
  testimonial: 'glass-testimonial',
  floating: 'glass-floating',
  purple: 'glass-purple',
};

export default function LiquidGlassPanel({
  children,
  variant = 'default',
  className = '',
  style,
}: Props) {
  return (
    <div
      className={`${variantClass[variant]} ${className}`}
      style={{ padding: 'var(--space-8)', ...style }}
    >
      {children}
    </div>
  );
}
