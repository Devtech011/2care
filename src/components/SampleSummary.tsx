'use client';

import { useEffect, useRef } from 'react';
import { SampleSummaryProps } from '@/types';

export default function SampleSummary({ summary }: SampleSummaryProps) {
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (summary && summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [summary]);

  return (
    <section ref={summaryRef} className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-4">Sample Report Summary</h2>
      {summary && <div>
        <section className="p-4 rounded-xl bg-white shadow-md">
          <div
            className="space-y-3"
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        </section>
      </div>}
     
    </section>
  );
}
