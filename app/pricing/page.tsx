import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#101820] text-white selection:bg-blue-500/30 font-sans pb-24">
      {/* Top Bar */}
      <div className="w-full text-center py-3 text-sm text-gray-300 border-b border-gray-800">
        Want a walkthrough? Live Q&A session? <Link href="#" className="text-blue-400 hover:underline">Book a personal demo</Link> with our team.
      </div>
      
      {/* Navigation */}
      <nav className="px-6 py-6 md:px-12 max-w-7xl mx-auto flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-green-500 p-2 rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <span className="text-xl font-bold tracking-tight">Devora</span>
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-12">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Pick a package and try Devora for free.
            </h1>
            
            <p className="text-2xl font-bold text-gray-300 relative inline-block">
              <span className="absolute -inset-1 border-2 border-yellow-500/50 rounded-full rotate-2"></span>
              2,059
              <span className="font-normal text-gray-400 ml-2">organizations signed up last week.<br/>You're in good company.</span>
            </p>

            <div className="bg-[#1C2632] p-8 rounded-xl border border-gray-800 mt-12">
              <p className="italic text-gray-300 leading-relaxed mb-6">
                "Devora is beautiful software that has resisted every wrong trend and stayed true to the things that mattered most. Highly recommended."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tobi" alt="Tobi Lutke" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold">Tobi Lütke</p>
                  <p className="text-sm text-gray-400">Shopify Co-Founder & CEO</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing Cards */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Free Tier */}
            <div className="bg-[#1C2632] rounded-xl border border-gray-800 overflow-hidden relative pt-2">
              <div className="absolute top-0 left-0 right-0 h-2 bg-[#FDE047]"></div>
              <div className="text-center py-2 bg-[#FDE047]/10 text-[#FDE047] text-xs font-bold tracking-widest uppercase">
                Start with a free account
              </div>
              <div className="p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="text-lg text-gray-300">
                  <strong className="text-white">Run 1 project free forever.</strong> Includes 1 GB of storage and up to 20 users. If you ever need more you can upgrade later.
                </p>
                <Link href="/signup" className="flex-shrink-0 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap">
                  Sign up free
                </Link>
              </div>
            </div>

            {/* Pro Tiers */}
            <div className="bg-[#1C2632] rounded-xl border border-gray-800 overflow-hidden relative pt-2">
              <div className="absolute top-0 left-0 right-0 h-2 bg-[#FDE047]"></div>
              <div className="text-center py-2 bg-[#FDE047]/10 text-[#FDE047] text-xs font-bold tracking-widest uppercase">
                Or level up from the start with a pro package
              </div>
              
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-800">
                
                {/* Pro Unlimited */}
                <div className="p-8 flex flex-col">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">Pro Unlimited</h3>
                    <p className="text-gray-400">Top-of-the-line, all-inclusive pricing.<br/>Unlimited users, no per-user fees.</p>
                  </div>
                  
                  <div className="text-center mb-8">
                    <div className="text-gray-500 mb-2">---</div>
                    <p className="text-xl font-bold mb-1">$299/month, billed annually</p>
                    <p className="text-sm font-bold text-gray-300">Your whole organization for one fixed price.</p>
                    <p className="text-xs text-gray-400 mt-1">Unlimited users, plus every feature & upgrade.</p>
                  </div>

                  <Link href="/signup" className="w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-4 rounded-lg transition-colors mt-auto">
                    Try it free for 60 days
                  </Link>

                  <ul className="mt-8 space-y-3 text-sm text-gray-300">
                    <li className="flex gap-2"><Check className="w-5 h-5 text-green-500 shrink-0" /> Unlimited projects</li>
                    <li className="flex gap-2"><Check className="w-5 h-5 text-green-500 shrink-0" /> 5 terabytes storage space (10x Pro)</li>
                    <li className="flex gap-2"><Check className="w-5 h-5 text-green-500 shrink-0" /> Priority support</li>
                  </ul>
                </div>

                {/* Pro Standard */}
                <div className="p-8 flex flex-col">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">Pro</h3>
                    <p className="text-gray-400">A great choice for freelancers,<br/>startups, and smaller teams.</p>
                  </div>
                  
                  <div className="text-center mb-8">
                    <div className="text-gray-500 mb-2">---</div>
                    <p className="text-xl font-bold mb-1">$15/user, billed monthly</p>
                    <p className="text-sm font-bold text-gray-300">Invite guests and clients for free.</p>
                    <p className="text-xs text-gray-400 mt-1">We will only bill you for employees.</p>
                  </div>

                  <Link href="/signup" className="w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-4 rounded-lg transition-colors mt-auto">
                    Try it free for 30 days
                  </Link>

                  <ul className="mt-8 space-y-3 text-sm text-gray-300">
                    <li className="flex gap-2"><Check className="w-5 h-5 text-gray-500 shrink-0" /> Unlimited projects</li>
                    <li className="flex gap-2"><Check className="w-5 h-5 text-gray-500 shrink-0" /> 500 GB storage space</li>
                  </ul>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
