import Link from 'next/link';
import { Gift, ArrowLeft } from 'lucide-react';

export default function GiftsPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return (
    <div className="min-h-screen bg-[#0A111E] text-white flex flex-col justify-center py-12 px-6">
      <div className="max-w-md w-full mx-auto space-y-6">
        <Link href={`/${slug}`} className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Invitation
        </Link>

        <div className="glass-card p-8 rounded-3xl border border-gold-400/30 space-y-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gold-400/10 text-gold-400 flex items-center justify-center mx-auto">
            <Gift className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-white">Gift Registry & Bank Details</h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Your presence at our celebration is the greatest gift. If you wish to send a blessing or contribution:
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left space-y-3 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Account Name:</span>
              <span className="text-white font-bold">Sanjana & Vishmi Wedding Account</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Account No:</span>
              <span className="text-gold-300 font-bold">8001234567</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Bank Name:</span>
              <span className="text-white">Commercial Bank of Ceylon</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Branch:</span>
              <span className="text-white">World Trade Centre</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
