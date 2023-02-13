import urlFor from '@/lib/urlFor';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  posts: any;
}

export default function BlogList({ posts }: Props) {
  return (
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
          </Link>
          <div className='flex items-center justify-between'>
            <Link href={`/${post?.slug?.current}`}>
              <h1 className='text-xl'>{post?.title}</h1>
            </Link>
            <div className='flex items-center space-x-2 whitespace-nowrap text-sm'>
              {post?.categories?.map((category: any) => (
                <Link
                  href={`/categories/${category?.title}`}
                  className='rounded-full bg-slate-400 px-2 py-0.5'
                  key={category?.title}
                >
                  {category?.title}
                </Link>
              ))}
            </div>
          </div>

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
  );
}
