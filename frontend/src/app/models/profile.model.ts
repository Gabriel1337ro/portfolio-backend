export interface Profile {
  name: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  heroImage: string;
  aboutImage: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
} 