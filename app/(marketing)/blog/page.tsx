import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { ArrowRight, Clock, Calendar, User } from 'lucide-react';

const articles = [
  {
    slug: 'mastering-guest-list',
    title: 'Mastering the Art of the Elegant Guest List',
    excerpt: 'Discover the secrets to curating a harmonious wedding guest list without the stress. A guide to thoughtful invitations and managing expectations.',
    category: 'Wedding Planning',
    date: 'Oct 12, 2024',
    readTime: '5 min read',
    author: 'Eleanor Vance',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
  },
  {
    slug: 'sri-lankan-poruwa-guide',
    title: 'Complete Guide to Sri Lankan Poruwa Auspicious Nakath Times',
    excerpt: 'Everything couples need to know about setting Nakath times, Jayamangala Gatha singers, and traditional Poruwa rituals for modern weddings.',
    category: 'Traditions & Rituals',
    date: 'Aug 10, 2026',
    readTime: '6 min read',
    author: 'Dr. Ruwan Perera',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
  },
  {
    slug: 'whatsapp-invitations-guide',
    title: 'Why Digital WhatsApp Invites are Revolutionizing Weddings',
    excerpt: 'How Sri Lankan and global couples are saving up to 80% on printing while instantly tracking guest RSVPs directly via WhatsApp links.',
    category: 'Digital Suite',
    date: 'Aug 02, 2026',
    readTime: '4 min read',
    author: 'Thilini De Silva',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
  },
];

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#353023] font-sans flex flex-col justify-between selection:bg-[#F5E6E3] selection:text-[#5C332D]">
      <Navbar />

      <main className="flex-grow py-16 px-6 max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#785655] font-bold">Wedding Planning Blog</span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#353023]">Tips & Guides for Modern Couples</h1>
          <p className="text-[#504444] text-base leading-relaxed">
            Expert advice on wedding organization, digital invitation etiquette, seating arrangements, and traditional Sri Lankan rituals.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="bg-white border border-[#EBE2CE] rounded-3xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(247,202,201,0.4)] flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="space-y-4">
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-[#EAE3BC] text-[#574500] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-[#827473]">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="font-serif text-2xl font-bold text-[#353023] leading-snug hover:text-[#785655] transition-colors">
                    <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                  </h2>

                  <p className="text-xs text-[#504444] leading-relaxed">{article.excerpt}</p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#785655] hover:text-[#5E3F3E] transition-colors"
                >
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
