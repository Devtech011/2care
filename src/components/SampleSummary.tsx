import { useEffect, useRef } from 'react';

export default function SampleSummary({ summary }: any) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (summary && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [summary]);

  return (
    <section ref={sectionRef} className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-4">Sample Report Summary</h2>
      {summary && <div>
        <section className="p-4 rounded-xl bg-white shadow-md">
          {/* <article
        className="prose prose-sm max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: summary }}
      /> */}
          <div
            className="space-y-3"
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        </section>
      </div>}
     
    </section>
  );
}
