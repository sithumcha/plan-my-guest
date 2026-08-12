import mongoose, { Schema, Document } from 'mongoose';

export interface IGuestDocument extends Document {
  weddingId: mongoose.Types.ObjectId;
  name: string;
  phone: string;
  email?: string;
  rsvpStatus: 'pending' | 'attending' | 'declined';
  dietaryRestrictions?: string;
  plusOnes: number;
  tableId?: mongoose.Types.ObjectId;
  inviteSent: boolean;
  rsvpNote?: string;
  createdAt: Date;
  updatedAt: Date;
}

const GuestSchema = new Schema<IGuestDocument>(
  {
    weddingId: { type: Schema.Types.ObjectId, ref: 'Wedding', required: true, index: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: '' },
    rsvpStatus: { type: String, enum: ['pending', 'attending', 'declined'], default: 'pending' },
    dietaryRestrictions: { type: String, default: 'None' },
    plusOnes: { type: Number, default: 0 },
    tableId: { type: Schema.Types.ObjectId, ref: 'SeatingTable', default: null },
    inviteSent: { type: Boolean, default: false },
    rsvpNote: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Guest = mongoose.models.Guest || mongoose.model<IGuestDocument>('Guest', GuestSchema);
