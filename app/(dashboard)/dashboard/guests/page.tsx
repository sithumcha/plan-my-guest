'use client';

import { useState, useEffect } from 'react';
import GuestTable from '@/components/dashboard/GuestTable';
import Link from 'next/link';
import { FileUp, FileDown, Plus, X } from 'lucide-react';
import { IGuest } from '@/types';

export default function GuestsPage() {
  const [guests, setGuests] = useState<IGuest[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [plusOnes, setPlusOnes] = useState(0);
  const [dietary, setDietary] = useState('None');

  const fetchGuests = async () => {
    try {
      const res = await fetch('/api/guests');
      const data = await res.json();
      if (data.guests) setGuests(data.guests);
    } catch {
      // Ignore fallback
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const handleCreateGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/guests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, plusOnes, dietaryRestrictions: dietary }),
    });
    setShowAddModal(false);
    setName('');
    setPhone('');
    fetchGuests();
  };

  const handleExportCSV = () => {
    const csvRows = ['Name,Phone,RSVP Status,Plus Ones,Dietary Notes'];
    guests.forEach((g) => {
      csvRows.push(`"${g.name}","${g.phone}","${g.rsvpStatus}",${g.plusOnes},"${g.dietaryRestrictions || 'None'}"`);
    });
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'guest-list-planmyguest.csv';
    a.click();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-gold-400">Guest Management</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Guest List & Attendance</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/guests/import"
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold"
          >
            <FileUp className="w-4 h-4 text-gold-400" /> Import CSV
          </Link>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold"
          >
            <FileDown className="w-4 h-4 text-emerald-400" /> Export CSV
          </button>
        </div>
      </div>

      <GuestTable initialGuests={guests} onAddGuest={() => setShowAddModal(true)} onRefresh={fetchGuests} />

      {/* Add Guest Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card p-6 rounded-3xl border border-slate-800 w-full max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-white">Add New Guest</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGuest} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Guest Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Ruwan Perera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">WhatsApp Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="+94 77 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Plus Ones</label>
                  <input
                    type="number"
                    min={0}
                    value={plusOnes}
                    onChange={(e) => setPlusOnes(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Dietary Notes</label>
                  <input
                    type="text"
                    placeholder="Vegetarian / Halal"
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-gold-400 to-rose-400 text-slate-950 font-bold rounded-xl text-sm"
              >
                Save Guest
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
