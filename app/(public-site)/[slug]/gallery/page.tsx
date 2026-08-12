import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';

export default function PublicGalleryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const images = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
  ];

  return (
    <div className="min-h-screen bg-[#0A111E] text-white py-12 px-6 max-w-6xl mx-auto space-y-8">
      <Link href={`/${slug}`} className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Invitation
      </Link>

      <div className="text-center space-y-2">
        <h1 className="font-serif text-4xl font-bold text-white">Couple Photo Gallery</h1>
        <p className="text-xs text-slate-400">Pre-wedding memories & special moments</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((url, idx) => (
          <div key={idx} className="glass-card rounded-2xl overflow-hidden border border-slate-800">
            <img src={url} alt={`Gallery ${idx}`} className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
