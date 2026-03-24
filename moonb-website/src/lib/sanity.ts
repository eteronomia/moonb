import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'hhf4opm0';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-03-23',
  useCdn: true,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

// Service Pages
export async function getServicePages() {
  return client.fetch(`*[_type == "servicePage"] | order(title asc)`);
}
export async function getServicePage(slug: string) {
  return client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{
      ...,
      relatedServices[]->{title, slug, shortDescription},
      relatedIndustries[]->{title, slug}
    }`,
    { slug }
  );
}

// Industry Pages
export async function getIndustryPages() {
  return client.fetch(`*[_type == "industryPage"] | order(title asc)`);
}
export async function getIndustryPage(slug: string) {
  return client.fetch(
    `*[_type == "industryPage" && slug.current == $slug][0]{
      ...,
      relatedServices[]->{title, slug, shortDescription},
      relatedIndustries[]->{title, slug},
      relatedCaseStudies[]->{title, slug, client, heroImage}
    }`,
    { slug }
  );
}

// Blog Posts
export async function getBlogPosts() {
  return client.fetch(
    `*[_type == "blogPost" && noindex != true] | order(publishDate desc){
      title, slug, publishDate, category->{name, slug}, heroImage, metaTitle, metaDescription
    }`
  );
}
export async function getBlogPost(slug: string) {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      ...,
      category->{name, slug}
    }`,
    { slug }
  );
}

// Comparison Pages
export async function getComparisonPages() {
  return client.fetch(`*[_type == "comparisonPage"] | order(title asc)`);
}
export async function getComparisonPage(slug: string) {
  return client.fetch(
    `*[_type == "comparisonPage" && slug.current == $slug][0]`,
    { slug }
  );
}

// Categories
export async function getCategories() {
  return client.fetch(`*[_type == "category"] | order(name asc)`);
}
export async function getCategoryPosts(slug: string) {
  return client.fetch(
    `*[_type == "blogPost" && category->slug.current == $slug && noindex != true] | order(publishDate desc){
      title, slug, publishDate, heroImage, metaTitle, metaDescription
    }`,
    { slug }
  );
}

// Case Studies
export async function getCaseStudies() {
  return client.fetch(`*[_type == "caseStudy"] | order(title asc)`);
}

// About Page (singleton)
export async function getAboutPage() {
  return client.fetch(`*[_type == "aboutPage"][0]`);
}
