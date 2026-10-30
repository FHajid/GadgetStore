
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Column: Interactive 3D Model */}
        <div className="w-full">
          <p className="text-center text-xs text-gray-400 mt-2">
            Drag to rotate • Scroll to zoom
          </p>
        </div>

        {/* Right Column: Product Details */}
        <div className="flex flex-col space-y-4">
          <span className="text-xs font-semibold tracking-wide uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
            Featured 3D Product
          </span>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-blue-600 text-white font-medium py-3 px-6 rounded-xl hover:bg-blue-700 transition">
              Add to Cart
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-50 transition">
              Buy Now
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}