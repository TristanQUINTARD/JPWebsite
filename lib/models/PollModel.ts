import mongoose, { Schema, Document } from 'mongoose';

export interface PollDocument extends Document {
  googleFormLink: string;
  createdAt: Date;
}

const PollSchema: Schema = new Schema({
  googleFormLink: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const PollModel = mongoose.models.Poll || mongoose.model<PollDocument>('Poll', PollSchema);

export default PollModel;