export default function PublicSiteLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#0A111E] text-[#FAF8F5] selection:bg-gold-400 selection:text-slate-950">{children}</div>;
}
