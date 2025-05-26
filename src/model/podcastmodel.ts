import mongoose, { Schema, Document, model } from 'mongoose';
export interface PodcastPreview {
    collectionId: number;
    collectionName: string;
    artistName: string;
    artworkUrl600: string;
    primaryGenreName: string;
    trackCount: number;
    releaseDate: string;
    feedUrl: string;
    collectionViewUrl: string;
  }


  export interface PodcastPreviewDocument extends Document {
    collectionId: number;
    collectionName: string;
    artistName: string;
    artworkUrl600: string;
    primaryGenreName: string;
    trackCount: number;
    releaseDate: string;
    feedUrl: string;
    collectionViewUrl: string;
  }
  
  const PodcastPreviewSchema = new Schema<PodcastPreviewDocument>({
    collectionId: { type: Number, required: true, unique: true },
    collectionName: { type: String, required: true },
    artistName: { type: String, required: true },
    artworkUrl600: { type: String, required: true },
    primaryGenreName: { type: String, required: true },
    trackCount: { type: Number },
    releaseDate: { type: String },
    feedUrl: { type: String },
    collectionViewUrl: { type: String },
  });
  const PodcastPreviewModel = mongoose.model<PodcastPreviewDocument>('PodcastPreview', PodcastPreviewSchema);

  export default PodcastPreviewModel;
    