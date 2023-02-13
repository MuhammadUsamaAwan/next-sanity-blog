import BlogList from '@/components/BlogList';
import { RichTextComponents } from '@/components/RichTextComponent';
import { client } from '@/lib/sanity.client';
import urlFor from '@/lib/urlFor';
import { PortableText } from '@portabletext/react';
import { groq } from 'next-sanity';
import Image from 'next/image';
import { MdPostAdd } from 'react-icons/md';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const query = groq`
      *[_type=='author'] {
          slug
      }`;
  const slugs = await client.fetch(query);
  const slugRoutes = slugs.map((slug: any) => slug.slug.current);
  return slugRoutes.map((slug: any) => ({
    slug,
  }));
}

const query = groq`
  *[_type=='post' && author->name == $name] {
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

const queryAuthor = groq`
  *[_type=='author' && slug.current == $slug][0] {
    name,
    image,
    bio
  }
`;

export default async function User({ params: { slug } }: Props) {
  const author = await client.fetch(queryAuthor, { slug });
  const posts = await client.fetch(query, { name: author?.name });
  console.log(author);

  return (
    <div>
      <div className='mb-4 flex items-center justify-center space-x-2 border-b border-white/20 pb-4'>
        <div className='relative h-8 min-w-[2rem]'>
          <Image
            className='brightness-80 rounded object-cover'
            src={urlFor(author?.image).url()}
            alt={author?.name}
            fill
          />
        </div>
        <h1 className='text-2xl'>About {author?.name}</h1>
      </div>
      <div className='mb-5'>
        {/* @ts-ignore */}
        <PortableText value={author?.bio} components={RichTextComponents} />
      </div>
      <div className='mb-4 flex items-center justify-center space-x-2 border-b border-white/20 pb-4'>
        <MdPostAdd className='text-2xl' />
        <h1 className='text-2xl'>Posts by {author?.name}</h1>
      </div>
      <BlogList posts={posts} />
    </div>
  );
}
