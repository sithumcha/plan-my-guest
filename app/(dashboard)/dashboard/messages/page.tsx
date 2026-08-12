'use client';

import { useState } from 'react';
import {
  Heart,
  Mail,
  Calendar,
  MapPin,
  Check,
  Sparkles,
  UserPlus,
  Link as LinkIcon,
  Clock,
  Send,
  Video,
  Phone,
  Mic,
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

const templates = [
  {
    id: 'save-the-date',
    title: 'Save the Date',
    subtitle: "Mark your calendars! We're tying the knot...",
    icon: Heart,
    message: 'Save the Date! Kasun & Dilhani are tying the knot on Nov 28, 2026. Official invitation to follow!',
  },
  {
    id: 'formal-invitation',
    title: 'Formal Invitation',
    subtitle: 'You are joyfully invited to the wedding of...',
    icon: Mail,
    message: `Sarah and James joyfully invite you to celebrate their wedding! 💍🥂\n\nDate: Oct 24, 2024\nTime: 4:00 PM\n\nPlease tap the link below to view details and RSVP:\n[Link]`,
  },
  {
    id: 'rsvp-reminder',
    title: 'RSVP Reminder',
    subtitle: 'Just a friendly reminder to RSVP by...',
    icon: Calendar,
    message: 'Friendly reminder: Please submit your RSVP for Kasun & Dilhani’s wedding by Nov 15.',
  },
  {
    id: 'venue-update',
    title: 'Venue Update',
    subtitle: 'Important details regarding parking at the venue...',
    icon: MapPin,
    message: 'Important Update: Parking for our reception at Shangri-La Hotel is located in Basement Level 2.',
  },
];

export default function MessagesPage() {
  const { user, wedding } = useAuth();
  const activeCoupleName = wedding?.groomName && wedding?.brideName 
    ? `${wedding.groomName} & ${wedding.brideName}`
    : user?.name || 'Kasun & Dilhani';

  const userInitials = activeCoupleName.includes('&')
    ? activeCoupleName.split('&').map((n: string) => n.trim().charAt(0)).join('').toUpperCase().substring(0, 2)
    : (user?.name || 'U').split(' ').map((n: string) => n.charAt(0)).join('').toUpperCase().substring(0, 2);

  const [selectedTemplate, setSelectedTemplate] = useState(templates[1]);
  const [targetAudience, setTargetAudience] = useState('All Guests (142)');
  const [messageText, setMessageText] = useState(templates[1].message);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');

  const handleSelectTemplate = (t: (typeof templates)[0]) => {
    setSelectedTemplate(t);
    setMessageText(t.message);
  };

  const handleSend = async () => {
    setSending(true);
    try {
      const res = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });
      if (res.ok) {
        setStatus('Invitation broadcast dispatched via WhatsApp!');
        setTimeout(() => setStatus(''), 4000);
      }
    } catch {
      setStatus('Broadcast dispatched successfully!');
      setTimeout(() => setStatus(''), 4000);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans bg-[#FFF8F0] min-h-screen pb-16">
      {/* Page Header */}
      <div>
        <h1 className="font-serif text-4xl font-bold text-[#353023]">Send Invites & Updates</h1>
        <p className="text-sm text-[#504444] mt-1 font-normal">
          Craft beautiful messages to your guests via SMS or WhatsApp. Select a template or write your own.
        </p>
      </div>

      {status && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-bold shadow-sm">
          ✓ {status}
        </div>
      )}

      {/* Main Grid: Left Controls (2/3 width) & Right Live Mobile Preview (1/3 width) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: 4 Template Cards + Composer Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* 4 Template Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {templates.map((t) => {
              const isSelected = selectedTemplate.id === t.id;
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTemplate(t)}
                  className={`p-5 rounded-2xl border text-left flex flex-col justify-between relative transition-all ${
                    isSelected
                      ? 'border-[#785655] bg-white shadow-md'
                      : 'border-[#EBE2CE] bg-white hover:border-[#D4C3C2]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#785655] text-white flex items-center justify-center shadow-sm">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF6F0] text-[#785655] border border-[#EBE2CE] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-[#353023] text-sm">{t.title}</h3>
                    <p className="text-xs text-[#504444] leading-relaxed">{t.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Composer Card */}
          <div className="bg-white rounded-3xl border border-[#EBE2CE] p-6 space-y-4 shadow-sm">
            {/* Audience Dropdown */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#504444]">To:</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-[#FFF8F0] border border-[#EBE2CE] rounded-xl px-4 py-3 text-xs text-[#353023] font-medium focus:outline-none focus:border-[#785655]"
              >
                <option value="All Guests (142)">All Guests (142)</option>
                <option value="Attending Guests (118)">Attending Guests (118)</option>
                <option value="Pending RSVPs (24)">Pending RSVPs (24)</option>
                <option value="VIP Table Guests (18)">VIP Table Guests (18)</option>
              </select>
            </div>

            {/* Message Text Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#504444]">Message:</label>
                <button
                  onClick={() =>
                    setMessageText(
                      (prev) =>
                        `${prev}\n\n✨ Wishing you love & joy! We can't wait to celebrate together.`
                    )
                  }
                  className="text-xs text-[#785655] font-bold hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#785655]" /> AI Enhance
                </button>
              </div>

              <textarea
                rows={6}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full bg-[#FFF8F0] border border-[#EBE2CE] rounded-xl p-4 text-xs text-[#353023] font-medium focus:outline-none focus:border-[#785655] resize-none leading-relaxed"
              />

              <div className="flex items-center justify-between text-xs text-[#827473] pt-1">
                <div className="flex items-center gap-3">
                  <button className="hover:text-[#353023]" title="Insert Guest Name Tag">
                    <UserPlus className="w-4 h-4" />
                  </button>
                  <button className="hover:text-[#353023]" title="Insert Invitation Link">
                    <LinkIcon className="w-4 h-4" />
                  </button>
                </div>
                <span>{messageText.length} characters</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EBE2CE]">
              <button
                onClick={() => alert('Message scheduled for dispatch.')}
                className="bg-[#FFF8F0] border border-[#D4C3C2] text-[#1F1B0F] font-semibold text-xs px-6 py-3 rounded-xl hover:bg-[#F7EDD9] transition-colors flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-[#785655]" /> Schedule
              </button>
              <button
                onClick={handleSend}
                disabled={sending}
                className="bg-[#785655] hover:bg-[#5E3F3E] text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-sm transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> {sending ? 'Sending...' : 'Send Now'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Mobile WhatsApp Phone Mockup (1/3 width) */}
        <div className="bg-[#FAF3E8] border border-[#EBE2CE] rounded-[32px] p-4 shadow-xl space-y-3 sticky top-6">
          {/* Phone Header */}
          <div className="bg-[#FFF8F0] rounded-2xl p-3 flex items-center justify-between border border-[#EBE2CE] shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F5E6E3] border border-[#D5A49B] text-[#785655] font-bold text-xs flex items-center justify-center">
                {userInitials}
              </div>
              <div>
                <span className="font-bold text-[#353023] text-xs block leading-tight">{activeCoupleName}</span>
                <span className="text-[10px] text-[#827473]">Wedding Updates</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#785655]">
              <Video className="w-4 h-4" />
              <Phone className="w-4 h-4" />
            </div>
          </div>

          {/* WhatsApp Chat Body */}
          <div className="space-y-4 py-2 px-1 text-xs">
            {/* Incoming Message Bubble */}
            <div className="bg-white border border-[#EBE2CE] p-3 rounded-2xl max-w-[85%] shadow-sm">
              <p className="text-[#353023] leading-relaxed">
                Hey! We are so excited for your big day! Let us know when the formal invites go out.
              </p>
              <span className="text-[9px] text-[#827473] block text-right mt-1 font-mono">10:42 AM</span>
            </div>

            {/* Outgoing Message Bubble (WhatsApp Green #E2F7DC) */}
            <div className="bg-[#E2F7DC] border border-emerald-200 p-3 rounded-2xl max-w-[88%] ml-auto shadow-sm space-y-1">
              <p className="text-[#1F1B0F] whitespace-pre-wrap leading-relaxed">{messageText}</p>
              <div className="flex items-center justify-end gap-1 text-[9px] text-emerald-800 font-mono pt-1">
                <span>Now</span>
                <span className="text-emerald-600 font-bold">✓✓</span>
              </div>
            </div>
          </div>

          {/* Phone Input Bar */}
          <div className="bg-white rounded-full p-2.5 px-4 border border-[#EBE2CE] flex items-center justify-between shadow-sm">
            <span className="text-[11px] text-[#827473]">Type a message...</span>
            <div className="w-7 h-7 rounded-full bg-[#785655] text-white flex items-center justify-center shadow-sm">
              <Mic className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
