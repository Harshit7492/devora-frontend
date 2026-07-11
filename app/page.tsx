import Link from "next/link";
import { ArrowRight, Play, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#101820] text-white selection:bg-blue-500/30 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-green-500 p-2 rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <span className="text-xl font-bold tracking-tight">Devora</span>
        </div>
        <div className="flex items-center gap-6 font-medium">
          <Link href="/login" className="hover:text-gray-300 transition-colors">Sign in</Link>
          <Link href="/pricing" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors shadow-sm">
            Sign up free
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-24">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <ul className="space-y-4 text-lg text-gray-300">
              <li>
                <Link href="/pricing" className="text-blue-400 font-semibold hover:underline decoration-2 underline-offset-4">Pricing & sign up</Link> — Two paid plans, one free plan
              </li>
              <li>
                <span className="text-blue-400 font-semibold hover:underline decoration-2 underline-offset-4 cursor-pointer">Devora 5 is here</span> — <span className="underline decoration-yellow-400 decoration-2 underline-offset-4">Major upgrade for 2026</span>
              </li>
              <li>
                <span className="text-blue-400 font-semibold hover:underline decoration-2 underline-offset-4 cursor-pointer">Features</span> — Remarkably simple, surprisingly capable
              </li>
              <li>
                <span className="text-blue-400 font-semibold hover:underline decoration-2 underline-offset-4 cursor-pointer">Paths</span> — Why people switch to Devora
              </li>
              <li>
                <span className="text-blue-400 font-semibold hover:underline decoration-2 underline-offset-4 cursor-pointer">API, CLI, Skills</span> — Developer tools, AI Agent-ready
              </li>
              <li>
                <span className="text-blue-400 font-semibold hover:underline decoration-2 underline-offset-4 cursor-pointer">Reliable to the core</span> — A multi-decade track record
              </li>
              <li>
                <span className="text-blue-400 font-semibold hover:underline decoration-yellow-400 decoration-2 underline-offset-4 cursor-pointer">87,038 people</span> <span className="underline decoration-yellow-400 decoration-2 underline-offset-4">are working in Devora right now!</span>
              </li>
            </ul>

            <div className="pt-8">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-8">
                The refreshingly straightforward project management system that's rock-solid and easy to use.
              </h1>
              
              <Link href="/pricing" className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold px-8 py-4 rounded-xl transition-transform hover:scale-[1.02] shadow-lg">
                <div className="bg-white text-blue-500 rounded-full p-1.5 shadow-sm">
                  <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                </div>
                Take a 3 minute tour of Devora
              </Link>
            </div>
          </div>

          <div className="relative">
            {/* Mockup Container */}
            <div className="bg-[#1C2632] border border-gray-700/50 rounded-2xl p-6 shadow-2xl shadow-black/50 rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-2 mb-6">
                <h3 className="text-xl font-bold text-white">Website Redesign Project</h3>
                <Star className="w-5 h-5 text-orange-400 fill-orange-400" />
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Mocked Cards */}
                <div className="bg-[#263240] rounded-xl p-4 border border-gray-700/50">
                  <h4 className="text-sm font-semibold mb-3">Message Board</h4>
                  <div className="space-y-3">
                    <div className="h-2 w-3/4 bg-gray-600 rounded"></div>
                    <div className="h-2 w-full bg-gray-600 rounded"></div>
                    <div className="h-2 w-5/6 bg-gray-600 rounded"></div>
                  </div>
                </div>
                <div className="bg-[#263240] rounded-xl p-4 border border-gray-700/50">
                  <h4 className="text-sm font-semibold mb-3">Docs & Files</h4>
                  <div className="space-y-3">
                    <div className="flex gap-2 items-center"><div className="w-4 h-4 bg-blue-500 rounded-sm"></div><div className="h-2 w-1/2 bg-gray-600 rounded"></div></div>
                    <div className="flex gap-2 items-center"><div className="w-4 h-4 bg-green-500 rounded-sm"></div><div className="h-2 w-2/3 bg-gray-600 rounded"></div></div>
                  </div>
                </div>
                <div className="bg-[#263240] rounded-xl p-4 border border-gray-700/50 hidden lg:block">
                  <h4 className="text-sm font-semibold mb-3">Project Tasks</h4>
                  <div className="space-y-2 mt-4">
                    <div className="h-1 w-full bg-blue-500/20 rounded"></div>
                    <div className="h-1 w-3/4 bg-blue-500/40 rounded"></div>
                  </div>
                </div>
                <div className="bg-[#263240] rounded-xl p-4 border border-gray-700/50">
                  <h4 className="text-sm font-semibold mb-3">Chat</h4>
                  <div className="flex gap-3 items-start mt-4">
                    <div className="w-6 h-6 rounded-full bg-gray-500 flex-shrink-0"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-2 w-1/2 bg-gray-600 rounded"></div>
                      <div className="h-2 w-full bg-gray-600 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#263240] rounded-xl p-4 border border-gray-700/50">
                  <h4 className="text-sm font-semibold mb-3">Schedule</h4>
                  <div className="grid grid-cols-7 gap-1 mt-2">
                    {Array.from({length: 28}).map((_, i) => (
                      <div key={i} className="aspect-square bg-gray-700/30 rounded-sm"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-32 border-t border-gray-800 pt-16">
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="space-y-4">
              <div className="flex justify-center md:justify-start gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-lg text-gray-300 leading-relaxed italic">
                "Simply put, we get more work done, quicker, and better. <span className="bg-[#3A2A46] text-[#D8B4FE] font-medium px-1 rounded">Productivity is up. Errors are down. Clients are happier.</span>"
              </p>
              <p className="text-sm text-gray-500">—Patrick Sheffield, Moore Communications Group</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-center md:justify-start gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-lg text-gray-300 leading-relaxed italic">
                "<span className="bg-[#3A2A46] text-[#D8B4FE] font-medium px-1 rounded">Information flows like water. A lot more transparency. Everyone is on the same page.</span> No more secrets and blindspots."
              </p>
              <p className="text-sm text-gray-500">—Aaron Bingaman, Penn State Office of Emergency Management</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-center md:justify-start gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-lg text-gray-300 leading-relaxed italic">
                "Since using Devora, our <span className="bg-[#3A2A46] text-[#D8B4FE] font-medium px-1 rounded">communication is drastically better and deadlines are met without drama.</span>"
              </p>
              <p className="text-sm text-gray-500">—Shannon Kropf, Full Sail University</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="secondary" className="bg-blue-500 hover:bg-blue-600 text-white border-0 font-semibold px-8 py-6 rounded-xl text-lg w-full md:w-auto md:min-w-[400px]">
              Check out over 1,000 more customer testimonials...
            </Button>
          </div>
        </div>

        {/* Footer Links & CTA */}
        <div className="mt-32 space-y-12 border-t border-gray-800 pt-16">
          <div className="flex flex-col md:flex-row justify-between items-center bg-[#1C2632] p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4 md:mb-0">Ready to get started?</h2>
            <Link href="/pricing" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg inline-flex items-center gap-2">
              <div className="bg-white p-1 rounded-full"><Star className="w-4 h-4 text-blue-500 fill-blue-500" /></div>
              Try Devora free
            </Link>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-blue-400">
            <span className="text-gray-400">And there's more...</span>
            <Link href="#" className="hover:underline">Devora 5 is here</Link> •
            <Link href="#" className="hover:underline">Features and benefits</Link> •
            <Link href="#" className="hover:underline">The people's path</Link> •
            <Link href="#" className="hover:underline">Reliable to the core</Link> •
            <Link href="#" className="hover:underline">Integrations</Link> •
            <Link href="/customers" className="hover:underline">86,985 people are working in Devora now</Link> •
            <Link href="#" className="hover:underline">Books we've written</Link> •
            <Link href="#" className="hover:underline">Where we came from</Link> •
            <Link href="#" className="hover:underline">How we communicate</Link>
          </div>
          
          <footer className="pt-8 border-t border-gray-800 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span>☁️ Devora is designed, built, and backed by Acme Corp.</span>
            </div>
            <div className="flex items-center gap-4 font-medium">
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div> Status</span>
              <Link href="/support" className="hover:text-gray-300">Support</Link>
              <Link href="#" className="hover:text-gray-300">Policies</Link>
              <Link href="#" className="hover:text-gray-300">Privacy</Link>
              <Link href="#" className="hover:text-gray-300">Security</Link>
              <Link href="/login" className="hover:text-gray-300 text-white">Sign in</Link>
              <span>© Acme Corp LLC</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
