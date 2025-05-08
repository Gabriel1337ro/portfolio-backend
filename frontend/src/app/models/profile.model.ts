export interface Profile {
  _id?: string;
  name: string;
  title: string;
  description: string;
  email: string;
  location: string;
  phone: string;
  heroImage: string;
  aboutImage: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
} 