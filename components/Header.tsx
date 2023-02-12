import Link from 'next/link';
import { ImFire } from 'react-icons/im';

export default function Header() {
  return (
    <header className='fixed top-0 w-full border-b border-white/20 bg-black/80 backdrop-blur-sm	backdrop-saturate-150'>
      <nav className='mx-auto flex items-center justify-between p-4 lg:max-w-4xl xl:max-w-7xl'>
        <Link href='/' className='flex items-center space-x-2 text-xl font-semibold sm:text-2xl'>
          <ImFire />
          <span>The Blog</span>
        </Link>
        <ul className='flex items-center space-x-5'>
          <li className='hidden sm:block'>
            <Link href='/' className='p-2 hover:text-white'>
              Home
            </Link>
          </li>
          <li>
            <Link href='/' className='p-2 hover:text-white'>
              Categories
            </Link>
          </li>
          <li>
            <Link href='/' className='p-2 hover:text-white'>
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
