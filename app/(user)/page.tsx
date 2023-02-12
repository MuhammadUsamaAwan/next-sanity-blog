import { MdOutlineTrendingUp } from 'react-icons/md';

export default function Home() {
  return (
    <div>
      <div className='mb-4 flex items-center justify-center space-x-2'>
        <MdOutlineTrendingUp className='text-2xl' />
        <h1 className='text-2xl'>Trending on The Blog</h1>
      </div>
    </div>
  );
}
