import { client } from '@/lib/sanity.client';
import urlFor from '@/lib/urlFor';
import { groq } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { FiUsers } from 'react-icons/fi';

const query = groq`
  *[_type=='author'] {
    name,
    image,
    slug {
      current
    },
  }
`;

export default async function Users() {
  const users = await client.fetch(query);

  return (
    <div>
      <div className='mb-4 flex items-center justify-center space-x-2 border-b border-white/20 pb-4'>
        <FiUsers className='text-2xl' />
        <h1 className='text-2xl'>Users</h1>
      </div>
      <ul className='list-disc space-y-4 text-xl'>
        {users?.map((author: any) => (
          <li key={author?.slug?.current}>
            <Link className='flex items-center space-x-2 hover:underline' href={`/users/${author?.slug?.current}`}>
              <div className='relative h-8 w-8'>
                <Image
                  className='rounded-full object-cover'
                  src={urlFor(author?.image).url()}
                  alt={author?.name}
                  fill
                />
              </div>
              <span>{author?.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
