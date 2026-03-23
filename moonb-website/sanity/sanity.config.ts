import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import blogPost from './schemas/blogPost';
import servicePage from './schemas/servicePage';
import industryPage from './schemas/industryPage';
import comparisonPage from './schemas/comparisonPage';
import caseStudy from './schemas/caseStudy';
import category from './schemas/category';
import aboutPage from './schemas/aboutPage';

export default defineConfig({
  name: 'moonb',
  title: 'Moonb CMS',
  projectId: 'hhf4opm0',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [
      blogPost,
      servicePage,
      industryPage,
      comparisonPage,
      caseStudy,
      category,
      aboutPage,
    ],
  },
});
