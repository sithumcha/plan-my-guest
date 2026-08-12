'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, UploadCloud, Trash2, Check, FileText, ChevronRight } from 'lucide-react';

export default function ImportGuestsPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedFile, setSelectedFile] = useState<{ name: string; rows: number; size: string } | null>({
    name: 'wedding_guest_list_v2.csv',
    rows: 142,
    size: '12 KB',
  });

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        rows: Math.floor(Math.random() * 100) + 50,
        size: `${(file.size / 1024).toFixed(1)} KB`,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans bg-[#FFF8F0] min-h-screen pb-16">
      {/* Back Link */}
      <div>
        <Link
          href="/dashboard/guests"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#504444] hover:text-[#353023] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Guests
        </Link>
      </div>

      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl font-bold text-[#353023]">Import Guests Wizard</h1>
        <p className="text-sm text-[#504444]">
          Seamlessly bring your guest list into Plan My Guest. Follow the steps below to upload and organize your contacts.
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-8 py-4">
        {/* Step 1 */}
        <div className="flex flex-col items-center gap-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              step >= 1 ? 'bg-[#785655] text-white shadow-sm' : 'bg-[#EBE2CE] text-[#504444]'
            }`}
          >
            {step > 1 ? <Check className="w-5 h-5" /> : '1'}
          </div>
          <span className="text-xs font-semibold text-[#353023]">1. Upload</span>
        </div>

        <div className="w-16 h-[2px] bg-[#EBE2CE]" />

        {/* Step 2 */}
        <div className="flex flex-col items-center gap-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
              step === 2
                ? 'border-[#785655] bg-[#F5E6E3] text-[#785655]'
                : step > 2
                ? 'bg-[#785655] text-white'
                : 'border-[#EBE2CE] bg-[#FFF8F0] text-[#504444]'
            }`}
          >
            2
          </div>
          <span className="text-xs font-semibold text-[#504444]">2. Map Columns</span>
        </div>

        <div className="w-16 h-[2px] bg-[#EBE2CE]" />

        {/* Step 3 */}
        <div className="flex flex-col items-center gap-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              step === 3 ? 'bg-[#785655] text-white' : 'bg-[#EBE2CE] text-[#504444]'
            }`}
          >
            3
          </div>
          <span className="text-xs font-semibold text-[#504444]">3. Review</span>
        </div>
      </div>

      {/* Main Upload Box Card */}
      <div className="bg-white rounded-3xl border border-[#EBE2CE] p-8 space-y-6 shadow-sm">
        <h3 className="font-serif text-2xl font-bold text-[#353023]">Upload Guest List</h3>

        {/* Drag & Drop Area */}
        <label className="border-2 border-dashed border-[#D4C3C2] rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-4 bg-[#FFF8F0]/50 hover:bg-[#FFF8F0] transition-colors cursor-pointer block">
          <div className="w-14 h-14 rounded-full bg-[#F7EDD9] text-[#785655] flex items-center justify-center shadow-sm">
            <UploadCloud className="w-7 h-7" />
          </div>
          <div>
            <h4 className="font-serif text-2xl font-bold text-[#353023]">Drag & drop your CSV file</h4>
            <p className="text-xs text-[#504444] mt-1 max-w-sm mx-auto">
              Or click to browse your files. We support .csv, .xls, and .xlsx formats up to 10MB.
            </p>
          </div>
          <span className="bg-[#F7EDD9] border border-[#D4C3C2] text-[#1F1B0F] font-semibold text-xs px-6 py-2.5 rounded-xl hover:bg-[#F1E7D4] transition-colors inline-block mt-2">
            Browse Files
          </span>
          <input type="file" accept=".csv,.xls,.xlsx" onChange={handleFileDrop} className="hidden" />
        </label>

        {/* Selected File Bar */}
        {selectedFile && (
          <div className="bg-[#F7EDD9]/80 border border-[#EBE2CE] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[#785655]" />
              <div>
                <span className="font-mono text-xs font-bold text-[#353023] block">{selectedFile.name}</span>
                <span className="text-[11px] text-[#504444]">
                  {selectedFile.rows} rows • {selectedFile.size}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
              title="Remove File"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Continue Button */}
        {selectedFile && (
          <div className="flex justify-end pt-4 border-t border-[#EBE2CE]">
            <button
              onClick={() => alert('Guests imported successfully!')}
              className="bg-[#785655] hover:bg-[#5E3F3E] text-white font-medium text-xs px-6 py-3 rounded-xl flex items-center gap-2 shadow-sm transition-colors"
            >
              Continue to Column Mapping <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
