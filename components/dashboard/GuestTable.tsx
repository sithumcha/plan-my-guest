'use client';

import { useState } from 'react';
import { IGuest } from '@/types';
import { Search, Filter, Plus, Trash2, Send, CheckCircle, Clock, XCircle, Edit3, UserCheck } from 'lucide-react';

interface GuestTableProps {
  initialGuests: IGuest[];
  onAddGuest: () => void;
  onRefresh: () => void;
}

export default function GuestTable({ initialGuests, onAddGuest, onRefresh }: GuestTableProps) {
  const [guests, setGuests] = useState<IGuest[]>(initialGuests);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'attending' | 'declined'>('all');
  const [sendingPhone, setSendingPhone] = useState<string | null>(null);

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch = guest.name.toLowerCase().includes(search.toLowerCase()) || guest.phone.includes(search);
    const matchesStatus = filterStatus === 'all' || guest.rsvpStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSendWhatsApp = async (guest: IGuest) => {
    setSendingPhone(guest.phone);
    try {
      const res = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestId: guest._id,
          phone: guest.phone,
          guestName: guest.name,
          coupleNames: 'Kasun & Dilhani',
          invitationUrl: 'https://plansite.lk/vishmi-sanjana',
        }),
      });
      if (res.ok) {
        setGuests((prev) => prev.map((g) => (g._id === guest._id ? { ...g, inviteSent: true } : g)));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSendingPhone(null);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (confirm('Are you sure you want to remove this guest?')) {
      await fetch(`/api/guests/${id}`, { method: 'DELETE' });
      setGuests((prev) => prev.filter((g) => g._id !== id));
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto flex-1">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#8C746E]" />
            <input
              type="text"
              placeholder="Search guest by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-[#E8DEC8] text-[#3A1E1A] text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#5C332D]"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center bg-white border border-[#E8DEC8] rounded-xl p-1 text-xs shadow-sm">
            {(['all', 'attending', 'pending', 'declined'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg capitalize font-bold transition-colors ${
                  filterStatus === status ? 'bg-[#5C332D] text-white' : 'text-[#755D58] hover:text-[#3A1E1A]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onAddGuest}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#5C332D] hover:bg-[#4A2823] text-white font-bold px-4 py-2.5 rounded-xl shadow-md text-sm"
        >
          <Plus className="w-4 h-4" /> Add Guest
        </button>
      </div>

      {/* Guest Table */}
      <div className="glass-card rounded-2xl border border-[#E8DEC8] overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#3A1E1A]">
            <thead className="bg-[#FAF6F0] text-xs text-[#755D58] uppercase tracking-wider border-b border-[#E8DEC8]">
              <tr>
                <th className="px-6 py-4">Guest Name</th>
                <th className="px-6 py-4">Contact Phone</th>
                <th className="px-6 py-4">RSVP Status</th>
                <th className="px-6 py-4">Plus Ones</th>
                <th className="px-6 py-4">Dietary Notes</th>
                <th className="px-6 py-4">Seating Table</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DEC8]/60">
              {filteredGuests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#8C746E]">
                    No guests found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredGuests.map((guest) => (
                  <tr key={guest._id} className="hover:bg-[#FAF6F0]/60 transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#3A1E1A] flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#F5E6E3] border border-[#D5A49B] flex items-center justify-center text-[#5C332D] font-bold text-xs">
                        {guest.name.charAt(0)}
                      </div>
                      {guest.name}
                    </td>
                    <td className="px-6 py-4 text-[#755D58] font-mono text-xs">{guest.phone}</td>
                    <td className="px-6 py-4">
                      {guest.rsvpStatus === 'attending' && (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-full text-xs font-bold">
                          <CheckCircle className="w-3.5 h-3.5" /> Attending
                        </span>
                      )}
                      {guest.rsvpStatus === 'pending' && (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-1 rounded-full text-xs font-bold">
                          <Clock className="w-3.5 h-3.5" /> Pending
                        </span>
                      )}
                      {guest.rsvpStatus === 'declined' && (
                        <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 border border-rose-300 px-2.5 py-1 rounded-full text-xs font-bold">
                          <XCircle className="w-3.5 h-3.5" /> Declined
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-[#3A1E1A] font-semibold">+{guest.plusOnes}</td>
                    <td className="px-6 py-4 text-xs text-[#755D58]">{guest.dietaryRestrictions || 'None'}</td>
                    <td className="px-6 py-4 text-xs">
                      {guest.tableName ? (
                        <span className="bg-[#F5E6E3] px-2.5 py-1 rounded-lg text-[#5C332D] border border-[#D5A49B] font-semibold">
                          {guest.tableName}
                        </span>
                      ) : (
                        <span className="text-[#8C746E] italic">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleSendWhatsApp(guest)}
                          disabled={sendingPhone === guest.phone}
                          className={`p-2 rounded-lg text-xs flex items-center gap-1 font-bold transition-colors ${
                            guest.inviteSent
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          }`}
                          title="Send WhatsApp Invitation"
                        >
                          <Send className="w-3.5 h-3.5" />
                          {sendingPhone === guest.phone ? 'Sending...' : guest.inviteSent ? 'Sent' : 'WhatsApp'}
                        </button>
                        <button
                          onClick={() => handleDelete(guest._id)}
                          className="p-2 rounded-lg text-[#8C746E] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
