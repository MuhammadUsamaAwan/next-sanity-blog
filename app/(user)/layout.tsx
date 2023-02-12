import Header from '@/components/Header';
import '../globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head />
      <body className='bg-black text-gray-200'>
        <Header />
        <main className='pt-16'>
          <div className='mx-auto p-4 lg:max-w-4xl xl:max-w-7xl'>{children}</div>
        </main>
      </body>
    </html>
  );
}
