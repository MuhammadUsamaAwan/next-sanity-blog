import BlogList from '@/components/BlogList';
import { client } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import { MdOutlineCategory } from 'react-icons/md';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const query = groq`
      *[_type=='category'] {
          title
      }`;
  const slugs = await client.fetch(query);
  return slugs.map((slug: any) => ({ slug: slug.title }));
}

const query = groq`
  *[_type=='post' && $slug in categories[]->title] {
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

export default async function CategoryPosts({ params: { slug } }: Props) {
  const posts = await client.fetch(query, { slug: slug.replace(/%20/g, ' ') });

  return (
    <div>
      <div className='mb-4 flex items-center justify-center space-x-2 border-b border-white/20 pb-4'>
        <MdOutlineCategory className='text-2xl' />
        <h1 className='text-2xl'>Trending on The Blog</h1>
      </div>
      <BlogList posts={posts} />
    </div>
  );
}
