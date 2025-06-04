'use client';

import Header from '@/components/Header';
import FileUploader from '@/components/FileUploader';
import HowItWorks from '@/components/HowItWorks';
import SecurityBanner from '@/components/SecurityBanner';
import SampleSummary from '@/components/SampleSummary';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Home() {
  const [summary, setSummary] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get('token');
    setToken(storedToken || null);
  }, [token]);

  return (
    <main className="min-h-screen bg-white px-4 py-10 md:px-8 lg:px-20 font-sans">
      <Header token={token} />
      <section className="grid gap-6 md:grid-cols-2 mb-10">
        <FileUploader setSummary={setSummary} token={token} />
        <HowItWorks />
      </section>
      <SecurityBanner />
      <SampleSummary summary={summary} />
    </main>
  );
}
