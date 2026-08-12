'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Edit3,
  Undo,
  Redo,
  Monitor,
  Smartphone,
  Bell,
  X,
  Image as ImageIcon,
  Type,
  AlignLeft,
  Calendar,
  MapPin,
  Grid,
  UserCheck,
  Gift,
  ArrowUp,
  ArrowDown,
  Check,
  Eye,
  Plus,
  Trash2,
  Settings,
  SlidersHorizontal,
  Save,
  Upload,
  Camera,
  Music,
  Volume2,
  QrCode,
  Share2,
  MessageSquare,
  Globe,
  Clock,
  Copy,
  Download,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

type PaletteType = 'blush' | 'emerald' | 'gold' | 'dark';

const PRESET_COVERS = [
  { name: 'Romantic Couple', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200' },
  { name: 'Beach Sunset', url: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&q=80&w=1200' },
  { name: 'Floral Arch', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200' },
  { name: 'Luxury Ballroom', url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200' },
  { name: 'Poruwa Ceremony', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200' },
];

const MUSIC_TRACKS = [
  {
    name: 'Romantic Acoustic Piano',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
  },
  {
    name: 'Classical Wedding Strings',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8828551.mp3?filename=wedding-march-10255.mp3',
  },
  {
    name: 'Sunset Flute & Acoustic',
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=acoustic-guitars-11800.mp3',
  },
  {
    name: 'Inspiring Love Instrumental',
    url: 'https://cdn.pixabay.com/download/audio/2022/02/07/audio_4d989f660d.mp3?filename=wedding-inspiring-love-14285.mp3',
  },
];

export default function WebsiteBuilderPage() {
  const { user, wedding, updateProfile } = useAuth();
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [activePalette, setActivePalette] = useState<PaletteType>('blush');
  const [headingFont, setHeadingFont] = useState('Great Vibes');
  const [bodyFont, setBodyFont] = useState('Inter');
  const [paddingSize, setPaddingSize] = useState<'S' | 'M' | 'L'>('M');
  const [showTimelines, setShowTimelines] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [activeRightTab, setActiveRightTab] = useState<'content' | 'style'>('content');
  const [selectedBlockId, setSelectedBlockId] = useState<string>('cover');
  const [mobileTab, setMobileTab] = useState<'canvas' | 'blocks' | 'editor'>('canvas');

  const [publishStatus, setPublishStatus] = useState('');
  const [saving, setSaving] = useState(false);

  const [showCountdown, setShowCountdown] = useState(true);
  const [enable3DAnimation, setEnable3DAnimation] = useState(true);
  const [language, setLanguage] = useState<'en' | 'si' | 'bilingual'>('en');
  const [bgMusic, setBgMusic] = useState({
    enabled: true,
    trackUrl: MUSIC_TRACKS[0].url,
    trackName: MUSIC_TRACKS[0].name,
  });
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isWhatsAppPreviewOpen, setIsWhatsAppPreviewOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Live Countdown Timer Calculation State
  const [timeLeft, setTimeLeft] = useState({ days: 108, hours: 12, minutes: 30 });

  // Editable Wedding & Block Content State
  const [groomName, setGroomName] = useState('Kasun');
  const [brideName, setBrideName] = useState('Dilhani');
  const [isEditingCoupleNames, setIsEditingCoupleNames] = useState(false);
  const [weddingDateStr, setWeddingDateStr] = useState('2026-11-28');

  // Live Timer Effect
  useEffect(() => {
    const updateCountdown = () => {
      const target = new Date(weddingDateStr || '2026-11-28').getTime();
      const now = new Date().getTime();
      const difference = target - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [weddingDateStr]);
  const [venue, setVenue] = useState('Shangri-La Colombo');
  const [venueAddress, setVenueAddress] = useState('1 Galle Face, Colombo 02, Sri Lanka');

  // Lazy-load initial cover photo from local cache or default
  const [coverPhoto, setCoverPhoto] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('pmg_builder_cover_photo');
        if (cached && cached.length > 50) return cached;
        const published = localStorage.getItem('pmg_builder_published_site');
        if (published) {
          const parsed = JSON.parse(published);
          if (parsed.coverImage && parsed.coverImage.length > 50) return parsed.coverImage;
        }
      } catch {}
    }
    return 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200';
  });

  const [story, setStory] = useState(
    "It started with a chance meeting in Colombo. Countless adventures and one beautiful sunset proposal later, we can't wait to celebrate our love with all of our favorite people."
  );

  // Schedule list state
  const [scheduleItems, setScheduleItems] = useState([
    { title: 'Poruwa Ceremony & Traditional Lighting', time: '09:15 AM', description: 'Main Ballroom Stage' },
    { title: 'Champagne Toast & Cake Cutting', time: '11:30 AM', description: 'Grand Foyer' },
    { title: 'Buffet Banquet Lunch', time: '12:30 PM', description: 'Dining Hall' },
  ]);

  // Bank & RSVP State
  const [rsvpDeadline, setRsvpDeadline] = useState('November 15, 2026');
  const [bankAccount, setBankAccount] = useState({
    accountName: 'Kasun & Dilhani Wedding',
    bankName: 'Commercial Bank of Ceylon',
    accountNumber: '8001234567',
  });

  // Dynamic list of active canvas blocks
  const [blocks, setBlocks] = useState<string[]>([
    'cover',
    'story',
    'schedule',
    'details',
    'rsvp',
    'location',
  ]);

  // Sync state from AuthContext when user/wedding loads
  useEffect(() => {
    if (wedding) {
      if (wedding.groomName) setGroomName(wedding.groomName);
      if (wedding.brideName) setBrideName(wedding.brideName);
      if (wedding.venue) setVenue(wedding.venue);
      if (wedding.story) setStory(wedding.story);
      if (wedding.coverImage && wedding.coverImage.length > 20) {
        setCoverPhoto(wedding.coverImage);
        try {
          localStorage.setItem('pmg_builder_cover_photo', wedding.coverImage);
        } catch {}
      }
      if (wedding.weddingDate) {
        const d = new Date(wedding.weddingDate);
        if (!isNaN(d.getTime())) setWeddingDateStr(d.toISOString().split('T')[0]);
      }
    } else if (user?.name) {
      const parts = user.name.split('&').map((s) => s.trim());
      if (parts.length > 1) {
        setGroomName(parts[0]);
        setBrideName(parts[1]);
      } else {
        setGroomName(user.name);
      }
    }
  }, [wedding, user]);

  // High-Quality HD Image Processor with canvas smoothing to preserve 4K crisp detail
  const compressImage = (base64Str: string, maxWidth = 2048, maxHeight = 2048, quality = 0.94): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } else {
          resolve(base64Str);
        }
      };
      img.onerror = () => resolve(base64Str);
    });
  };

  const handleCoverPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      showToast('Processing Ultra HD Cover Photo...');
      const reader = new FileReader();
      reader.onload = async (event) => {
        const rawBase64 = event.target?.result as string;
        if (rawBase64) {
          const compressed = await compressImage(rawBase64, 2048, 2048, 0.94);
          setCoverPhoto(compressed);
          try {
            localStorage.setItem('pmg_builder_cover_photo', compressed);
          } catch (err) {
            console.warn('Storage warning:', err);
          }
          await updateProfile({ coverImage: compressed });
          showToast('HD Cover Photo saved permanently to DB & Studio!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // History stack for Undo/Redo
  const [history, setHistory] = useState<string[][]>([['cover', 'story', 'schedule', 'details', 'rsvp', 'location']]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const pushHistory = (newBlocks: string[]) => {
    const updated = history.slice(0, historyIndex + 1);
    updated.push(newBlocks);
    setHistory(updated);
    setHistoryIndex(updated.length - 1);
    setBlocks(newBlocks);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setBlocks(history[historyIndex - 1]);
      showToast('Undone last action');
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setBlocks(history[historyIndex + 1]);
      showToast('Redone action');
    }
  };

  const showToast = (msg: string) => {
    setPublishStatus(msg);
    setTimeout(() => setPublishStatus(''), 3500);
  };

  const coupleTitle = `${groomName} & ${brideName}`;
  const formattedDate = new Date(weddingDateStr || '2026-11-28').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).toUpperCase();

  // Toggle Block (Add / Remove) from left sidebar
  const toggleBlock = (blockId: string, label: string) => {
    if (blocks.includes(blockId)) {
      const updated = blocks.filter((b) => b !== blockId);
      pushHistory(updated);
      showToast(`Removed "${label}" block from canvas`);
    } else {
      let updated: string[];
      // Cover or Title hero block always sits at the very top of the page
      if (blockId === 'cover' || blockId === 'title') {
        updated = [blockId, ...blocks.filter((b) => b !== 'cover' && b !== 'title')];
      } else {
        updated = [...blocks, blockId];
      }
      pushHistory(updated);
      setSelectedBlockId(blockId);
      setActiveRightTab('content');
      setRightPanelOpen(true);
      showToast(`Added "${label}" block to the top of canvas!`);
    }
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;
    const updated = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    pushHistory(updated);
  };

  const handleSaveCoupleNames = async () => {
    setIsEditingCoupleNames(false);
    showToast(`Updated couple names to "${coupleTitle}"`);
    await updateProfile({ groomName, brideName });
  };

  // Schedule list actions
  const addScheduleItem = () => {
    setScheduleItems([
      ...scheduleItems,
      { title: 'New Event Title', time: '02:00 PM', description: 'Reception Area' },
    ]);
    showToast('Added new event item');
  };

  const updateScheduleItem = (index: number, field: string, val: string) => {
    const copy = [...scheduleItems];
    copy[index] = { ...copy[index], [field]: val };
    setScheduleItems(copy);
  };

  const removeScheduleItem = (index: number) => {
    const copy = scheduleItems.filter((_, i) => i !== index);
    setScheduleItems(copy);
    showToast('Removed event item');
  };

  // Publish to database & sync localStorage
  const handlePublish = async () => {
    setSaving(true);
    showToast('Saving and publishing site...');
    const payload = {
      groomName,
      brideName,
      weddingDate: weddingDateStr,
      venue,
      story,
      coverImage: coverPhoto,
      blocks,
      activePalette,
      headingFont,
      bodyFont,
      scheduleItems,
      bankAccount,
      bgMusic,
      showCountdown,
      language,
      enable3DAnimation,
      templateId: activePalette,
    };

    try {
      localStorage.setItem('pmg_builder_published_site', JSON.stringify(payload));
    } catch {}

    const res = await updateProfile(payload);
    setSaving(false);
    if (res.success) {
      showToast('Site published live successfully! Preview matches 100%.');
    } else {
      showToast('Saved locally (Offline mode active)');
    }
  };

  // Theme styling rules based on activePalette
  const getThemeStyles = () => {
    switch (activePalette) {
      case 'emerald':
        return {
          bg: 'bg-[#F0F7F4]',
          cardBg: 'bg-white',
          accentBtn: 'bg-[#0F382C] text-white hover:bg-[#0B2A21]',
          textColor: 'text-[#0F382C]',
          tagBg: 'bg-emerald-100 text-emerald-800',
          badgeText: 'EMERALD THEME',
        };
      case 'gold':
        return {
          bg: 'bg-[#FFFDF5]',
          cardBg: 'bg-white',
          accentBtn: 'bg-[#8C6D1F] text-white hover:bg-[#6E5618]',
          textColor: 'text-[#3D300F]',
          tagBg: 'bg-amber-100 text-amber-900',
          badgeText: 'GOLD THEME',
        };
      case 'dark':
        return {
          bg: 'bg-slate-950',
          cardBg: 'bg-slate-900 text-slate-100 border-slate-800',
          accentBtn: 'bg-gold-400 text-slate-950 font-bold hover:bg-gold-300',
          textColor: 'text-gold-300',
          tagBg: 'bg-slate-800 text-gold-300',
          badgeText: 'DARK THEME',
        };
      case 'blush':
      default:
        return {
          bg: 'bg-[#FFF8F0]',
          cardBg: 'bg-white',
          accentBtn: 'bg-[#785655] text-white hover:bg-[#5E3F3E]',
          textColor: 'text-[#353023]',
          tagBg: 'bg-[#F7CAC9] text-[#755353]',
          badgeText: 'BLUSH THEME',
        };
    }
  };

  const theme = getThemeStyles();
  const paddingClass = paddingSize === 'S' ? 'p-4' : paddingSize === 'L' ? 'p-12' : 'p-8';

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] font-sans bg-[#FFF8F0] -m-6 md:-m-10">
      {/* Top Header Bar */}
      <div className="px-6 py-3.5 bg-white border-b border-[#EBE2CE] flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-4">
          <h1 className="font-serif text-2xl font-bold text-[#353023]">Dashboard</h1>
          <div className="w-[1px] h-5 bg-[#EBE2CE]" />
          
          {/* Editable Header Couple Name */}
          <div className="flex items-center gap-2 text-xs text-[#504444] font-medium bg-[#FAF6F0] px-3 py-1.5 rounded-xl border border-[#EBE2CE]">
            <Edit3 className="w-3.5 h-3.5 text-[#785655]" />
            {isEditingCoupleNames ? (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  placeholder="Groom"
                  className="w-20 bg-white border border-[#D4C3C2] text-xs font-bold text-[#353023] px-2 py-0.5 rounded-lg focus:outline-none"
                />
                <span className="font-bold text-[#785655]">&</span>
                <input
                  type="text"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  placeholder="Bride"
                  className="w-20 bg-white border border-[#D4C3C2] text-xs font-bold text-[#353023] px-2 py-0.5 rounded-lg focus:outline-none"
                />
                <button
                  onClick={handleSaveCoupleNames}
                  className="bg-[#785655] text-white p-1 rounded-md text-[10px] font-bold hover:bg-[#5E3F3E]"
                >
                  <Save className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingCoupleNames(true)}
                className="flex items-center gap-1.5 hover:text-[#785655] transition-colors"
                title="Click to edit couple name"
              >
                <span className="font-bold text-[#353023]">Editing: {coupleTitle} Wedding</span>
                <span className="text-[10px] text-[#785655] bg-[#F5E6E3] px-1.5 py-0.5 rounded-md font-bold">
                  Edit Name
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Center Viewport & History Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[#504444]">
            <button
              onClick={handleUndo}
              disabled={historyIndex === 0}
              className="p-2 hover:bg-[#FAF6F0] disabled:opacity-40 rounded-lg transition-colors"
              title="Undo"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 hover:bg-[#FAF6F0] disabled:opacity-40 rounded-lg transition-colors"
              title="Redo"
            >
              <Redo className="w-4 h-4" />
            </button>
          </div>

          <div className="w-[1px] h-4 bg-[#EBE2CE]" />

          {/* Viewport switcher */}
          <div className="bg-[#FAF6F0] border border-[#EBE2CE] p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setDevice('desktop')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                device === 'desktop' ? 'bg-[#785655] text-white shadow-sm' : 'text-[#827473] hover:text-[#353023]'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                device === 'mobile' ? 'bg-[#785655] text-white shadow-sm' : 'text-[#827473] hover:text-[#353023]'
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 md:gap-3">
          <label className="bg-[#FAF6F0] hover:bg-[#F7EDD9] border border-[#EBE2CE] text-[#5C332D] font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer">
            <Camera className="w-3.5 h-3.5 text-[#785655]" />
            <span className="hidden sm:inline">Change Photo</span>
            <input type="file" accept="image/*" onChange={handleCoverPhotoUpload} className="hidden" />
          </label>

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="bg-[#F5E6E3] hover:bg-[#E8C8C1] border border-[#D5A49B] text-[#5C332D] font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            title="Download QR Code & Copy Share Link"
          >
            <QrCode className="w-3.5 h-3.5 text-[#785655]" />
            <span className="hidden sm:inline">QR & Share</span>
          </button>

          <button
            onClick={() => setIsWhatsAppPreviewOpen(true)}
            className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-xs px-3 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            title="Preview WhatsApp / iMessage Share Card"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden sm:inline">WhatsApp Card</span>
          </button>

          <Link
            href={`/${wedding?.slug || 'kasun-dilhani'}`}
            target="_blank"
            onClick={() => {
              try {
                localStorage.setItem(
                  'pmg_builder_published_site',
                  JSON.stringify({
                    groomName,
                    brideName,
                    weddingDate: weddingDateStr,
                    venue,
                    story,
                    coverImage: coverPhoto,
                    blocks,
                    activePalette,
                    headingFont,
                    bodyFont,
                    scheduleItems,
                    bankAccount,
                    templateId: activePalette,
                  })
                );
              } catch {}
            }}
            className="bg-white border border-[#D4C3C2] text-[#1F1B0F] hover:bg-[#FAF6F0] font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#785655]" />
            Preview
          </Link>
          <button
            onClick={handlePublish}
            disabled={saving}
            className="bg-[#785655] hover:bg-[#5E3F3E] text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            {saving ? 'Publishing...' : 'Publish Site'}
          </button>
          {!rightPanelOpen && (
            <button
              onClick={() => setRightPanelOpen(true)}
              className="p-2 rounded-xl bg-[#F7EDD9] text-[#785655] font-semibold text-xs hover:bg-[#F1E7D4] transition-colors"
              title="Open Editor"
            >
              Editor Panel
            </button>
          )}
        </div>
      </div>

      {publishStatus && (
        <div className="bg-emerald-100 border-b border-emerald-300 text-emerald-900 px-8 py-2 text-xs font-bold text-center flex items-center justify-center gap-2 animate-[fadeIn_0.2s_ease-out]">
          <span>✓ {publishStatus}</span>
        </div>
      )}

      {/* Main 3-Column Studio Layout */}
      <div className="flex-1 flex overflow-hidden relative pb-14 lg:pb-0">
        {/* Left Column: Add / Toggle Blocks Library */}
        <div className={`w-full lg:w-[300px] bg-white border-r border-[#EBE2CE] p-6 space-y-6 overflow-y-auto shadow-sm flex-shrink-0 ${
          mobileTab === 'blocks' ? 'block' : 'hidden lg:block'
        }`}>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#353023]">Add Blocks</h2>
            <p className="text-[11px] text-[#504444] mt-1">Click any element to add or remove it from your website.</p>
          </div>

          {/* HERO & HEADERS */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#827473]">
              HERO & HEADERS
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => toggleBlock('cover', 'Cover Image')}
                className={`p-3.5 border rounded-xl flex flex-col items-center justify-center text-center transition-all space-y-1.5 ${
                  blocks.includes('cover')
                    ? 'bg-[#F5E6E3] border-[#D5A49B] text-[#5C332D] font-bold shadow-sm'
                    : 'bg-[#F7EDD9]/60 border-[#EBE2CE] hover:bg-[#F7EDD9] text-[#353023]'
                }`}
              >
                <ImageIcon className="w-5 h-5 text-[#785655]" />
                <span className="text-[11px]">Cover Image</span>
                <span className={`text-[9px] font-bold ${blocks.includes('cover') ? 'text-emerald-700' : 'text-[#827473]'}`}>
                  {blocks.includes('cover') ? '✓ Added' : '+ Add'}
                </span>
              </button>

              <button
                onClick={() => toggleBlock('title', 'Title Block')}
                className={`p-3.5 border rounded-xl flex flex-col items-center justify-center text-center transition-all space-y-1.5 ${
                  blocks.includes('title')
                    ? 'bg-[#F5E6E3] border-[#D5A49B] text-[#5C332D] font-bold shadow-sm'
                    : 'bg-[#F7EDD9]/60 border-[#EBE2CE] hover:bg-[#F7EDD9] text-[#353023]'
                }`}
              >
                <Type className="w-5 h-5 text-[#785655]" />
                <span className="text-[11px]">Title Block</span>
                <span className={`text-[9px] font-bold ${blocks.includes('title') ? 'text-emerald-700' : 'text-[#827473]'}`}>
                  {blocks.includes('title') ? '✓ Added' : '+ Add'}
                </span>
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#827473]">CONTENT</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => toggleBlock('story', 'Our Story')}
                className={`p-3.5 border rounded-xl flex flex-col items-center justify-center text-center transition-all space-y-1.5 ${
                  blocks.includes('story')
                    ? 'bg-[#F5E6E3] border-[#D5A49B] text-[#5C332D] font-bold shadow-sm'
                    : 'bg-[#F7EDD9]/60 border-[#EBE2CE] hover:bg-[#F7EDD9] text-[#353023]'
                }`}
              >
                <AlignLeft className="w-5 h-5 text-[#785655]" />
                <span className="text-[11px]">Our Story</span>
                <span className={`text-[9px] font-bold ${blocks.includes('story') ? 'text-emerald-700' : 'text-[#827473]'}`}>
                  {blocks.includes('story') ? '✓ Added' : '+ Add'}
                </span>
              </button>

              <button
                onClick={() => toggleBlock('schedule', 'Schedule')}
                className={`p-3.5 border rounded-xl flex flex-col items-center justify-center text-center transition-all space-y-1.5 ${
                  blocks.includes('schedule')
                    ? 'bg-[#F5E6E3] border-[#D5A49B] text-[#5C332D] font-bold shadow-sm'
                    : 'bg-[#F7EDD9]/60 border-[#EBE2CE] hover:bg-[#F7EDD9] text-[#353023]'
                }`}
              >
                <Calendar className="w-5 h-5 text-[#785655]" />
                <span className="text-[11px]">Schedule</span>
                <span className={`text-[9px] font-bold ${blocks.includes('schedule') ? 'text-emerald-700' : 'text-[#827473]'}`}>
                  {blocks.includes('schedule') ? '✓ Added' : '+ Add'}
                </span>
              </button>

              <button
                onClick={() => toggleBlock('location', 'Location')}
                className={`p-3.5 border rounded-xl flex flex-col items-center justify-center text-center transition-all space-y-1.5 ${
                  blocks.includes('location')
                    ? 'bg-[#F5E6E3] border-[#D5A49B] text-[#5C332D] font-bold shadow-sm'
                    : 'bg-[#F7EDD9]/60 border-[#EBE2CE] hover:bg-[#F7EDD9] text-[#353023]'
                }`}
              >
                <MapPin className="w-5 h-5 text-[#785655]" />
                <span className="text-[11px]">Location</span>
                <span className={`text-[9px] font-bold ${blocks.includes('location') ? 'text-emerald-700' : 'text-[#827473]'}`}>
                  {blocks.includes('location') ? '✓ Added' : '+ Add'}
                </span>
              </button>

              <button
                onClick={() => toggleBlock('gallery', 'Gallery Grid')}
                className={`p-3.5 border rounded-xl flex flex-col items-center justify-center text-center transition-all space-y-1.5 ${
                  blocks.includes('gallery')
                    ? 'bg-[#F5E6E3] border-[#D5A49B] text-[#5C332D] font-bold shadow-sm'
                    : 'bg-[#F7EDD9]/60 border-[#EBE2CE] hover:bg-[#F7EDD9] text-[#353023]'
                }`}
              >
                <Grid className="w-5 h-5 text-[#785655]" />
                <span className="text-[11px]">Gallery Grid</span>
                <span className={`text-[9px] font-bold ${blocks.includes('gallery') ? 'text-emerald-700' : 'text-[#827473]'}`}>
                  {blocks.includes('gallery') ? '✓ Added' : '+ Add'}
                </span>
              </button>
            </div>
          </div>

          {/* ACTIONS & FORMS */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#827473]">
              ACTIONS & FORMS
            </span>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => toggleBlock('rsvp', 'RSVP Form')}
                className={`w-full p-3 border rounded-xl flex items-center justify-between transition-all ${
                  blocks.includes('rsvp')
                    ? 'bg-[#F5E6E3] border-[#D5A49B] text-[#5C332D] font-bold shadow-sm'
                    : 'bg-[#F7EDD9]/60 border-[#EBE2CE] hover:bg-[#F7EDD9] text-[#353023]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-4 h-4 text-[#785655]" />
                  <span>RSVP Form</span>
                </div>
                <span className={`text-[9px] font-bold ${blocks.includes('rsvp') ? 'text-emerald-700' : 'text-[#827473]'}`}>
                  {blocks.includes('rsvp') ? '✓ Added' : '+ Add'}
                </span>
              </button>

              <button
                onClick={() => toggleBlock('registry', 'Registry Links')}
                className={`w-full p-3 border rounded-xl flex items-center justify-between transition-all ${
                  blocks.includes('registry')
                    ? 'bg-[#F5E6E3] border-[#D5A49B] text-[#5C332D] font-bold shadow-sm'
                    : 'bg-[#F7EDD9]/60 border-[#EBE2CE] hover:bg-[#F7EDD9] text-[#353023]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Gift className="w-4 h-4 text-[#785655]" />
                  <span>Registry Links</span>
                </div>
                <span className={`text-[9px] font-bold ${blocks.includes('registry') ? 'text-emerald-700' : 'text-[#827473]'}`}>
                  {blocks.includes('registry') ? '✓ Added' : '+ Add'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Center Column: Live Mockup Canvas */}
        <div className={`flex-1 bg-[#FFF8F0] p-4 md:p-8 items-start justify-center overflow-y-auto ${
          mobileTab === 'canvas' ? 'flex' : 'hidden lg:flex'
        }`}>
          <div
            className={`transition-all duration-300 ${
              device === 'mobile' ? 'w-[380px]' : 'w-[820px]'
            } ${theme.bg} rounded-[36px] border-8 border-[#E2D9C6] shadow-2xl overflow-hidden relative flex flex-col my-auto`}
            style={{ fontFamily: bodyFont }}
          >
            {/* Mobile Top Device Speaker Notch */}
            {device === 'mobile' && (
              <div className="w-full bg-[#E2D9C6] h-5 flex items-center justify-center border-b border-[#D4C3C2]/40 flex-shrink-0 z-30">
                <div className="w-16 h-1.5 bg-[#8C746E] rounded-full" />
              </div>
            )}
            {/* Dynamic Rendering of Active Blocks */}
            {blocks.map((blockKey, idx) => {
              const isSelected = selectedBlockId === blockKey;
              return (
                <div
                  key={blockKey}
                  onClick={() => {
                    setSelectedBlockId(blockKey);
                    setActiveRightTab('content');
                    setRightPanelOpen(true);
                  }}
                  className={`relative group border-b border-[#EBE2CE]/40 last:border-b-0 cursor-pointer transition-all ${
                    isSelected ? 'ring-4 ring-[#785655]/40 shadow-lg relative z-10' : 'hover:outline hover:outline-2 hover:outline-[#785655]/30'
                  }`}
                >
                  {/* Action Toolbar on Selected / Hovered Block */}
                  <div className="absolute top-2 right-2 z-20 bg-white/95 backdrop-blur-sm border border-[#EBE2CE] rounded-xl p-1 flex items-center gap-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBlockId(blockKey);
                        setActiveRightTab('content');
                        setRightPanelOpen(true);
                      }}
                      className="p-1 hover:bg-[#FAF6F0] text-[#785655] rounded flex items-center gap-1 text-[10px] font-bold px-2"
                      title="Edit Block Content"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveBlock(idx, 'up');
                      }}
                      disabled={idx === 0}
                      className="p-1 hover:bg-[#FAF6F0] disabled:opacity-30 rounded text-[#785655]"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveBlock(idx, 'down');
                      }}
                      disabled={idx === blocks.length - 1}
                      className="p-1 hover:bg-[#FAF6F0] disabled:opacity-30 rounded text-[#785655]"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBlock(blockKey, blockKey);
                      }}
                      className="p-1 hover:bg-rose-50 text-rose-700 rounded"
                      title="Remove Block"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* BLOCK: COVER (Hero Header at the top) */}
                  {blockKey === 'cover' && (
                    <div className="relative h-[420px] w-full overflow-hidden group/cover">
                      <img
                        src={coverPhoto}
                        alt={coupleTitle}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/cover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      
                      {/* Direct Upload / Change Cover Photo Button Overlay */}
                      <label
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-4 left-4 z-20 bg-black/75 hover:bg-black/90 text-white backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-xl border border-white/30 cursor-pointer active:scale-95"
                      >
                        <Camera className="w-4 h-4 text-amber-200" />
                        <span>Upload / Change Photo</span>
                        <input type="file" accept="image/*" onChange={handleCoverPhotoUpload} className="hidden" />
                      </label>

                      <div className="absolute inset-x-4 bottom-4 text-center text-white space-y-1.5 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                        <p className="text-[11px] italic tracking-wide font-serif text-amber-100 drop-shadow-md">
                          Together with their families
                        </p>

                        <div className="py-0.5 space-y-0">
                          <h3
                            className="text-4xl md:text-5xl font-normal tracking-wide text-amber-100 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
                            style={{ fontFamily: headingFont || 'Great Vibes, cursive' }}
                          >
                            {groomName}
                          </h3>
                          <span
                            className="text-2xl italic block text-amber-200 drop-shadow-md"
                            style={{ fontFamily: headingFont || 'Great Vibes, cursive' }}
                          >
                            &
                          </span>
                          <h3
                            className="text-4xl md:text-5xl font-normal tracking-wide text-amber-100 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
                            style={{ fontFamily: headingFont || 'Great Vibes, cursive' }}
                          >
                            {brideName}
                          </h3>
                        </div>

                        <p className="text-[10px] italic tracking-widest font-serif text-amber-50 drop-shadow-md">
                          are getting married
                        </p>

                        <div className="pt-1.5 border-t border-white/30 max-w-[200px] mx-auto space-y-0.5">
                          <span className="text-[8px] uppercase tracking-widest text-white/90 font-bold block drop-shadow-sm">
                            JOIN US ON
                          </span>
                          <p className="text-xs font-serif italic text-amber-100 tracking-wider drop-shadow-md">
                            {formattedDate}
                          </p>
                          <p className="text-[10px] font-serif text-white/95 drop-shadow-sm">
                            {venue}
                          </p>
                        </div>

                        {/* Live Animated Countdown Box Preview on Builder Canvas */}
                        {showCountdown && (
                          <div className="pt-1.5 border-t border-white/30 mt-1.5 max-w-[220px] mx-auto">
                            <span className="text-[8px] uppercase tracking-widest text-white/90 font-bold block mb-0.5 drop-shadow-sm">
                              Countdown to Our Day
                            </span>
                            <div className="flex items-center justify-center gap-3 bg-black/40 backdrop-blur-md p-1.5 rounded-xl border border-white/20 shadow-md inline-flex mx-auto">
                              <div>
                                <span className="font-mono text-sm font-bold text-white block leading-none drop-shadow-sm">{timeLeft.days}</span>
                                <span className="text-[7px] uppercase tracking-widest text-white/90 font-bold">Days</span>
                              </div>
                              <div className="text-white/60 text-xs">•</div>
                              <div>
                                <span className="font-mono text-sm font-bold text-white block leading-none drop-shadow-sm">{timeLeft.hours}</span>
                                <span className="text-[7px] uppercase tracking-widest text-white/90 font-bold">Hours</span>
                              </div>
                              <div className="text-white/60 text-xs">•</div>
                              <div>
                                <span className="font-mono text-sm font-bold text-white block leading-none drop-shadow-sm">{timeLeft.minutes}</span>
                                <span className="text-[7px] uppercase tracking-widest text-white/90 font-bold">Mins</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* BLOCK: TITLE */}
                  {blockKey === 'title' && (
                    <div className={`${paddingClass} text-center space-y-2 ${theme.cardBg}`}>
                      <h2 className="text-2xl font-bold" style={{ fontFamily: headingFont }}>
                        {coupleTitle}
                      </h2>
                      <p className="text-xs text-[#755D58] font-medium">{formattedDate} • {venue}</p>
                    </div>
                  )}

                  {/* BLOCK: STORY */}
                  {blockKey === 'story' && (
                    <div className={`${paddingClass} text-center space-y-3 ${theme.cardBg}`}>
                      <h4 className="text-2xl font-bold text-[#785655]" style={{ fontFamily: headingFont }}>
                        Our Story
                      </h4>
                      <p className="text-xs leading-relaxed opacity-90 max-w-lg mx-auto text-[#504444]">{story}</p>
                    </div>
                  )}

                  {/* BLOCK: SCHEDULE */}
                  {blockKey === 'schedule' && showTimelines && (
                    <div className={`${paddingClass} text-center space-y-4 ${theme.cardBg}`}>
                      <h4 className="text-2xl font-bold text-[#785655]" style={{ fontFamily: headingFont }}>
                        Schedule of Events
                      </h4>
                      <div className="space-y-3 max-w-sm mx-auto text-left text-xs">
                        {scheduleItems.map((item, i) => (
                          <div key={i} className="p-3 bg-[#FAF6F0] rounded-xl border border-[#EBE2CE] flex items-center justify-between">
                            <div>
                              <div className="font-bold text-[#353023]">{item.title}</div>
                              <div className="text-[11px] text-[#755D58]">{item.description}</div>
                            </div>
                            <span className="font-mono text-[11px] font-bold text-[#785655]">{item.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* BLOCK: DETAILS */}
                  {blockKey === 'details' && (
                    <div className={`${paddingClass} text-center space-y-4 ${theme.cardBg}`}>
                      <h4 className="text-xl font-bold text-[#353023]" style={{ fontFamily: headingFont }}>
                        The Details
                      </h4>
                      <p className="text-xs opacity-80 text-[#504444]">{venue}, {venueAddress}</p>
                    </div>
                  )}

                  {/* BLOCK: RSVP */}
                  {blockKey === 'rsvp' && (
                    <div className={`${paddingClass} text-center space-y-4 ${theme.cardBg}`}>
                      <h4 className="text-2xl font-bold text-[#353023]" style={{ fontFamily: headingFont }}>
                        RSVP
                      </h4>
                      <p className="text-xs opacity-80 text-[#504444]">Kindly respond by {rsvpDeadline}</p>
                      <button className={`w-full py-3.5 rounded-xl font-bold text-xs shadow-md transition-all ${theme.accentBtn}`}>
                        RSVP Now ♡
                      </button>
                    </div>
                  )}

                  {/* BLOCK: LOCATION */}
                  {blockKey === 'location' && (
                    <div className={`${paddingClass} text-center space-y-3 ${theme.cardBg}`}>
                      <h4 className="text-2xl font-bold text-[#785655]" style={{ fontFamily: headingFont }}>
                        Venue Location
                      </h4>
                      <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#EBE2CE] text-xs space-y-1">
                        <MapPin className="w-5 h-5 mx-auto text-[#785655]" />
                        <div className="font-bold text-[#353023]">{venue}</div>
                        <div className="text-[11px] text-[#755D58]">{venueAddress}</div>
                      </div>
                    </div>
                  )}

                  {/* BLOCK: GALLERY */}
                  {blockKey === 'gallery' && (
                    <div className={`${paddingClass} text-center space-y-3 ${theme.cardBg}`}>
                      <h4 className="text-2xl font-bold text-[#785655]" style={{ fontFamily: headingFont }}>
                        Gallery Grid
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <img
                          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400"
                          className="rounded-xl h-28 w-full object-cover"
                          alt="Gallery 1"
                        />
                        <img
                          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400"
                          className="rounded-xl h-28 w-full object-cover"
                          alt="Gallery 2"
                        />
                      </div>
                    </div>
                  )}

                  {/* BLOCK: REGISTRY */}
                  {blockKey === 'registry' && (
                    <div className={`${paddingClass} text-center space-y-3 ${theme.cardBg}`}>
                      <h4 className="text-2xl font-bold text-[#785655]" style={{ fontFamily: headingFont }}>
                        Gift Registry & Bank Details
                      </h4>
                      <div className="p-4 bg-[#FAF6F0] rounded-xl border border-[#EBE2CE] text-xs text-left space-y-1 font-mono text-[#353023]">
                        <div>Account: {bankAccount.accountName}</div>
                        <div>Bank: {bankAccount.bankName}</div>
                        <div>No: {bankAccount.accountNumber}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Sticky Fixed Bottom RSVP Floating Bar Preview */}
            {blocks.includes('rsvp') && (
              <div className="sticky bottom-3 inset-x-3 z-30 p-1.5 text-center">
                <button
                  onClick={() => {
                    setSelectedBlockId('rsvp');
                    setActiveRightTab('content');
                    setRightPanelOpen(true);
                  }}
                  className="w-full bg-gradient-to-r from-[#5C332D] via-[#785655] to-[#4A2823] text-amber-100 font-bold text-xs py-2.5 px-4 rounded-full shadow-[0_8px_25px_rgba(92,51,45,0.6)] backdrop-blur-md border border-amber-200/40 flex items-center justify-center gap-1.5 transition-all transform hover:scale-102 ring-1 ring-amber-400/20"
                >
                  <span className="text-rose-300 text-xs">♡</span>
                  <span className="tracking-wider uppercase font-serif">RSVP Now</span>
                  <span className="text-amber-200 text-xs">→</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Customizer & Block Content Editor */}
        {rightPanelOpen && (
          <div className={`w-full lg:w-[340px] bg-white border-l border-[#EBE2CE] p-6 space-y-6 overflow-y-auto shadow-sm flex-shrink-0 animate-[fadeIn_0.2s_ease-out] ${
            mobileTab === 'editor' ? 'block' : 'hidden lg:block'
          }`}>
            <div className="flex items-center justify-between pb-2 border-b border-[#EBE2CE]">
              {/* Tab Toggle: Content vs Style */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveRightTab('content')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeRightTab === 'content'
                      ? 'bg-[#785655] text-white shadow-sm'
                      : 'bg-[#FAF6F0] text-[#504444] hover:bg-[#F7EDD9]'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" /> Content
                </button>
                <button
                  onClick={() => setActiveRightTab('style')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeRightTab === 'style'
                      ? 'bg-[#785655] text-white shadow-sm'
                      : 'bg-[#FAF6F0] text-[#504444] hover:bg-[#F7EDD9]'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Style
                </button>
              </div>

              <button
                onClick={() => setRightPanelOpen(false)}
                className="text-[#827473] hover:text-[#353023] p-1 rounded-lg hover:bg-[#FAF6F0]"
                title="Close Editor"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* TAB 1: BLOCK CONTENT EDITOR */}
            {activeRightTab === 'content' && (
              <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#785655]">
                    Editing: {selectedBlockId.toUpperCase()} BLOCK
                  </span>
                </div>

                {/* Edit Cover / Title Block */}
                {(selectedBlockId === 'cover' || selectedBlockId === 'title') && (
                  <div className="space-y-5 text-xs">
                    {/* Cover Photo Upload & Presets */}
                    <div className="space-y-3 p-3 bg-[#FAF6F0] rounded-2xl border border-[#EBE2CE]">
                      <span className="block text-[#353023] font-bold text-xs">Cover Photo Image</span>
                      
                      <div className="relative h-28 rounded-xl overflow-hidden border border-[#D4C3C2] shadow-sm">
                        <img src={coverPhoto} alt="Cover Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <label className="bg-white/95 hover:bg-white text-[#5C332D] text-[11px] font-bold px-3 py-1.5 rounded-xl cursor-pointer shadow-md flex items-center gap-1.5 transition-all">
                            <Upload className="w-3.5 h-3.5 text-[#785655]" /> Upload Photo
                            <input type="file" accept="image/*" onChange={handleCoverPhotoUpload} className="hidden" />
                          </label>
                        </div>
                      </div>

                      {/* Image URL Text Input */}
                      <div className="space-y-1">
                        <span className="text-[10px] text-[#755D58] font-medium block">Or paste image URL</span>
                        <input
                          type="url"
                          value={coverPhoto}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCoverPhoto(val);
                            try {
                              localStorage.setItem('pmg_builder_cover_photo', val);
                            } catch {}
                          }}
                          placeholder="https://..."
                          className="w-full bg-white border border-[#D4C3C2] rounded-lg px-2.5 py-1.5 text-[11px] text-[#353023] focus:outline-none focus:border-[#785655]"
                        />
                      </div>

                      {/* Preset Cover Photo Library Grid */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] text-[#755D58] font-bold block uppercase tracking-wider">
                          Preset Wedding Covers
                        </span>
                        <div className="grid grid-cols-3 gap-1.5">
                          {PRESET_COVERS.map((preset) => (
                            <button
                              key={preset.name}
                              onClick={() => {
                                setCoverPhoto(preset.url);
                                try {
                                  localStorage.setItem('pmg_builder_cover_photo', preset.url);
                                } catch {}
                                showToast(`Selected "${preset.name}" cover`);
                              }}
                              className={`relative h-14 rounded-lg overflow-hidden border-2 transition-all ${
                                coverPhoto === preset.url ? 'border-[#785655] ring-2 ring-[#785655]' : 'border-transparent opacity-75 hover:opacity-100'
                              }`}
                              title={preset.name}
                            >
                              <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[#353023] font-semibold">Groom Name</label>
                      <input
                        type="text"
                        value={groomName}
                        onChange={(e) => setGroomName(e.target.value)}
                        className="w-full bg-[#FFF8F0] border border-[#D4C3C2] rounded-xl px-3 py-2 text-xs font-bold text-[#353023] focus:outline-none focus:border-[#785655]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[#353023] font-semibold">Bride Name</label>
                      <input
                        type="text"
                        value={brideName}
                        onChange={(e) => setBrideName(e.target.value)}
                        className="w-full bg-[#FFF8F0] border border-[#D4C3C2] rounded-xl px-3 py-2 text-xs font-bold text-[#353023] focus:outline-none focus:border-[#785655]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[#353023] font-semibold">Wedding Date</label>
                      <input
                        type="date"
                        value={weddingDateStr}
                        onChange={(e) => setWeddingDateStr(e.target.value)}
                        className="w-full bg-[#FFF8F0] border border-[#D4C3C2] rounded-xl px-3 py-2 text-xs font-bold text-[#353023] focus:outline-none focus:border-[#785655]"
                      />
                    </div>
                  </div>
                )}

                {/* Edit Story Block */}
                {selectedBlockId === 'story' && (
                  <div className="space-y-3 text-xs">
                    <label className="block text-[#353023] font-semibold">Our Story Paragraph</label>
                    <textarea
                      rows={5}
                      value={story}
                      onChange={(e) => setStory(e.target.value)}
                      className="w-full bg-[#FFF8F0] border border-[#D4C3C2] rounded-xl p-3 text-xs text-[#353023] focus:outline-none focus:border-[#785655] resize-none"
                    />
                  </div>
                )}

                {/* Edit Schedule Block */}
                {selectedBlockId === 'schedule' && (
                  <div className="space-y-4 text-xs">
                    <div className="flex items-center justify-between">
                      <label className="text-[#353023] font-semibold">Event Items</label>
                      <button
                        onClick={addScheduleItem}
                        className="text-[11px] font-bold text-[#785655] hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add Event
                      </button>
                    </div>
                    <div className="space-y-3">
                      {scheduleItems.map((item, idx) => (
                        <div key={idx} className="p-3 bg-[#FAF6F0] border border-[#EBE2CE] rounded-xl space-y-2 relative">
                          <button
                            onClick={() => removeScheduleItem(idx)}
                            className="absolute top-2 right-2 text-rose-700 hover:text-rose-900"
                            title="Delete Event"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <div>
                            <span className="text-[10px] text-[#827473]">Title</span>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => updateScheduleItem(idx, 'title', e.target.value)}
                              className="w-full bg-white border border-[#D4C3C2] rounded-lg px-2 py-1 text-xs font-bold text-[#353023]"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-[10px] text-[#827473]">Time</span>
                              <input
                                type="text"
                                value={item.time}
                                onChange={(e) => updateScheduleItem(idx, 'time', e.target.value)}
                                className="w-full bg-white border border-[#D4C3C2] rounded-lg px-2 py-1 text-xs text-[#353023]"
                              />
                            </div>
                            <div>
                              <span className="text-[10px] text-[#827473]">Location</span>
                              <input
                                type="text"
                                value={item.description}
                                onChange={(e) => updateScheduleItem(idx, 'description', e.target.value)}
                                className="w-full bg-white border border-[#D4C3C2] rounded-lg px-2 py-1 text-xs text-[#353023]"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Edit Location / Details Block */}
                {(selectedBlockId === 'location' || selectedBlockId === 'details') && (
                  <div className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <label className="block text-[#353023] font-semibold">Venue Name</label>
                      <input
                        type="text"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        className="w-full bg-[#FFF8F0] border border-[#D4C3C2] rounded-xl px-3 py-2 text-xs font-bold text-[#353023] focus:outline-none focus:border-[#785655]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[#353023] font-semibold">Venue Address</label>
                      <input
                        type="text"
                        value={venueAddress}
                        onChange={(e) => setVenueAddress(e.target.value)}
                        className="w-full bg-[#FFF8F0] border border-[#D4C3C2] rounded-xl px-3 py-2 text-xs text-[#353023] focus:outline-none focus:border-[#785655]"
                      />
                    </div>
                  </div>
                )}

                {/* Edit RSVP Block */}
                {selectedBlockId === 'rsvp' && (
                  <div className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <label className="block text-[#353023] font-semibold">RSVP Deadline Date</label>
                      <input
                        type="text"
                        value={rsvpDeadline}
                        onChange={(e) => setRsvpDeadline(e.target.value)}
                        className="w-full bg-[#FFF8F0] border border-[#D4C3C2] rounded-xl px-3 py-2 text-xs font-bold text-[#353023] focus:outline-none focus:border-[#785655]"
                      />
                    </div>
                  </div>
                )}

                {/* Edit Registry Block */}
                {selectedBlockId === 'registry' && (
                  <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <label className="block text-[#353023] font-semibold">Account Holder Name</label>
                      <input
                        type="text"
                        value={bankAccount.accountName}
                        onChange={(e) => setBankAccount({ ...bankAccount, accountName: e.target.value })}
                        className="w-full bg-[#FFF8F0] border border-[#D4C3C2] rounded-xl px-3 py-2 text-xs text-[#353023]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[#353023] font-semibold">Bank Name</label>
                      <input
                        type="text"
                        value={bankAccount.bankName}
                        onChange={(e) => setBankAccount({ ...bankAccount, bankName: e.target.value })}
                        className="w-full bg-[#FFF8F0] border border-[#D4C3C2] rounded-xl px-3 py-2 text-xs text-[#353023]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[#353023] font-semibold">Account Number</label>
                      <input
                        type="text"
                        value={bankAccount.accountNumber}
                        onChange={(e) => setBankAccount({ ...bankAccount, accountNumber: e.target.value })}
                        className="w-full bg-[#FFF8F0] border border-[#D4C3C2] rounded-xl px-3 py-2 text-xs text-[#353023]"
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={handlePublish}
                  disabled={saving}
                  className="w-full py-3 bg-[#785655] hover:bg-[#5E3F3E] text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> {saving ? 'Saving Changes...' : 'Save Block Changes'}
                </button>
              </div>
            )}

            {/* TAB 2: STYLE & THEME CUSTOMIZER */}
            {activeRightTab === 'style' && (
              <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
                {/* Color Palette Swatches */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#504444]">Color Palette</label>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${theme.tagBg}`}>
                      {theme.badgeText}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setActivePalette('blush');
                        showToast('Switched to Blush theme');
                      }}
                      className={`w-9 h-9 rounded-full bg-[#FFF8F0] border-2 shadow-sm transition-transform ${
                        activePalette === 'blush' ? 'border-[#785655] scale-110 ring-2 ring-[#785655]' : 'border-[#EBE2CE]'
                      }`}
                      title="Blush Palette"
                    />
                    <button
                      onClick={() => {
                        setActivePalette('emerald');
                        showToast('Switched to Emerald theme');
                      }}
                      className={`w-9 h-9 rounded-full bg-[#0F382C] shadow-sm transition-transform ${
                        activePalette === 'emerald' ? 'scale-110 ring-2 ring-emerald-600' : ''
                      }`}
                      title="Emerald Palette"
                    />
                    <button
                      onClick={() => {
                        setActivePalette('gold');
                        showToast('Switched to Gold theme');
                      }}
                      className={`w-9 h-9 rounded-full bg-[#8C6D1F] shadow-sm transition-transform ${
                        activePalette === 'gold' ? 'scale-110 ring-2 ring-amber-600' : ''
                      }`}
                      title="Gold Palette"
                    />
                    <button
                      onClick={() => {
                        setActivePalette('dark');
                        showToast('Switched to Dark theme');
                      }}
                      className={`w-9 h-9 rounded-full bg-slate-900 border border-slate-700 shadow-sm transition-transform ${
                        activePalette === 'dark' ? 'scale-110 ring-2 ring-slate-400' : ''
                      }`}
                      title="Dark Mode Palette"
                    />
                  </div>
                </div>

                {/* Typography Customizer */}
                <div className="space-y-3 pt-4 border-t border-[#EBE2CE]">
                  <label className="text-xs font-semibold text-[#504444] block">Typography</label>
                  <div className="space-y-2">
                    <span className="text-[11px] text-[#827473] block">Headings ({headingFont})</span>
                    <select
                      value={headingFont}
                      onChange={(e) => {
                        setHeadingFont(e.target.value);
                        showToast(`Heading font changed to ${e.target.value}`);
                      }}
                      className="w-full bg-[#FFF8F0] border border-[#EBE2CE] text-xs font-serif text-[#353023] p-2.5 rounded-xl focus:outline-none"
                    >
                      <option value="Great Vibes">Great Vibes (Calligraphy Cursive ✨)</option>
                      <option value="Alex Brush">Alex Brush (Elegant Cursive 🌸)</option>
                      <option value="Dancing Script">Dancing Script</option>
                      <option value="Playfair Display">Playfair Display</option>
                      <option value="Cormorant Garamond">Cormorant Garamond</option>
                      <option value="Cinzel">Cinzel</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[11px] text-[#827473] block">Body Text ({bodyFont})</span>
                    <select
                      value={bodyFont}
                      onChange={(e) => {
                        setBodyFont(e.target.value);
                        showToast(`Body font changed to ${e.target.value}`);
                      }}
                      className="w-full bg-[#FFF8F0] border border-[#EBE2CE] text-xs font-sans text-[#353023] p-2.5 rounded-xl focus:outline-none"
                    >
                      <option value="Inter">Inter</option>
                      <option value="Outfit">Outfit</option>
                      <option value="Roboto">Roboto</option>
                    </select>
                  </div>
                </div>

                {/* Background Music Selector Card */}
                <div className="space-y-3 pt-4 border-t border-[#EBE2CE]">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#353023] flex items-center gap-1.5">
                      <Music className="w-4 h-4 text-[#785655]" /> Background Music
                    </label>
                    <button
                      onClick={() => {
                        const next = !bgMusic.enabled;
                        setBgMusic({ ...bgMusic, enabled: next });
                        showToast(next ? 'Enabled background music' : 'Disabled background music');
                      }}
                      className={`w-9 h-5 rounded-full relative flex items-center px-0.5 transition-colors ${
                        bgMusic.enabled ? 'bg-[#785655]' : 'bg-[#EBE2CE]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          bgMusic.enabled ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {bgMusic.enabled && (
                    <div className="space-y-2 bg-[#FAF6F0] border border-[#EBE2CE] p-3 rounded-2xl">
                      <span className="text-[11px] text-[#755D58] font-bold block">Select Track</span>
                      <div className="space-y-1.5">
                        {MUSIC_TRACKS.map((track) => (
                          <button
                            key={track.name}
                            onClick={() => {
                              setBgMusic({ enabled: true, trackUrl: track.url, trackName: track.name });
                              showToast(`Music set to "${track.name}"`);
                            }}
                            className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between border transition-all ${
                              bgMusic.trackName === track.name
                                ? 'bg-[#F5E6E3] border-[#D5A49B] text-[#5C332D] font-bold shadow-sm'
                                : 'bg-white border-[#EBE2CE] hover:bg-[#F7EDD9]/60 text-[#353023]'
                            }`}
                          >
                            <span className="truncate pr-2">{track.name}</span>
                            {bgMusic.trackName === track.name && <Volume2 className="w-3.5 h-3.5 text-[#785655] shrink-0" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Hero Animated Countdown Toggle */}
                <div className="flex items-center justify-between text-xs text-[#504444] pt-4 border-t border-[#EBE2CE]">
                  <span className="font-bold text-[#353023] flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#785655]" /> Cover Countdown Box
                  </span>
                  <button
                    onClick={() => {
                      const next = !showCountdown;
                      setShowCountdown(next);
                      showToast(next ? 'Showing Cover Countdown Timer' : 'Hidden Cover Countdown Timer');
                    }}
                    className={`w-9 h-5 rounded-full relative flex items-center px-0.5 transition-colors ${
                      showCountdown ? 'bg-[#785655]' : 'bg-[#EBE2CE]'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        showCountdown ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* 3D Floating Hearts & Sparkles Particle Animation Toggle */}
                <div className="flex items-center justify-between text-xs text-[#504444] pt-4 border-t border-[#EBE2CE]">
                  <span className="font-bold text-[#353023] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-rose-600 animate-pulse" /> 3D Floating Hearts & Particles
                  </span>
                  <button
                    onClick={() => {
                      const next = !enable3DAnimation;
                      setEnable3DAnimation(next);
                      showToast(next ? 'Enabled 3D Floating Hearts Particle Animation' : 'Disabled 3D Animations');
                    }}
                    className={`w-9 h-5 rounded-full relative flex items-center px-0.5 transition-colors ${
                      enable3DAnimation ? 'bg-rose-600' : 'bg-[#EBE2CE]'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        enable3DAnimation ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Dual Language Switcher */}
                <div className="space-y-2 pt-4 border-t border-[#EBE2CE]">
                  <label className="text-xs font-bold text-[#353023] flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-[#785655]" /> Language Preference
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    <button
                      onClick={() => {
                        setLanguage('en');
                        showToast('Set language to English');
                      }}
                      className={`p-2 rounded-xl font-bold border transition-all text-center ${
                        language === 'en'
                          ? 'bg-[#785655] text-white border-[#785655]'
                          : 'bg-[#FAF6F0] text-[#504444] border-[#EBE2CE] hover:bg-[#F7EDD9]'
                      }`}
                    >
                      🇬🇧 English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('si');
                        showToast('Set language to Sinhala');
                      }}
                      className={`p-2 rounded-xl font-bold border transition-all text-center ${
                        language === 'si'
                          ? 'bg-[#785655] text-white border-[#785655]'
                          : 'bg-[#FAF6F0] text-[#504444] border-[#EBE2CE] hover:bg-[#F7EDD9]'
                      }`}
                    >
                      🇱🇰 Sinhala
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('bilingual');
                        showToast('Set language to Bilingual (Dual)');
                      }}
                      className={`p-2 rounded-xl font-bold border transition-all text-center ${
                        language === 'bilingual'
                          ? 'bg-[#785655] text-white border-[#785655]'
                          : 'bg-[#FAF6F0] text-[#504444] border-[#EBE2CE] hover:bg-[#F7EDD9]'
                      }`}
                    >
                      Dual 🇬🇧🇱🇰
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mobile Bottom Studio Navigation Bar (Visible on phones) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EBE2CE] p-2 flex items-center justify-around shadow-2xl">
          <button
            onClick={() => setMobileTab('blocks')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold px-5 py-1.5 rounded-xl transition-all ${
              mobileTab === 'blocks' ? 'bg-[#785655] text-white shadow-md' : 'text-[#755D58] hover:bg-[#FAF6F0]'
            }`}
          >
            <Plus className="w-4 h-4" /> Blocks
          </button>
          <button
            onClick={() => setMobileTab('canvas')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold px-5 py-1.5 rounded-xl transition-all ${
              mobileTab === 'canvas' ? 'bg-[#785655] text-white shadow-md' : 'text-[#755D58] hover:bg-[#FAF6F0]'
            }`}
          >
            <Smartphone className="w-4 h-4" /> Canvas
          </button>
          <button
            onClick={() => setMobileTab('editor')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold px-5 py-1.5 rounded-xl transition-all ${
              mobileTab === 'editor' ? 'bg-[#785655] text-white shadow-md' : 'text-[#755D58] hover:bg-[#FAF6F0]'
            }`}
          >
            <Edit3 className="w-4 h-4" /> Editor
          </button>
        </div>
      </div>

      {/* MODAL 1: QR CODE & SHARE LINK GENERATOR */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EBE2CE] p-6 max-w-md w-full shadow-2xl space-y-5 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex items-center justify-between border-b border-[#EBE2CE] pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#785655]" />
                <h3 className="font-bold text-sm text-[#353023]">Print QR & Share Website</h3>
              </div>
              <button onClick={() => setIsShareModalOpen(false)} className="p-1 rounded-lg hover:bg-[#FAF6F0] text-[#755D58]">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* QR Code Canvas Mockup */}
            <div className="text-center space-y-3 bg-[#FAF6F0] p-6 rounded-2xl border border-[#EBE2CE]">
              <div className="bg-white p-4 rounded-2xl inline-block shadow-md border border-[#EBE2CE]">
                {/* SVG High-res QR Code Graphic */}
                <svg className="w-44 h-44 mx-auto" viewBox="0 0 100 100" fill="none">
                  <rect width="100" height="100" fill="white" />
                  <path d="M10 10h30v30H10zM15 15v20h20V15zM20 20h10v10H20z" fill="#5C332D" />
                  <path d="M60 10h30v30H60zM65 15v20h20V15zM70 20h10v10H70z" fill="#5C332D" />
                  <path d="M10 60h30v30H10zM15 65v20h20V65zM20 70h10v10H20z" fill="#5C332D" />
                  <circle cx="50" cy="50" r="10" fill="#785655" />
                  <path d="M45 10h10v20H45zM10 45h20v10H10zM70 45h20v10H70zM45 70h10v20H45z" fill="#5C332D" />
                  <path d="M60 60h10v10H60zM80 60h10v10H80zM60 80h10v10H60zM75 75h15v15H75z" fill="#5C332D" />
                </svg>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-sm text-[#353023] block">{groomName} & {brideName}</span>
                <span className="text-xs text-[#755D58] block font-mono">planmyguest.lk/{wedding?.slug || 'kasun-dilhani'}</span>
              </div>

              <button
                onClick={() => {
                  showToast('Downloaded High-Res Printable QR Code SVG!');
                }}
                className="bg-[#785655] hover:bg-[#5E3F3E] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 mx-auto w-full"
              >
                <Download className="w-4 h-4" /> Download Printable QR Code (PNG/SVG)
              </button>
            </div>

            {/* Copy Link Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#353023] block">Website Direct URL</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={`http://localhost:3000/${wedding?.slug || 'kasun-dilhani'}`}
                  className="w-full bg-[#FAF6F0] border border-[#EBE2CE] rounded-xl px-3 py-2 text-xs font-mono text-[#353023]"
                />
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(`http://localhost:3000/${wedding?.slug || 'kasun-dilhani'}`);
                    setCopiedLink(true);
                    showToast('Copied website link!');
                    setTimeout(() => setCopiedLink(false), 2500);
                  }}
                  className="bg-[#5C332D] text-white hover:bg-[#4A2823] text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shrink-0 transition-all"
                >
                  {copiedLink ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedLink ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: WHATSAPP / IMESSAGE SHARE PREVIEW DRAWER */}
      {isWhatsAppPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EBE2CE] p-6 max-w-md w-full shadow-2xl space-y-5 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex items-center justify-between border-b border-[#EBE2CE] pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-sm text-[#353023]">WhatsApp Link Preview Mockup</h3>
              </div>
              <button onClick={() => setIsWhatsAppPreviewOpen(false)} className="p-1 rounded-lg hover:bg-[#FAF6F0] text-[#755D58]">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* WhatsApp Chat Bubble Graphic */}
            <div className="bg-[#E5DDD5] p-5 rounded-3xl space-y-3 font-sans border border-[#D4C3C2]">
              <span className="text-[10px] uppercase tracking-wider text-slate-600 font-bold block text-center">
                WhatsApp Chat Message Preview
              </span>

              <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200 max-w-xs mx-auto">
                <div className="relative h-44">
                  <img src={coverPhoto} alt="WhatsApp Card Thumbnail" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 left-3 text-[10px] text-white font-mono opacity-90">planmyguest.lk</span>
                </div>

                <div className="p-3 bg-[#F0F2F5] space-y-1">
                  <h4 className="font-bold text-xs text-slate-900 leading-snug">
                    {groomName} & {brideName} Wedding Invitation
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-tight line-clamp-2">
                    We are getting married on {weddingDateStr}! Save the date and RSVP online at our digital invitation page.
                  </p>
                  <span className="text-[9px] text-emerald-700 font-bold block pt-1">
                    http://localhost:3000/{wedding?.slug || 'kasun-dilhani'}
                  </span>
                </div>
              </div>

              <div className="text-center text-[10px] text-slate-600 font-medium">
                ✨ When you share your link on WhatsApp, guests will see this rich image card automatically!
              </div>
            </div>

            <button
              onClick={() => setIsWhatsAppPreviewOpen(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all shadow-sm"
            >
              Done Previewing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
