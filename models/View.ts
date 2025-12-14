import { Schema, model, models } from "mongoose";

export type ViewSource = "organic" | "facebook" | "other";

export interface IView {
  path: string;
  ip: string;
  source: ViewSource;
  userAgent: string;
  createdAt: Date;
}

const ViewSchema = new Schema<IView>({
  path: { type: String, required: true },
  ip: { type: String, required: true },
  source: {
    type: String,
    enum: ["organic", "facebook", "other"],
    default: "organic",
  },
  userAgent: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const View = models.View || model<IView>("View", ViewSchema);

export default View;
