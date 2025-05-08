import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true
    },
    technologies: [{
      type: String,
      required: [true, 'At least one technology is required']
    }],
    imageUrl: {
      type: String,
      required: [true, 'Project image URL is required']
    },
    githubUrl: {
      type: String,
      required: [true, 'GitHub URL is required']
    },
    liveUrl: {
      type: String
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IProject>('Project', projectSchema); 