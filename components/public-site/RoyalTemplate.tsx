'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Shirt, Map, Music, Volume2, VolumeX, Globe } from 'lucide-react';
import { IWedding } from '@/types';

const TRANSLATIONS = {
  en: {
    saveTheDate: 'Save The Date',
    areGettingMarried: 'Are getting married',
    ourStory: 'Our Story',
    scheduleOfEvents: 'Schedule of Events',
    joinUs: 'Join us for a celebration of love and joy.',
    theCelebration: 'The Celebration',
    when: 'When',
    where: 'Where',
    venueLocation: 'Venue Location',
    momentsGallery: 'Moments Gallery',
    registry: 'Gift Registry & Banking',
    account: 'Account',
    bank: 'Bank',
    accountNo: 'Account No',
    rsvp: 'RSVP',
    respondBy: 'Kindly respond by November 15, 2026',
    confirmRsvp: 'Confirm RSVP ♡',
    openMaps: 'Open Google Maps Directions →',
    days: 'Days',
    hours: 'Hours',
    mins: 'Mins',
  },
  si: {
    saveTheDate: 'දින වෙන්කර ගන්න',
    areGettingMarried: 'යුගදිවියට එළඹේ',
    ourStory: 'අපගේ කතාව',
    scheduleOfEvents: 'උත්සව සටහන',
    joinUs: 'සතුට හා ආදරය සැමරීමට අප හා එක්වන්න.',
    theCelebration: 'විවාහ මංගල්‍යය',
    when: 'දිනය හා වේලාව',
    where: 'ස්ථානය',
    venueLocation: 'මංගල ශාලාව',
    momentsGallery: 'මතකයන්',
    registry: 'තෑගි සහ බැංකු විස්තර',
    account: 'ගිණුම් නාමය',
    bank: 'බැංකුව',
    accountNo: 'ගිණුම් අංකය',
    rsvp: 'සම්බන්ධ වීම තහවුරු කරන්න (RSVP)',
    respondBy: '2026 නොවැම්බර් 15 දිනට පෙර තහවුරු කරන්න',
    confirmRsvp: 'RSVP තහවුරු කරන්න ♡',
    openMaps: 'Google Maps මගින් මාර්ගය බලන්න →',
    days: 'දින',
    hours: 'පැය',
    mins: 'මිනිත්තු',
  },
};

export default function RoyalTemplate({ wedding }: { wedding: IWedding & Record<string, any> }) {
  const [timeLeft, setTimeLeft] = useState({ days: 142, hours: 10, minutes: 45 });
  const [siteData, setSiteData] = useState<any>(wedding);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const syncLocal = () => {
      try {
        const stored = localStorage.getItem('pmg_builder_published_site');
        if (stored) {
          const parsed = JSON.parse(stored);
          setSiteData((prev: any) => ({ ...prev, ...parsed }));
        }
      } catch {}
    };

    syncLocal();
    window.addEventListener('storage', syncLocal);
    const interval = setInterval(syncLocal, 1000);
    return () => {
      window.removeEventListener('storage', syncLocal);
      clearInterval(interval);
    };
  }, []);

  const activeWedding = siteData || wedding;
  const langKey = activeWedding.language === 'si' ? 'si' : 'en';
  const t = TRANSLATIONS[langKey];
  const isBilingual = activeWedding.language === 'bilingual';

  const bgMusic = activeWedding.bgMusic || {
    enabled: true,
    trackUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
    trackName: 'Romantic Acoustic Piano',
  };

  useEffect(() => {
    const target = new Date(activeWedding.weddingDate || '2026-11-28').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [activeWedding.weddingDate]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
    }
  };

  const activePalette = activeWedding.activePalette || 'blush';
  const headingFont = activeWedding.headingFont || 'Playfair Display';
  const bodyFont = activeWedding.bodyFont || 'Inter';
  const coupleTitle = `${activeWedding.groomName || 'Kasun'} & ${activeWedding.brideName || 'Dilhani'}`;

  const formattedDate = new Date(activeWedding.weddingDate || '2026-11-28').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const blocks: string[] =
    activeWedding.blocks && activeWedding.blocks.length > 0
      ? activeWedding.blocks
      : ['cover', 'story', 'schedule', 'details', 'rsvp', 'location'];

  const scheduleList =
    activeWedding.scheduleItems ||
    activeWedding.schedule || [
      { title: 'Poruwa Ceremony & Traditional Lighting', time: '09:15 AM', description: 'Main Ballroom Stage' },
      { title: 'Champagne Toast & Cake Cutting', time: '11:30 AM', description: 'Grand Foyer' },
      { title: 'Buffet Banquet Lunch', time: '12:30 PM', description: 'Dining Hall' },
    ];

  const bankInfo = activeWedding.bankAccount || activeWedding.bankDetails || {
    accountName: `${coupleTitle} Wedding Account`,
    bankName: 'Commercial Bank of Ceylon',
    accountNumber: '8001234567',
  };

  const getThemeStyles = () => {
    switch (activePalette) {
      case 'emerald':
        return {
          bg: 'bg-[#F0F7F4]',
          cardBg: 'bg-white',
          textColor: 'text-[#0F382C]',
          subTextColor: 'text-[#205244]',
          accentBtn: 'bg-[#0F382C] text-white hover:bg-[#0B2A21]',
          pillBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        };
      case 'gold':
        return {
          bg: 'bg-[#FFFDF5]',
          cardBg: 'bg-white',
          textColor: 'text-[#3D300F]',
          subTextColor: 'text-[#6E5618]',
          accentBtn: 'bg-[#8C6D1F] text-white hover:bg-[#6E5618]',
          pillBg: 'bg-amber-100 text-amber-900 border-amber-200',
        };
      case 'dark':
        return {
          bg: 'bg-slate-950',
          cardBg: 'bg-slate-900 text-slate-100 border-slate-800',
          textColor: 'text-amber-300',
          subTextColor: 'text-slate-300',
          accentBtn: 'bg-amber-400 text-slate-950 font-bold hover:bg-amber-300',
          pillBg: 'bg-slate-800 text-amber-300 border-slate-700',
        };
      case 'blush':
      default:
        return {
          bg: 'bg-[#FAF6F0]',
          cardBg: 'bg-white',
          textColor: 'text-[#3A1E1A]',
          subTextColor: 'text-[#755D58]',
          accentBtn: 'bg-[#5C332D] text-white hover:bg-[#4A2823]',
          pillBg: 'bg-[#F5E6E3] text-[#5C332D] border-[#D5A49B]',
        };
    }
  };

  const theme = getThemeStyles();
  const showCountdown = activeWedding.showCountdown !== false;
  const enable3DAnimation = activeWedding.enable3DAnimation !== false;

  // Interactive Click Heart Burst System
  const [burstHearts, setBurstHearts] = useState<Array<{ id: number; x: number; y: number; icon: string }>>([]);

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enable3DAnimation) return;
    const icons = ['❤️', '💖', '💕', '✨', '🌸', '🌹'];
    const newHearts = Array.from({ length: 6 }).map((_, i) => ({
      id: Math.random(),
      x: e.clientX + (Math.random() * 60 - 30),
      y: e.clientY + (Math.random() * 60 - 30),
      icon: icons[Math.floor(Math.random() * icons.length)],
    }));
    setBurstHearts((prev) => [...prev.slice(-24), ...newHearts]);
  };

  return (
    <div
      onClick={handlePageClick}
      className={`min-h-screen ${theme.bg} ${theme.textColor} transition-colors pb-24 relative overflow-hidden select-none`}
      style={{ fontFamily: bodyFont }}
    >
      {/* 3D Floating Hearts & Sparkles Ambient Animation Canvas */}
      {enable3DAnimation && (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
          {[
            { icon: '❤️', left: '8%', delay: '0s', duration: '9s', size: '1.6rem' },
            { icon: '💖', left: '22%', delay: '2s', duration: '11s', size: '1.9rem' },
            { icon: '✨', left: '38%', delay: '1s', duration: '8s', size: '1.3rem' },
            { icon: '💕', left: '52%', delay: '3.5s', duration: '12s', size: '1.7rem' },
            { icon: '🌸', left: '68%', delay: '0.5s', duration: '10s', size: '1.5rem' },
            { icon: '🌹', left: '82%', delay: '2.5s', duration: '9.5s', size: '1.8rem' },
            { icon: '✨', left: '15%', delay: '4s', duration: '10.5s', size: '1.4rem' },
            { icon: '💖', left: '75%', delay: '5s', duration: '11.5s', size: '2rem' },
          ].map((p, idx) => (
            <div
              key={idx}
              className="absolute bottom-[-50px] animate-[floatUp3D_linear_infinite] drop-shadow-[0_4px_12px_rgba(255,100,150,0.5)] opacity-80"
              style={{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
                fontSize: p.size,
              }}
            >
              {p.icon}
            </div>
          ))}

          {/* Burst Hearts on Click */}
          {burstHearts.map((h) => (
            <div
              key={h.id}
              className="absolute animate-[burstUp3D_1.5s_ease-out_forwards] pointer-events-none text-xl filter drop-shadow-md"
              style={{ left: h.x, top: h.y }}
            >
              {h.icon}
            </div>
          ))}
        </div>
      )}

      {/* Embedded 3D Keyframe Animations */}
      <style jsx global>{`
        @keyframes floatUp3D {
          0% {
            transform: translateY(0) rotateX(0deg) rotateY(0deg) scale(0.8);
            opacity: 0;
          }
          20% {
            opacity: 0.85;
          }
          50% {
            transform: translateY(-50vh) rotateX(20deg) rotateY(40deg) scale(1.1);
          }
          80% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(-110vh) rotateX(-20deg) rotateY(90deg) scale(0.9);
            opacity: 0;
          }
        }

        @keyframes burstUp3D {
          0% {
            transform: translate(0, 0) scale(0.5) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(calc(Math.random() * 40px - 20px), -80px) scale(1.4) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Hidden Audio Element for Background Music */}
      {bgMusic.enabled && (
        <audio ref={audioRef} src={bgMusic.trackUrl} loop preload="auto" />
      )}

      {/* Floating Audio Music Controller Button */}
      {bgMusic.enabled && (
        <button
          onClick={toggleAudio}
          className={`fixed bottom-6 right-6 z-50 p-3.5 rounded-full shadow-2xl backdrop-blur-md border border-white/40 transition-all transform hover:scale-105 flex items-center gap-2 ${
            isPlayingMusic ? 'bg-emerald-600 text-white animate-pulse' : 'bg-black/75 text-white'
          }`}
          title={isPlayingMusic ? 'Mute Background Music' : 'Play Romantic Music'}
        >
          {isPlayingMusic ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          <span className="text-[10px] font-bold tracking-wider uppercase pr-1 hidden sm:inline">
            {isPlayingMusic ? 'Playing' : 'Music'}
          </span>
        </button>
      )}

      {/* Render blocks in exact saved sequence */}
      {blocks.map((blockKey) => {
        return (
          <div key={blockKey}>
            {/* BLOCK: COVER */}
            {blockKey === 'cover' && (
              <section className="relative min-h-[90vh] flex flex-col justify-end items-center px-4 pb-12 overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img
                    key={activeWedding.coverImage || activeWedding.coverPhoto || 'default-cover'}
                    src={activeWedding.coverImage || activeWedding.coverPhoto || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200'}
                    alt={coupleTitle}
                    className="w-full h-full object-cover object-center transition-all duration-500"
                    style={{ imageRendering: 'auto' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                </div>

                <div className="relative z-10 w-full max-w-lg text-center text-white space-y-3 px-6 py-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                  <p className="text-sm italic tracking-wide font-serif text-amber-100 drop-shadow-md">
                    Together with their families
                  </p>

                  <div className="py-2 space-y-1">
                    <h1
                      className="text-6xl md:text-7xl font-normal tracking-wide text-amber-100 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
                      style={{ fontFamily: headingFont || 'Great Vibes, cursive' }}
                    >
                      {activeWedding.groomName || 'Vishmi'}
                    </h1>
                    <span
                      className="text-4xl italic block text-amber-200 drop-shadow-md"
                      style={{ fontFamily: headingFont || 'Great Vibes, cursive' }}
                    >
                      &
                    </span>
                    <h1
                      className="text-6xl md:text-7xl font-normal tracking-wide text-amber-100 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
                      style={{ fontFamily: headingFont || 'Great Vibes, cursive' }}
                    >
                      {activeWedding.brideName || 'Sanjana'}
                    </h1>
                  </div>

                  <p className="text-xs italic tracking-widest font-serif text-amber-50 drop-shadow-md">
                    {t.areGettingMarried} {isBilingual && '/ යුගදිවියට එළඹේ'}
                  </p>

                  <div className="pt-3 border-t border-white/30 max-w-[280px] mx-auto space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-white/90 font-bold block drop-shadow-sm">
                      JOIN US ON
                    </span>
                    <p className="text-2xl font-serif italic text-amber-100 tracking-wider drop-shadow-md">
                      {formattedDate}
                    </p>
                    <p className="text-xs font-serif text-white/95 pt-0.5 drop-shadow-sm">
                      {activeWedding.venue}
                    </p>
                  </div>

                  {/* Animated Live Countdown Timer Glass Box */}
                  {showCountdown && (
                    <div className="pt-3 border-t border-white/30 mt-3">
                      <span className="text-[10px] uppercase tracking-widest text-white/90 font-bold block mb-1.5 drop-shadow-sm">
                        Countdown to Our Day
                      </span>
                      <div className="flex items-center justify-center gap-5 bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-lg inline-flex mx-auto">
                        <div>
                          <span className="font-mono text-2xl font-bold text-white block drop-shadow-sm">{timeLeft.days}</span>
                          <span className="text-[9px] uppercase tracking-widest text-white/90 font-bold">{t.days}</span>
                        </div>
                        <div className="text-white/60 font-serif text-lg">•</div>
                        <div>
                          <span className="font-mono text-2xl font-bold text-white block drop-shadow-sm">{timeLeft.hours}</span>
                          <span className="text-[9px] uppercase tracking-widest text-white/90 font-bold">{t.hours}</span>
                        </div>
                        <div className="text-white/60 font-serif text-lg">•</div>
                        <div>
                          <span className="font-mono text-2xl font-bold text-white block drop-shadow-sm">{timeLeft.minutes}</span>
                          <span className="text-[9px] uppercase tracking-widest text-white/90 font-bold">{t.mins}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* BLOCK: TITLE */}
            {blockKey === 'title' && (
              <section className="py-12 px-6 max-w-lg mx-auto text-center space-y-3">
                <h1 className="text-4xl font-bold" style={{ fontFamily: headingFont }}>
                  {coupleTitle}
                </h1>
                <p className={`text-sm ${theme.subTextColor} font-semibold`}>{formattedDate} • {activeWedding.venue}</p>
              </section>
            )}

            {/* BLOCK: STORY */}
            {blockKey === 'story' && (
              <section className="py-12 px-6 max-w-lg mx-auto text-center space-y-6">
                <h2 className="text-3xl font-bold" style={{ fontFamily: headingFont }}>
                  {t.ourStory} {isBilingual && '/ අපගේ කතාව'}
                </h2>
                <p className={`text-xs md:text-sm ${theme.subTextColor} leading-relaxed font-normal`}>
                  {activeWedding.story ||
                    'It started with a chance meeting in a small coffee shop. Countless adventures later, we are excited to celebrate this next chapter of our lives with all of our favorite people.'}
                </p>

                <div className="rounded-3xl overflow-hidden border border-black/10 shadow-md my-4">
                  <img
                    src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800"
                    alt="Our Story Moment"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </section>
            )}

            {/* BLOCK: SCHEDULE */}
            {blockKey === 'schedule' && (
              <section className="py-12 px-6 max-w-lg mx-auto space-y-6">
                <div className="text-center space-y-1">
                  <h2 className="text-3xl font-bold" style={{ fontFamily: headingFont }}>
                    {t.scheduleOfEvents}
                  </h2>
                  <p className={`text-xs ${theme.subTextColor}`}>{t.joinUs}</p>
                </div>

                <div className="space-y-3">
                  {scheduleList.map((item: any, idx: number) => (
                    <div key={idx} className={`${theme.cardBg} border border-black/10 rounded-2xl p-4 flex items-center justify-between shadow-sm`}>
                      <div>
                        <div className="font-bold text-sm">{item.title}</div>
                        <div className={`text-xs ${theme.subTextColor} mt-0.5`}>{item.description}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold ${theme.pillBg}`}>
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* BLOCK: DETAILS & CELEBRATION */}
            {blockKey === 'details' && (
              <section className="py-12 px-6 max-w-lg mx-auto space-y-6">
                <div className="text-center space-y-1">
                  <h2 className="text-3xl font-bold" style={{ fontFamily: headingFont }}>
                    {t.theCelebration}
                  </h2>
                </div>

                <div className={`${theme.cardBg} border border-black/10 rounded-3xl p-6 space-y-6 shadow-sm text-xs`}>
                  <div className="flex items-start gap-3.5">
                    <div className={`p-2.5 rounded-xl ${theme.pillBg}`}>
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold block">{t.when}</span>
                      <p className="font-semibold text-sm mt-0.5">{formattedDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 pt-4 border-t border-black/10">
                    <div className={`p-2.5 rounded-xl ${theme.pillBg}`}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold block">{t.where}</span>
                      <p className="font-semibold text-sm mt-0.5">{activeWedding.venue}</p>
                      <p className={`text-[11px] ${theme.subTextColor} mt-0.5`}>
                        {activeWedding.venueAddress || 'Shangri-La Hotel Grand Ballroom, Colombo 02, Sri Lanka'}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* BLOCK: LOCATION */}
            {blockKey === 'location' && (
              <section className="py-8 px-6 max-w-lg mx-auto text-center space-y-3">
                <h2 className="text-3xl font-bold" style={{ fontFamily: headingFont }}>
                  {t.venueLocation}
                </h2>
                <div className={`${theme.cardBg} border border-black/10 rounded-3xl p-4 text-center space-y-2 shadow-sm`}>
                  <MapPin className="w-6 h-6 mx-auto text-[#785655]" />
                  <div className="font-bold text-sm">{activeWedding.venue}</div>
                  <div className={`text-xs ${theme.subTextColor}`}>{activeWedding.venueAddress || 'Colombo 02, Sri Lanka'}</div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(activeWedding.venue || 'Colombo')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-xs font-bold hover:underline pt-2"
                  >
                    {t.openMaps}
                  </a>
                </div>
              </section>
            )}

            {/* BLOCK: GALLERY */}
            {blockKey === 'gallery' && (
              <section className="py-12 px-6 max-w-lg mx-auto space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold" style={{ fontFamily: headingFont }}>
                    {t.momentsGallery}
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="rounded-3xl overflow-hidden border border-black/10 shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800"
                      alt="Moments Vertical"
                      className="w-full h-80 object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl overflow-hidden border border-black/10 shadow-sm h-40">
                      <img
                        src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800"
                        alt="Ring close-up"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-black/10 shadow-sm h-40">
                      <img
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"
                        alt="Sunset hills"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* BLOCK: REGISTRY */}
            {blockKey === 'registry' && (
              <section className="py-8 px-6 max-w-lg mx-auto text-center space-y-3">
                <h2 className="text-3xl font-bold" style={{ fontFamily: headingFont }}>
                  {t.registry}
                </h2>
                <div className={`${theme.cardBg} border border-black/10 rounded-3xl p-5 text-xs text-left font-mono space-y-1 shadow-sm`}>
                  <div className="font-bold">{t.account}: {bankInfo.accountName || `${coupleTitle} Wedding`}</div>
                  <div>{t.bank}: {bankInfo.bankName || 'Commercial Bank of Ceylon'}</div>
                  <div>{t.accountNo}: {bankInfo.accountNumber || '8001234567'}</div>
                </div>
              </section>
            )}

            {/* BLOCK: RSVP */}
            {blockKey === 'rsvp' && (
              <section className="py-12 px-6 max-w-lg mx-auto text-center space-y-4">
                <h2 className="text-3xl font-bold" style={{ fontFamily: headingFont }}>
                  {t.rsvp}
                </h2>
                <p className={`text-xs ${theme.subTextColor}`}>{t.respondBy}</p>
                <Link
                  href={`/${activeWedding.slug || 'kasun-dilhani'}/rsvp`}
                  className="group inline-flex items-center justify-center gap-2.5 w-full max-w-sm py-4 px-8 rounded-full font-bold text-sm bg-gradient-to-r from-[#5C332D] via-[#785655] to-[#4A2823] text-amber-100 border border-amber-200/40 shadow-[0_10px_30px_rgba(92,51,45,0.5)] transition-all transform hover:scale-[1.03] active:scale-95 ring-2 ring-amber-400/20"
                >
                  <span className="text-rose-300 text-base animate-pulse">♡</span>
                  <span className="tracking-wider uppercase text-xs font-serif font-bold text-amber-100 drop-shadow-sm">{t.confirmRsvp}</span>
                  <span className="text-amber-200 text-xs transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </section>
            )}
          </div>
        );
      })}

      {/* Sticky Fixed Bottom Luxury RSVP Bar (Always visible at bottom) */}
      <div className="fixed bottom-5 inset-x-4 max-w-xs sm:max-w-sm mx-auto z-40">
        <Link
          href={`/${activeWedding.slug || 'kasun-dilhani'}/rsvp`}
          className="group relative w-full bg-gradient-to-r from-[#5C332D] via-[#785655] to-[#4A2823] hover:from-[#4A2823] hover:to-[#5C332D] text-amber-100 font-bold text-sm py-4 px-6 rounded-full shadow-[0_10px_35px_rgba(92,51,45,0.6)] backdrop-blur-xl border border-amber-200/40 flex items-center justify-center gap-2.5 transition-all duration-300 transform hover:scale-[1.04] active:scale-95 ring-2 ring-amber-400/20 overflow-hidden"
        >
          {/* Subtle Ambient Shimmer Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          
          <span className="text-rose-300 text-base animate-pulse">♡</span>
          <span className="tracking-wider uppercase text-xs font-serif font-bold text-amber-100 drop-shadow-sm">
            {t.confirmRsvp}
          </span>
          <span className="text-amber-200 text-xs transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* Footer Details */}
      <footer className="py-12 px-6 text-center space-y-4 max-w-lg mx-auto border-t border-black/10 mt-12 pb-24">
        <h3 className="text-2xl font-bold" style={{ fontFamily: headingFont }}>
          {coupleTitle}
        </h3>
        <p className="text-[10px] opacity-70">© 2026 Plan My Guest. All rights reserved.</p>
      </footer>
    </div>
  );
}
