import mongoose, { Schema, Document } from 'mongoose';

export interface ISeatingTableDocument extends Document {
  weddingId: mongoose.Types.ObjectId;
  tableName: string;
  capacity: number;
  guestIds: mongoose.Types.ObjectId[];
  position: { x: number; y: number };
  createdAt: Date;
  updatedAt: Date;
}

const SeatingTableSchema = new Schema<ISeatingTableDocument>(
  {
    weddingId: { type: Schema.Types.ObjectId, ref: 'Wedding', required: true, index: true },
    tableName: { type: String, required: true },
    capacity: { type: Number, required: true, default: 8 },
    guestIds: [{ type: Schema.Types.ObjectId, ref: 'Guest' }],
    position: {
      x: { type: Number, default: 100 },
      y: { type: Number, default: 100 },
    },
  },
  { timestamps: true }
);

export const SeatingTable =
  mongoose.models.SeatingTable || mongoose.model<ISeatingTableDocument>('SeatingTable', SeatingTableSchema);
