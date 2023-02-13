import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { getDefaultDocumentNode } from './structure';

export default defineConfig({
  basePath: '/studio',
  name: 'Blog_Content_Studio',
  title: 'Blog Content Studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATABASE!,

  plugins: [
    deskTool({
      defaultDocumentNode: getDefaultDocumentNode,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
