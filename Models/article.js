import { Schema, Types, model } from "mongoose";
import normalize from "normalize-mongoose";

const articleSchema = new Schema(
  {
    title: { type: String, required: true },
    article: { type: String, required: true },
    image: [{ type: String, required: true }],
    category: { type: String },
    doctorId: { type: Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

articleSchema.plugin(normalize);
export const ArticleModel = model("Article", articleSchema);
