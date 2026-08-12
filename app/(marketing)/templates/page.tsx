import Link from 'next/link';
import { Sparkles, Eye, Heart } from 'lucide-react';

export default function TemplatesPage() {
  const templates = [
    {
      id: 'royal',
      name: 'Royal Poruwa Gold',
      tag: 'Most Popular',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      description: 'Elegant Sri Lankan royal aesthetic with gold accents, Poruwa ceremony schedule, and traditional warm motif.',
    },
    {
      id: 'modern',
      name: 'Modern Emerald Minimal',
      tag: 'Trending',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
      description: 'Sleek dark mode glassmorphism with emerald greens, ideal for luxury hotel reception banquets.',
    },
    {
      id: 'classic',
      name: 'Classic Rose Gold Floral',
      tag: 'Romantic',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800',
      description: 'Soft rose gold tones with floral borders and timeless typography.',
    },
    {
      id: 'boho',
      name: 'Bohemian Garden Romance',
      tag: 'Outdoor',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
      description: 'Warm earthy hues and rustic botanical elements for beach or garden wedding receptions.',
    },
  ];

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">Template Gallery</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">Choose Your Invitation Style</h1>
        <p className="text-slate-300 text-sm">
          Every template is fully customizable with your photos, theme colors, auspicious times, and custom text.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {templates.map((tpl) => (
          <div key={tpl.id} className="glass-card rounded-3xl overflow-hidden border border-slate-800 group">
            <div className="relative h-64 overflow-hidden">
              <img
                src={tpl.image}
                alt={tpl.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-gold-400/30 text-gold-300 text-xs px-3 py-1 rounded-full font-semibold">
                {tpl.tag}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="font-serif text-2xl font-bold text-white">{tpl.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{tpl.description}</p>
              <div className="flex items-center justify-between pt-2">
                <Link
                  href="/vishmi-sanjana"
                  target="_blank"
                  className="text-xs font-bold text-gold-400 flex items-center gap-1 hover:underline"
                >
                  <Eye className="w-4 h-4" /> Live Interactive Preview
                </Link>
                <Link
                  href={`/signup?template=${tpl.id}`}
                  className="bg-gold-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl hover:bg-gold-300 transition-colors"
                >
                  Use This Template
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
