'use client';

import InterviewBot from '@/components/InterviewBot';

export default function Home() {
  return (
    <main>
      <div className="container mx-auto">
        <h2 className='text-2xl font-bold text-center my-4'>Interview Bot</h2>
        <InterviewBot />
      </div>
    </main>
  );
}
