import React from "react";
import { motion } from "motion/react";

const testimonials = [
  {
    text: '"They were capable of adapting to fast delivery deadlines."',
    image: "/assets/testimonials/rene.avif",
    name: "Rene Ugarte",
    role: "Senior Producer",
    logo: "/assets/testimonials/rene-logo.svg",
  },
  {
    text: '"Their creative flair and dedication to getting the animation and storytelling style right are impressive."',
    image: "/assets/testimonials/marius.avif",
    name: "Marius Godo",
    role: "Content Specialist",
    logo: "/assets/testimonials/marius-logo.webp",
  },
  {
    text: '"The ability to quickly understand and adapt to the company branding was impressive."',
    image: "/assets/testimonials/diane.avif",
    name: "Diane Bizzle",
    role: "Art Director",
    logo: "/assets/testimonials/diana-logo.svg",
  },
  {
    text: '"Moonb delivered very high-quality work."',
    image: "/assets/testimonials/jacey.avif",
    name: "Jacey Crawford",
    role: "Content Manager",
    logo: "/assets/testimonials/jacey-logo.avif",
  },
  {
    text: '"This was the best experience we have had with a large project like this."',
    image: "/assets/testimonials/josh.avif",
    name: "Josh Kirshman",
    role: "Director of Marketing",
    logo: "/assets/testimonials/josh-logo.svg",
  },
  {
    text: '"My team really enjoyed working with Moonb and found the experience pretty seamless."',
    image: "/assets/testimonials/james.avif",
    name: "James Pais",
    role: "Creative Service Director",
    logo: "/assets/testimonials/james-logo.webp",
  },
  {
    text: '"The team is highly creative, talented, and eager to deliver above and beyond what our vision was."',
    image: "/assets/testimonials/jesse.avif",
    name: "Jesse Jankewicz",
    role: "Director of Video",
    logo: "/assets/testimonials/jesse-logo.svg",
  },
  {
    text: '"Their imagination, creativity, precision, and quality of work were impressive."',
    image: "/assets/testimonials/danila.avif",
    name: "Danila De Stefano",
    role: "CEO",
    logo: "/assets/testimonials/danila-logo.svg",
  },
];

const col1 = testimonials.slice(0, 3);
const col2 = testimonials.slice(3, 6);
const col3 = testimonials.slice(5, 8);

function Column({
  items,
  duration = 15,
  className = "",
}: {
  items: typeof testimonials;
  duration?: number;
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`tc-col ${className}`}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="tc-track"
      >
        {doubled.map((t, i) => (
          <div className="tc-card" key={`${t.name}-${i}`}>
            <p className="tc-card__text">{t.text}</p>
            <div className="tc-card__footer">
              <img src={t.image} alt={t.name} className="tc-card__avatar" />
              <div className="tc-card__info">
                <div className="tc-card__name">{t.name}</div>
                <div className="tc-card__role">{t.role}</div>
              </div>
              {t.logo && (
                <img src={t.logo} alt="" className="tc-card__logo" />
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function TestimonialsColumns() {
  return (
    <div
      className="tc-marquee"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
      }}
    >
      <Column items={col1} duration={18} />
      <Column items={col2} duration={22} className="tc-col--md" />
      <Column items={col3} duration={16} className="tc-col--lg" />
    </div>
  );
}
