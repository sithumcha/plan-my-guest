'use client';

import { useState } from 'react';
import { Search, Plus, GripVertical, Utensils, Award, ZoomIn, ZoomOut, Circle, Square, RotateCcw, Save } from 'lucide-react';

interface GuestItem {
  id: string;
  name: string;
  category: string;
  isVip?: boolean;
  dietary?: boolean;
}

interface TableItem {
  id: string;
  name: string;
  shape: 'circle' | 'rectangle';
  capacity: number;
  assignedCount: number;
  x: number;
  y: number;
}

const initialUnseated: GuestItem[] = [
  { id: 'g1', name: 'Eleanor Vance', category: "Bride's Family", isVip: true },
  { id: 'g2', name: 'Luke Crain', category: "Groom's Friends" },
  { id: 'g3', name: 'Theodora Crain', category: "Bride's Friends", dietary: true },
  { id: 'g4', name: 'Steven Crain', category: "Bride's Family" },
  { id: 'g5', name: 'Dr. Ruwan Perera', category: 'VIP Guests', isVip: true },
  { id: 'g6', name: 'Nimmi Perera', category: 'VIP Guests' },
];

const initialTables: TableItem[] = [
  { id: 't1', name: 'T1', shape: 'circle', capacity: 8, assignedCount: 8, x: 220, y: 120 },
  { id: 't2', name: 'T2', shape: 'circle', capacity: 8, assignedCount: 4, x: 500, y: 120 },
  { id: 't3', name: 'Head Table', shape: 'rectangle', capacity: 4, assignedCount: 2, x: 340, y: 320 },
];

export default function SeatingPage() {
  const [unseated, setUnseated] = useState<GuestItem[]>(initialUnseated);
  const [tables, setTables] = useState<TableItem[]>(initialTables);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [zoom, setZoom] = useState(100);

  const filteredGuests = unseated.filter((g) => {
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'All' || g.category.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  const handleAddTable = (shape: 'circle' | 'rectangle') => {
    const newId = `t${tables.length + 1}`;
    setTables((prev) => [
      ...prev,
      {
        id: newId,
        name: shape === 'circle' ? `T${tables.length + 1}` : `Table ${tables.length + 1}`,
        shape,
        capacity: 8,
        assignedCount: 0,
        x: 300,
        y: 200,
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] font-sans bg-[#FFF8F0] -m-6 md:-m-10">
      {/* Top Header */}
      <div className="px-8 py-4 bg-white border-b border-[#EBE2CE] flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-3xl font-bold text-[#353023]">Seating Chart</h1>
          <span className="bg-[#EAE3BC] text-[#574500] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Draft Mode
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Seating arrangement saved!')}
            className="bg-[#785655] hover:bg-[#5E3F3E] text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Seating Layout
          </button>
        </div>
      </div>

      {/* Main Area: Split Screen (Left Sidebar Unseated + Right Floorplan Canvas) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Panel: Unseated Guests */}
        <div className="w-[320px] bg-white border-r border-[#EBE2CE] flex flex-col p-6 gap-4 shadow-sm overflow-y-auto">
          <h2 className="font-serif text-2xl font-bold text-[#353023]">Unseated Guests</h2>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#827473]" />
            <input
              type="text"
              placeholder="Search guests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#F7EDD9] border border-[#EBE2CE] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#353023] font-medium focus:outline-none focus:border-[#785655]"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 text-xs">
            {['All', 'Family', 'Friends'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                  activeFilter === filter
                    ? 'bg-[#785655] text-white shadow-sm'
                    : 'bg-[#FFF8F0] text-[#504444] border border-[#EBE2CE] hover:bg-[#F7EDD9]'
                }`}
              >
                {filter === 'All' ? `All (${unseated.length})` : filter}
              </button>
            ))}
          </div>

          {/* Guest Cards */}
          <div className="space-y-3 pt-2">
            {filteredGuests.map((guest) => (
              <div
                key={guest.id}
                draggable
                className="bg-white border border-[#EBE2CE] rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md hover:border-[#785655] transition-all cursor-grab active:cursor-grabbing group"
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="w-4 h-4 text-[#D4C3C2] group-hover:text-[#785655]" />
                  <div>
                    <h3 className="font-bold text-[#353023] text-xs">{guest.name}</h3>
                    <p className="text-[11px] text-[#827473]">{guest.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {guest.isVip && (
                    <span className="bg-[#EAE3BC] text-[#574500] text-[9px] font-bold px-2 py-0.5 rounded-full">
                      VIP
                    </span>
                  )}
                  {guest.dietary && (
                    <span className="p-1 rounded-full text-rose-700 bg-rose-50" title="Dietary Notes">
                      <Utensils className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Floorplan Canvas Area */}
        <div className="flex-1 bg-[#FFF8F0] relative overflow-hidden flex items-center justify-center p-12">
          {/* Interactive Canvas Grid */}
          <div
            className="w-full h-full relative transition-transform duration-300"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            {tables.map((table) => (
              <div
                key={table.id}
                style={{ left: `${table.x}px`, top: `${table.y}px` }}
                className="absolute cursor-pointer transition-transform hover:scale-105 group"
              >
                {table.shape === 'circle' ? (
                  <div className="relative w-44 h-44 rounded-full border-4 border-[#785655] bg-[#FFFDF9] flex flex-col items-center justify-center shadow-lg text-center">
                    {/* Render Chairs around circle */}
                    {[...Array(table.capacity)].map((_, i) => {
                      const angle = (i * (360 / table.capacity) * Math.PI) / 180;
                      const cx = 70 * Math.cos(angle);
                      const cy = 70 * Math.sin(angle);
                      const isOccupied = i < table.assignedCount;
                      return (
                        <div
                          key={i}
                          style={{
                            transform: `translate(${cx}px, ${cy}px)`,
                          }}
                          className={`w-6 h-6 rounded-full absolute border-2 transition-colors ${
                            isOccupied
                              ? 'bg-[#EAE3BC] border-[#785655]'
                              : 'bg-white border-[#D4C3C2]'
                          }`}
                        />
                      );
                    })}
                    <span className="font-serif text-2xl font-bold text-[#785655]">{table.name}</span>
                    <span className="text-[11px] font-bold text-[#827473] mt-0.5">
                      {table.assignedCount}/{table.capacity} Full
                    </span>
                  </div>
                ) : (
                  <div className="relative w-64 h-32 rounded-2xl border-4 border-[#785655] bg-[#FFFDF9] flex flex-col items-center justify-center shadow-lg text-center">
                    <span className="font-serif text-2xl font-bold text-[#785655]">{table.name}</span>
                    <span className="text-[11px] font-bold text-[#827473] mt-0.5">
                      {table.assignedCount}/{table.capacity} Full
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Right Canvas Controls Toolbar */}
          <div className="absolute bottom-6 right-8 bg-white border border-[#EBE2CE] rounded-full p-2 px-4 shadow-xl flex items-center gap-4 text-xs font-semibold text-[#504444]">
            <button
              onClick={() => handleAddTable('circle')}
              className="hover:text-[#785655] flex items-center gap-1"
              title="Add Circular Table"
            >
              <Circle className="w-4 h-4 text-[#785655]" />
            </button>
            <button
              onClick={() => handleAddTable('rectangle')}
              className="hover:text-[#785655] flex items-center gap-1"
              title="Add Rectangular Table"
            >
              <Square className="w-4 h-4 text-[#785655]" />
            </button>
            <div className="w-[1px] h-4 bg-[#EBE2CE]" />
            <button onClick={() => setZoom((z) => Math.max(z - 10, 50))} className="hover:text-[#353023]">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold text-[#353023]">{zoom}%</span>
            <button onClick={() => setZoom((z) => Math.min(z + 10, 150))} className="hover:text-[#353023]">
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
