import Link from 'next/link';
import { Heart, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gold-400/20 text-gold-400 flex items-center justify-center mb-6">
        <Heart className="w-8 h-8 fill-gold-400" />
      </div>
      <h1 className="font-serif text-5xl font-bold text-white mb-2">404 - Invitation Page Not Found</h1>
      <p className="text-slate-400 text-base max-w-md mb-8">
        The wedding invitation page or link you are trying to visit might have expired or moved to a new slug.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-400 to-rose-400 text-slate-950 font-bold px-6 py-3 rounded-xl"
      >
        <Home className="w-4 h-4" /> Return to PlanMyGuest Home
      </Link>
    </div>
  );
}
