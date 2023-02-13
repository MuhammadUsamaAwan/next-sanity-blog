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
            <div className='relative h-80 w-full'>
              <Image
                className='brightness-80 rounded object-cover'
                src={urlFor(post?.mainImage).url()}
                alt={post?.title}
                fill
              />
            </div>
            <h1 className='text-xl'>{post?.title}</h1>
          </Link>
          <div className='item-center flex space-x-1'>
            <div className='relative h-6 w-6'>
              <Image
                className='rounded-full object-cover'
                src={urlFor(post?.mainImage).url()}
                alt={posts?.author?.name}
                fill
              />
            </div>
            <Link href={`/users/${post?.author?.slug?.current}`} className='text-sm hover:underline'>
              {post?.author?.name}
            </Link>
            <p className='ml-5 text-sm'>{dayjs(post?._createdAt).format('DD MMM')}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
