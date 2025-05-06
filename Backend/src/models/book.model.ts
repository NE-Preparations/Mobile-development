import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  category: string;
  ISBN: string;
  publicationYear: number;
  available: boolean;
  description: string;
  coverImage?: string;
  borrowedBy?: mongoose.Types.ObjectId;
  borrowDate?: Date;
  returnDate?: Date;
}

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  publicationYear: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
  },
  borrowedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  borrowDate: {
    type: Date,
  },
  returnDate: {
    type: Date,
  },
}, { timestamps: true });

export default mongoose.model<IBook>('Book', bookSchema);
