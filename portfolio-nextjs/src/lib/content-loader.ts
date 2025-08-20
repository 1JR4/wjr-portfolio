// Server-side content loader for build-time JSON processing
import fs from 'fs';
import path from 'path';

// Types matching your JSON schema
export interface BlogPostJSON {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  tldr: string[];
  tableOfContents: {
    id: string;
    title: string;
    level: number;
  }[];
  relatedArticles?: string[];
  resources?: {
    title: string;
    url: string;
    type: "link" | "pdf" | "video";
  }[];
}

export interface ProductJSON {
  name: string;
  slug: string;
  description: string;
  fullDescription?: string;
  status: "live" | "development" | "concept" | "deprecated";
  type: "web-app" | "mobile-app" | "api" | "library" | "service";
  image: string;
  gallery: string[];
  technologies: string[];
  platforms?: string[];
  version?: string;
  link?: string;
  github?: string;
  documentation?: string;
  demo?: string;
  kpis: {
    label: string;
    value: string;
    trend: "up" | "down" | "neutral";
  }[];
  okrs?: {
    objective: string;
    keyResults: string[];
    progress: number;
  }[];
  features: {
    title: string;
    description: string;
    icon?: string;
    status?: "available" | "coming-soon" | "planned";
  }[];
  timeline?: {
    date: string;
    milestone: string;
    description?: string;
  }[];
  createdAt: string;
  updatedAt: string;
  launchDate?: string;
}

// Server-side functions for build-time loading
export function loadBlogPosts(): BlogPostJSON[] {
  try {
    const blogsDir = path.join(process.cwd(), '../contents/blogs');
    if (!fs.existsSync(blogsDir)) {
      console.warn('Blogs directory not found, using fallback data');
      return [];
    }
    
    const files = fs.readdirSync(blogsDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    return jsonFiles.map(file => {
      const filePath = path.join(blogsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content) as BlogPostJSON;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export function loadProducts(): ProductJSON[] {
  try {
    const productsDir = path.join(process.cwd(), '../contents/products');
    if (!fs.existsSync(productsDir)) {
      console.warn('Products directory not found, using fallback data');
      return [];
    }
    
    const files = fs.readdirSync(productsDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    return jsonFiles.map(file => {
      const filePath = path.join(productsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content) as ProductJSON;
    }).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}