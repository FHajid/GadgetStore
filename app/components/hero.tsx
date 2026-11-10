import Link from 'next/link';

export default function Hero() {
return (
<section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div>
        <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
        3D Interactive Store
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold mt-4 leading-tight">
        Inspect Tech Gadgets in <span className="text-blue-500">360° Detail</span>
        </h1>
        <p className="text-slate-400 mt-4 text-base sm:text-lg">
        Rotate, zoom, and interact with electronic products directly in your browser before placing an order.
        </p>
        <div className="mt-8 flex gap-4">
            <a href="#catalog" className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-xl transition">
            Explore Products
            </a>
            <Link href="/admin" className="border border-slate-700 hover:bg-slate-800 text-slate-300 font-medium px-6 py-3 rounded-xl transition">
            Admin Portal
            </Link>
        </div>
        </div>
       {/* Live 3D Hero Model */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 h-[350px] sm:h-[400px]">
        </div>
    </div>
    </section>
    );
}