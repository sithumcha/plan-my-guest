import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#353023] font-sans flex flex-col justify-between selection:bg-[#F5E6E3] selection:text-[#5C332D]">
      <Navbar />

      <main className="flex-grow py-12 px-6 max-w-4xl mx-auto space-y-10">
        {/* Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#785655] hover:text-[#353023] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Wedding Planning Blog
          </Link>
        </div>

        {/* Category Pill */}
        <div className="text-center">
          <span className="inline-block bg-[#EAE3BC] text-[#574500] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
            Wedding Planning
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#353023] leading-[1.15]">
            Mastering the Art of the Elegant Guest List
          </h1>
          <p className="text-[#504444] text-base md:text-lg leading-relaxed font-normal">
            Discover the secrets to curating a harmonious wedding guest list without the stress. A guide to thoughtful invitations and managing expectations.
          </p>
        </div>

        {/* Author Bio Header */}
        <div className="flex items-center justify-center gap-3 py-2">
          <div className="w-10 h-10 rounded-full bg-[#F5E6E3] border border-[#D5A49B] text-[#785655] font-serif font-bold text-xs flex items-center justify-center">
            EV
          </div>
          <div className="text-left text-xs">
            <span className="font-bold text-[#353023] block">Eleanor Vance</span>
            <span className="text-[#827473]">Oct 12, 2024 • 5 min read</span>
          </div>
        </div>

        {/* Hero Feature Image */}
        <div className="rounded-3xl overflow-hidden border border-[#EBE2CE] shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200"
            alt="Elegant Wedding Table Setting"
            className="w-full h-[450px] object-cover"
          />
        </div>

        {/* Article Body Content */}
        <article className="space-y-8 text-sm text-[#504444] leading-relaxed max-w-3xl mx-auto pt-4">
          <p>
            The process of creating a wedding guest list is often described as one of the most challenging aspects of wedding planning. It is a delicate balancing act of honoring relationships, managing family expectations, and adhering to venue capacities and budgets. However, approaching this task with a strategy can transform it from a source of anxiety into a thoughtful curation of your closest community.
          </p>

          <h2 className="font-serif text-3xl font-bold text-[#353023] pt-4">The Tiered Approach</h2>

          <p>
            Begin by dividing your potential guests into tiers. The 'A-List' encompasses those whose presence is non-negotiable—immediate family and your closest friends. The 'B-List' includes extended family, colleagues, and friends you'd love to have if space permits. This system provides a clear framework when difficult decisions need to be made.
          </p>

          {/* Pull Quote Card */}
          <blockquote className="my-8 bg-[#F7EDD9] border-l-4 border-[#785655] p-8 rounded-r-3xl relative space-y-2">
            <span className="font-serif text-5xl font-bold text-[#E2D9C6] leading-none block">“</span>
            <p className="font-serif text-2xl font-bold italic text-[#785655] leading-snug">
              "Your guest list is the architectural blueprint of your wedding's atmosphere. Choose the people who bring out the best in you."
            </p>
          </blockquote>

          <h2 className="font-serif text-3xl font-bold text-[#353023] pt-4">Navigating Plus-Ones</h2>

          <p>
            The plus-one dilemma is eternal. A modern, elegant rule of thumb is to offer plus-ones to those who are married, engaged, cohabiting, or in long-term relationships. For single guests, consider whether they will know other attendees. If they are traveling far and know no one else, a plus-one is a gracious gesture.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
