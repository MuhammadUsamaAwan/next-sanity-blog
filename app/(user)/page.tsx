import { previewData } from 'next/headers';
import { MdOutlineTrendingUp } from 'react-icons/md';
import { groq } from 'next-sanity';
import { client } from '@/lib/sanity.client';
import PreviewSuspense from '@/components/PreviewSuspense';
import PreviewBlogList from '@/components/PreviewBlogList';

const query = groq`
  *[_type=='post'] {
    ...,
    author->,
    categories->,
  } | order(_createdAt desc)
`;

export default async function Home() {
  if (previewData()) {
    return (
      <PreviewSuspense fallback='Loading Preview...'>
        <PreviewBlogList query={query} />
      </PreviewSuspense>
    );
  }

  // const posts = await client.fetch(query);
  return (
    <div>
      <div className='mb-4 flex items-center justify-center space-x-2'>
        <MdOutlineTrendingUp className='text-2xl' />
        <h1 className='text-2xl'>Trending on The Blog</h1>
      </div>
    </div>
  );
}
