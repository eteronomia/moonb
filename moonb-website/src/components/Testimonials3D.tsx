import React from 'react';

const testimonials = [
  {
    name: 'Rene Ugarte',
    role: 'Senior Producer',
    body: '"They were capable of adapting to fast delivery deadlines."',
    img: '/assets/testimonials/rene.avif',
    logo: '/assets/testimonials/rene-logo.svg',
  },
  {
    name: 'Marius Godo',
    role: 'Content Specialist',
    body: '"Their creative flair and dedication to getting the animation and storytelling style right are impressive."',
    img: '/assets/testimonials/marius.avif',
    logo: '/assets/testimonials/marius-logo.webp',
  },
  {
    name: 'Diane Bizzle',
    role: 'Art Director',
    body: '"The ability to quickly understand and adapt to the company branding was impressive."',
    img: '/assets/testimonials/diane.avif',
    logo: '/assets/testimonials/diana-logo.svg',
  },
  {
    name: 'Jacey Crawford',
    role: 'Content Manager',
    body: '"Moonb delivered very high-quality work."',
    img: '/assets/testimonials/jacey.avif',
    logo: '/assets/testimonials/jacey-logo.avif',
  },
  {
    name: 'Josh Kirshman',
    role: 'Director of Marketing',
    body: '"This was the best experience we have had with a large project like this."',
    img: '/assets/testimonials/josh.avif',
    logo: '/assets/testimonials/josh-logo.svg',
  },
  {
    name: 'James Pais',
    role: 'Creative Service Director',
    body: '"My team really enjoyed working with Moonb and found the experience pretty seamless."',
    img: '/assets/testimonials/james.avif',
    logo: '/assets/testimonials/james-logo.webp',
  },
  {
    name: 'Jesse Jankewicz',
    role: 'Director of Video',
    body: '"The team is highly creative, talented, and eager to deliver above and beyond what our vision was."',
    img: '/assets/testimonials/jesse.avif',
    logo: '/assets/testimonials/jesse-logo.svg',
  },
  {
    name: 'Danila De Stefano',
    role: 'CEO',
    body: '"Their imagination, creativity, precision, and quality of work were impressive."',
    img: '/assets/testimonials/danila.avif',
    logo: '/assets/testimonials/danila-logo.svg',
  },
];

function Card({ name, role, body, img, logo }: typeof testimonials[number]) {
  return (
    <div className="t3d-card">
      <div className="t3d-card__top">
        <img src={img} alt={name} className="t3d-card__avatar" />
        <div className="t3d-card__info">
          <div className="t3d-card__name">{name}</div>
          <div className="t3d-card__role">{role}</div>
        </div>
        {logo && <img src={logo} alt="" className="t3d-card__logo" />}
      </div>
      <p className="t3d-card__body">{body}</p>
    </div>
  );
}

function MarqueeColumn({ items, reverse = false }: { items: typeof testimonials; reverse?: boolean }) {
  const repeated = [...items, ...items, ...items];
  return (
    <div className={`t3d-col ${reverse ? 't3d-col--reverse' : ''}`}>
      <div className="t3d-col__track">
        {repeated.map((t, i) => (
          <Card key={`${t.name}-${i}`} {...t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials3D() {
  const col1 = testimonials.slice(0, 4);
  const col2 = testimonials.slice(4, 8);
  const col3 = [...testimonials.slice(2, 6)];
  const col4 = [...testimonials.slice(5, 8), testimonials[0]];

  return (
    <div className="t3d-wrap">
      <div className="t3d-stage">
        <MarqueeColumn items={col1} />
        <MarqueeColumn items={col2} reverse />
        <MarqueeColumn items={col3} />
        <MarqueeColumn items={col4} reverse />
      </div>
      <div className="t3d-fade t3d-fade--top" />
      <div className="t3d-fade t3d-fade--bottom" />
      <div className="t3d-fade t3d-fade--left" />
      <div className="t3d-fade t3d-fade--right" />
    </div>
  );
}
