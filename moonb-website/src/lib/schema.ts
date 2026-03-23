// JSON-LD Schema Generators

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Moonb',
    url: 'https://www.moonb.io',
    logo: 'https://www.moonb.io/favicon.svg',
    description:
      'Moonb is a dedicated creative team providing enterprise-grade design, video production, motion graphics, and animation. Each client gets a dedicated Creative Director.',
    foundingDate: '2020',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lisbon',
      addressCountry: 'PT',
    },
    sameAs: [
      'https://www.linkedin.com/company/moonb',
      'https://clutch.co/profile/moonb',
    ],
    knowsAbout: [
      'Video Production',
      'Motion Graphics',
      'Graphic Design',
      'Animation',
      'Creative Strategy',
    ],
  };
}

interface ServicePageData {
  title: string;
  shortDescription?: string;
  metaDescription?: string;
  slug: { current: string };
}

export function serviceSchema(page: ServicePageData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.title,
    description: page.shortDescription || page.metaDescription || '',
    provider: {
      '@type': 'Organization',
      name: 'Moonb',
      url: 'https://www.moonb.io',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    url: `https://www.moonb.io/services/${page.slug.current}`,
  };
}

interface FAQ {
  question: string;
  answer: string;
}

export function faqPageSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

interface BlogPostData {
  title: string;
  metaDescription?: string;
  publishDate: string;
  author?: string;
  heroImage?: any;
  slug: { current: string };
}

export function articleSchema(post: BlogPostData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription || '',
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: {
      '@type': 'Organization',
      name: post.author || 'Moonb',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Moonb',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.moonb.io/favicon.svg',
      },
    },
    url: `https://www.moonb.io/blog/${post.slug.current}`,
  };
}

interface Crumb {
  name: string;
  url: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

interface VideoData {
  title: string;
  description: string;
  thumbnailUrl: string;
  embedUrl: string;
  duration?: string;
  uploadDate?: string;
}

export function videoObjectSchema(video: VideoData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    embedUrl: video.embedUrl,
    duration: video.duration,
    uploadDate: video.uploadDate || new Date().toISOString(),
  };
}

interface ReviewData {
  author: string;
  reviewBody: string;
  ratingValue: number;
}

export function reviewSchema(reviews: ReviewData[]) {
  const avgRating =
    reviews.reduce((sum, r) => sum + r.ratingValue, 0) / reviews.length;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Moonb',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewBody: r.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.ratingValue,
        bestRating: '5',
        worstRating: '1',
      },
    })),
  };
}
