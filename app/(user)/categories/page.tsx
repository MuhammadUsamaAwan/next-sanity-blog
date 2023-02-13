import { client } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import Link from 'next/link';
import { MdOutlineCategory } from 'react-icons/md';

const query = groq`
  *[_type=='category'] {
      title
  }
`;

export default async function Categories() {
  const categories = await client.fetch(query);

  return (
    <div>
      <div className='mb-4 flex items-center justify-center space-x-2 border-b border-white/20 pb-4'>
        <MdOutlineCategory className='text-2xl' />
        <h1 className='text-2xl'>Categories</h1>
      </div>
      <ul className='list-disc space-y-4 text-xl'>
        {categories?.map((category: any) => (
          <li key={category?.title}>
            <Link className='hover:underline' href={`/categories/${category?.title}`}>
              {category?.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
