export default function Loader() {
  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-violet-600 border-t-transparent"></div>
        <p className="text-violet-600 font-medium">Processing your request...</p>
      </div>
    </div>
  );
} 