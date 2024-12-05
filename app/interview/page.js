// app/page.tsx (Client Component)

'use client';

import { useSession } from 'next-auth/react';
import InterviewBot from '@/components/InterviewBot';
import { Spinner } from '@nextui-org/react';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }
  
  const userData = session?.user || {};
  console.log(userData)

  return (
    <main>
      <div className="container mx-auto">
        <h2 className='text-2xl font-bold text-center mb-4'>Interview Bot</h2>
        <InterviewBot userData={userData} />
      </div>
    </main>
  );
}
