import { client } from '@/lib/sanity.client';
import urlFor from '@/lib/urlFor';
import dayjs from 'dayjs';
import { groq } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
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
    <>
      <div className='mb-4 flex items-center justify-center space-x-2 border-b border-white/20 pb-4'>
        <MdOutlineCategory className='text-2xl' />
        <h1 className='text-2xl'>{slug.replace(/%20/g, ' ')}</h1>
      </div>
      <div className='grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2'>
        {posts?.map((post: any) => (
          <article key={post?._id} className='space-y-1 duration-200 hover:scale-[101%]'>
            <Link href={`/${post?.slug?.current}`}>
              <div className='relative mb-1 h-80 w-full'>
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
            </Link>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-1.5'>
                <div className='relative h-6 w-6'>
                  <Image
                    className='rounded-full object-cover'
                    src={urlFor(post?.author?.image).url()}
                    alt={posts?.author?.name}
                    fill
                  />
                </div>
                <Link href={`/users/${post?.author?.slug?.current}`} className='text-sm hover:underline'>
                  {post?.author?.name}
                </Link>
              </div>
              <p className='ml-10 text-sm'>{dayjs(post?._createdAt).format('DD MMM')}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
