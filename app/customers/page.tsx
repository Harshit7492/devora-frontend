import Link from "next/link";

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-[#101820] text-white flex flex-col items-center justify-center font-sans px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-center">Our Customers</h1>
      <p className="text-xl text-gray-400 mb-8 text-center max-w-lg">
        This is a placeholder for the Devora customers page. Here you would find case studies and success stories.
      </p>
      <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
        Return Home
      </Link>
    </div>
  );
}
