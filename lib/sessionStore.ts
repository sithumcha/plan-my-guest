// Global session store to persist published wedding sites in memory (for offline / demo fallback)

export interface PublishedSession {
  userId?: string;
  slug: string;
  groomName: string;
  brideName: string;
  weddingDate: string | Date;
  venue: string;
  venueAddress?: string;
  coverImage?: string;
  story?: string;
  templateId?: string;
  blocks?: string[];
  activePalette?: string;
  headingFont?: string;
  bodyFont?: string;
  scheduleItems?: Array<{ title: string; time: string; description: string }>;
  bankAccount?: { accountName: string; bankName: string; accountNumber: string };
  bgMusic?: { enabled: boolean; trackUrl: string; trackName: string };
  showCountdown?: boolean;
  language?: 'en' | 'si' | 'bilingual';
  enable3DAnimation?: boolean;
}

const globalForPublished = globalThis as unknown as {
  publishedWeddings: Record<string, PublishedSession>;
};

export const publishedWeddings =
  globalForPublished.publishedWeddings || (globalForPublished.publishedWeddings = {});

export function savePublishedSession(slug: string, data: PublishedSession) {
  publishedWeddings[slug] = { ...publishedWeddings[slug], ...data };
  if (data.userId) {
    publishedWeddings[data.userId] = { ...publishedWeddings[data.userId], ...data };
  }
}

export function getPublishedSession(slugOrUserId: string): PublishedSession | null {
  return publishedWeddings[slugOrUserId] || null;
}
