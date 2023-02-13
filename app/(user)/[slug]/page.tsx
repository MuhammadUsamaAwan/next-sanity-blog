import { client } from '@/lib/sanity.client';
import urlFor from '@/lib/urlFor';
import dayjs from 'dayjs';
import { groq } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from '@/components/RichTextComponent';

interface Props {
  params: {
    slug: string;
  };
}

const query = groq`
    *[_type=='post' && slug.current == $slug][0]
    {
      mainImage,
      title,
      _createdAt,
      slug {
      current
      },
      body,
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
    }
`;

export default async function page({ params: { slug } }: Props) {
  const post = await client.fetch(query, { slug });

  return (
    <article>
      <div className='relative mb-1 h-96 w-full'>
        <Image
          className='brightness-80 rounded object-cover'
          src={urlFor(post?.mainImage).url()}
          alt={post?.title}
          fill
        />
      </div>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl'>{post?.title}</h1>
        <div className='flex items-center space-x-2 whitespace-nowrap text-sm'>
          {post?.categories?.map((category: any) => (
            <div className='rounded-full bg-slate-400 px-2 py-0.5' key={category?.title}>
              {category?.title}
            </div>
          ))}
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-1.5'>
          <div className='relative h-6 w-6'>
            <Image
              className='rounded-full object-cover'
              src={urlFor(post?.mainImage).url()}
              alt={post?.author?.name}
              fill
            />
          </div>
          <Link href={`/users/${post?.author?.slug?.current}`} className='text-sm hover:underline'>
            {post?.author?.name}
          </Link>
        </div>
        <p className='ml-10 text-sm'>{dayjs(post?._createdAt).format('DD MMM')}</p>
      </div>
      <div className='mt-5'>
        {/* @ts-ignore */}
        <PortableText value={post.body} components={RichTextComponents} />
      </div>
    </article>
  );
}
