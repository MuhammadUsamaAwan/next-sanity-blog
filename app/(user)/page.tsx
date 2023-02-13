import { previewData } from 'next/headers';
import { MdOutlineTrendingUp } from 'react-icons/md';
import { groq } from 'next-sanity';
import { client } from '@/lib/sanity.client';
import PreviewSuspense from '@/components/PreviewSuspense';
import PreviewBlogList from '@/components/PreviewBlogList';
import BlogList from '@/components/BlogList';

const query = groq`
  *[_type=='post'] {
    mainImage,
    title,
    _createdAt,
    slug {
      current
    },
    author-> {
      name,
      image,
      slug {
        current
      },
    },
    categories[]->{
      title
    },
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

  const posts = await client.fetch(query);
  return (
    <div>
      <div className='mb-4 flex items-center justify-center space-x-2 border-b border-white/20 pb-4'>
        <MdOutlineTrendingUp className='text-2xl' />
        <h1 className='text-2xl'>Trending on The Blog</h1>
      </div>
      <BlogList posts={posts} />
    </div>
  );
}
