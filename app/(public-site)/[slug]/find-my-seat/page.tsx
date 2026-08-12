'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Grid, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function FindMySeatPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<{ name: string; table: string; seatNo: number } | null>(null);

  const mockGuestSeating: Record<string, { table: string; seatNo: number }> = {
    nimal: { table: 'Table 1 - VIP Royal Poruwa', seatNo: 3 },
    kavindi: { table: 'Table 2 - Family & Relatives', seatNo: 5 },
    sunil: { table: 'Table 2 - Family & Relatives', seatNo: 6 },
    ruwan: { table: 'Table 1 - VIP Royal Poruwa', seatNo: 4 },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);

    const clean = query.toLowerCase().trim();
    let foundKey = Object.keys(mockGuestSeating).find((k) => clean.includes(k));

    if (foundKey) {
      setResult({
        name: query,
        table: mockGuestSeating[foundKey].table,
        seatNo: mockGuestSeating[foundKey].seatNo,
      });
    } else {
      // Default seat for demo if name entered
      if (query.length > 2) {
        setResult({
          name: query,
          table: 'Table 3 - Friends & Guests',
          seatNo: 2,
        });
      } else {
        setResult(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A111E] text-white flex flex-col justify-center py-12 px-6">
      <div className="max-w-md w-full mx-auto space-y-6">
        <Link href={`/${slug}`} className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Invitation
        </Link>

        <div className="glass-card p-8 rounded-3xl border border-gold-400/30 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gold-400/10 text-gold-400 flex items-center justify-center mx-auto">
              <Grid className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-white">Find My Seat</h1>
            <p className="text-xs text-slate-400">Enter your name to lookup your assigned reception table</p>
          </div>

          <form onSubmit={handleSearch} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Your Name</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Nimal or Ruwan"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-3 focus:border-gold-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-gold-400 to-rose-400 text-slate-950 font-bold rounded-xl text-sm"
            >
              Lookup My Table
            </button>
          </form>

          {searched && (
            <div className="pt-4 border-t border-slate-800">
              {result ? (
                <div className="bg-slate-900 border border-gold-400/40 p-6 rounded-2xl text-center space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">Assigned Seating</span>
                  <h3 className="font-serif text-2xl font-bold text-white">{result.table}</h3>
                  <div className="inline-block px-3 py-1 bg-gold-400/20 text-gold-300 font-mono text-xs rounded-full font-bold">
                    Seat Position #{result.seatNo}
                  </div>
                </div>
              ) : (
                <p className="text-center text-xs text-slate-400 py-4">No seating assignment found for "{query}".</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
