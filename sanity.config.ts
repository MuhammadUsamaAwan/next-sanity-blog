import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  basePath: '/studio',
  name: 'Blog_Content_Studio',
  title: 'Blog Content Studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATABASE!,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
