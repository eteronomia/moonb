import React from 'react';

const testimonials = [
  {
    name: 'Rene Ugarte',
    role: 'Senior Producer',
    body: '"They were capable of adapting to fast delivery deadlines."',
    img: '/assets/headshots/rene.jpg',
  },
  {
    name: 'Marius Godo',
    role: 'Content Specialist',
    body: '"Their creative flair and dedication to getting the animation and storytelling style right are impressive."',
    img: '/assets/headshots/marius.jpg',
  },
  {
    name: 'Diane Bizzle',
    role: 'Art Director',
    body: '"The ability to quickly understand and adapt to the company branding was impressive."',
    img: '/assets/headshots/diane.jpg',
  },
  {
    name: 'Jacey Crawford',
    role: 'Content Manager',
    body: '"Moonb delivered very high-quality work."',
    img: '/assets/headshots/jacey.jpg',
  },
  {
    name: 'Josh Kirshman',
    role: 'Director of Marketing',
    body: '"This was the best experience we have had with a large project like this."',
    img: '/assets/headshots/josh.jpg',
  },
  {
    name: 'James Pais',
    role: 'Creative Service Director',
    body: '"My team really enjoyed working with Moonb and found the experience pretty seamless."',
    img: '/assets/headshots/james.jpg',
  },
  {
    name: 'Jesse Jankewicz',
    role: 'Director of Video',
    body: '"The team is highly creative, talented, and eager to deliver above and beyond what our vision was."',
    img: '/assets/headshots/jesse.jpg',
  },
  {
    name: 'Danila De Stefano',
    role: 'CEO',
    body: '"Their imagination, creativity, precision, and quality of work were impressive."',
    img: '/assets/headshots/danila.jpg',
  },
];

function Card({ name, role, body, img }: typeof testimonials[number]) {
  return (
    <div className="t3d-card">
      <div className="t3d-card__top">
        <img src={img} alt={name} className="t3d-card__avatar" />
        <div>
          <div className="t3d-card__name">{name}</div>
          <div className="t3d-card__role">{role}</div>
        </div>
      </div>
      <p className="t3d-card__body">{body}</p>
    </div>
  );
}

function MarqueeColumn({ items, reverse = false }: { items: typeof testimonials; reverse?: boolean }) {
  // Repeat 3x for seamless loop
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
  // Split testimonials into 4 columns
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
      {/* Gradient fades */}
      <div className="t3d-fade t3d-fade--top" />
      <div className="t3d-fade t3d-fade--bottom" />
      <div className="t3d-fade t3d-fade--left" />
      <div className="t3d-fade t3d-fade--right" />
    </div>
  );
}
