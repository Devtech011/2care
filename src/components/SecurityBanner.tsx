export default function SecurityBanner() {
    return (
      <section className="bg-violet-50 border border-violet-100 text-violet-700 text-sm p-4 rounded-lg mb-10 flex items-start gap-2">
        <span>🔒</span>
        <p>
          <strong className="block font-medium">HIPAA-Compliant Security</strong>
          Your medical data is protected with industry-leading encryption and security protocols that meet or exceed HIPAA requirements. We never share your data with third parties without your explicit consent.
        </p>
      </section>
    );
  }
  