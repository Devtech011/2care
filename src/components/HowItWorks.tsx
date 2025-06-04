export default function HowItWorks() {
    return (
      <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">How It Works</h2>
        <div className="space-y-4 text-sm">
          {[
            {
              icon: "📤",
              title: "Upload Your Report",
              desc: "Securely upload your medical report through our platform or WhatsApp",
            },
            {
              icon: "🤖",
              title: "AI Analysis",
              desc: "Our AI extracts key health information while maintaining privacy",
            },
            {
              icon: "📝",
              title: "Patient-Friendly Summary",
              desc: "Receive a clear, easy-to-understand explanation of your results",
            },
          ].map((step, index) => (
            <div className="flex items-start gap-3" key={index}>
              <span className="text-violet-600">{step.icon}</span>
              <div>
                <strong className="block text-gray-800">{step.title}</strong>
                <p className="text-gray-500">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  