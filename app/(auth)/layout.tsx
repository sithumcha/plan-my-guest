import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#3A1E1A] flex flex-col justify-center py-12 px-6 relative overflow-hidden">
      {/* Background Soft Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F5E6E3] blur-[140px] rounded-full pointer-events-none" />

      {/* Brand Header */}
      <div className="text-center mb-8 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-[#5C332D] flex items-center justify-center text-white font-bold shadow-md">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <span className="font-serif text-3xl font-bold tracking-tight text-[#3A1E1A] group-hover:text-[#5C332D]">
            PlanMyGuest<span className="text-[#8B483E]">.lk</span>
          </span>
        </Link>
      </div>

      <div className="max-w-md w-full mx-auto relative z-10">{children}</div>
    </div>
  );
}
