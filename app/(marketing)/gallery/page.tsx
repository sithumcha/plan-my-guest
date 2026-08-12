'use client';

import { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { ZoomIn, X, Download, Heart } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Ceremony' | 'Reception' | 'Getting Ready';
  src: string;
}

const samplePhotos: GalleryItem[] = [
  {
    id: 'img1',
    title: 'Bride & Groom Laughter',
    category: 'Reception',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'img2',
    title: 'Ceremony Floral Arch',
    category: 'Ceremony',
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'img3',
    title: 'Wedding Rings Details',
    category: 'Getting Ready',
    src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'img4',
    title: 'Golden Hour Sunset Portrait',
    category: 'Ceremony',
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'img5',
    title: 'Champagne Toast & Cake',
    category: 'Reception',
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'img6',
    title: 'Morning Preparations',
    category: 'Getting Ready',
    src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800',
  },
];

export default function MarketingGalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const filteredPhotos = samplePhotos.filter(
    (photo) => activeCategory === 'All' || photo.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#353023] font-sans flex flex-col justify-between selection:bg-[#F7CAC9] selection:text-[#755353]">
      <Navbar />

      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-16 space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#785655] font-bold">Public Photo Gallery</span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#785655]">Our Wedding Day</h1>
          <p className="text-base text-[#504444] leading-relaxed">
            A collection of our favorite moments from the celebration. Feel free to download and share.
          </p>
        </div>

        {/* Filter Category Tags */}
        <div className="flex flex-wrap justify-center gap-2">
          {['All', 'Ceremony', 'Reception', 'Getting Ready'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === category
                  ? 'bg-[#F7CAC9] text-[#755353] border border-[#F7CAC9] font-bold shadow-sm'
                  : 'bg-white text-[#504444] border border-[#D4C3C2] hover:bg-[#F7EDD9]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActiveLightbox(photo)}
              className="relative group cursor-pointer overflow-hidden rounded-2xl border border-[#EBE2CE] bg-[#F7EDD9] shadow-[0_10px_40px_-10px_rgba(247,202,201,0.3)] transition-all duration-300 hover:shadow-lg"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white shadow-md">
                  <ZoomIn className="w-7 h-7 drop-shadow-md" />
                </span>
              </div>
              <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
                {photo.category}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setActiveLightbox(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full bg-[#FFF8F0] rounded-3xl border border-[#EBE2CE] overflow-hidden shadow-2xl space-y-4">
            <div className="relative max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeLightbox.src}
                alt={activeLightbox.title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            <div className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#353023]">{activeLightbox.title}</h3>
                <span className="text-xs text-[#785655] font-bold uppercase tracking-wider mt-1 block">
                  Category: {activeLightbox.category}
                </span>
              </div>
              <a
                href={activeLightbox.src}
                download={activeLightbox.title}
                target="_blank"
                rel="noreferrer"
                className="bg-[#785655] hover:bg-[#5E3F3E] text-white text-xs font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" /> Download High-Res
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
