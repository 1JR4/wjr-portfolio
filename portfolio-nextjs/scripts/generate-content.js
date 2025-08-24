// Build-time script to generate content from JSON files
const fs = require('fs');
const path = require('path');

function loadBlogPosts() {
  try {
    const blogsDir = path.join(process.cwd(), '../contents/blogs');
    if (!fs.existsSync(blogsDir)) {
      console.warn('Blogs directory not found');
      return [];
    }
    
    const files = fs.readdirSync(blogsDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    return jsonFiles.map(file => {
      const filePath = path.join(blogsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

function loadProducts() {
  try {
    const productsDir = path.join(process.cwd(), '../contents/products');
    if (!fs.existsSync(productsDir)) {
      console.warn('Products directory not found');
      return [];
    }
    
    const files = fs.readdirSync(productsDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    return jsonFiles.map(file => {
      const filePath = path.join(productsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    }).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

function generateContentFile() {
  const blogPosts = loadBlogPosts();
  const products = loadProducts();
  
  const contentFile = `// Auto-generated content from JSON files
// DO NOT EDIT - Run 'npm run generate-content' to regenerate

export interface BlogPost {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  date?: string;
  readTime?: string;
  category?: string;
  author?: string;
  image?: string;
  tags?: string[];
  tldr?: string[];
  tableOfContents?: {
    id: string;
    title: string;
    level: number;
  }[];
  resources?: {
    title: string;
    url: string;
    type: "link" | "pdf" | "video";
  }[];
}

export interface Product {
  name: string;
  description: string;
  slug: string;
  fullDescription?: string;
  status: string;
  category: string;
  icon?: string;
  type?: string;
  image?: string;
  gallery?: string[];
  technologies?: string[];
  platforms?: string[];
  version?: string;
  link?: string;
  github?: string;
  documentation?: string;
  demo?: string;
  kpis?: any[];
  okrs?: any[];
  features?: any[];
  timeline?: any[];
  createdAt?: string;
  updatedAt?: string;
  launchDate?: string;
  faq?: Array<{ question: string; answer: string }>;
}

// Generated blog posts from JSON files
export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(blogPosts.map(post => ({
  title: post.title,
  content: post.content,
  excerpt: post.excerpt,
  slug: post.slug,
  date: post.date,
  readTime: post.readTime,
  category: post.category,
  author: post.author,
  image: post.image,
  tags: post.tags,
  tldr: post.tldr,
  tableOfContents: post.tableOfContents,
  resources: post.resources || []
})), null, 2)};

// Generated products from JSON files
export const PRODUCTS: Product[] = ${JSON.stringify(products.map(product => ({
  name: product.name,
  description: product.description,
  slug: product.slug,
  fullDescription: product.fullDescription,
  status: product.status,
  category: product.category,
  icon: product.icon,
  type: product.type,
  image: product.image,
  gallery: product.gallery,
  technologies: product.technologies,
  platforms: product.platforms,
  version: product.version,
  link: product.link,
  github: product.github,
  documentation: product.documentation,
  demo: product.demo,
  kpis: product.kpis,
  okrs: product.okrs,
  features: product.features,
  timeline: product.timeline,
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
  launchDate: product.launchDate,
  faq: product.faq
})), null, 2)};

export interface Resume {
  name: string;
  initials: string;
  location: string;
  locationLink: string;
  about: string;
  summary: string;
  avatarUrl: string;
  personalWebsiteUrl: string;
  contact: {
    email: string;
    tel: string;
    social: {
      GitHub: {
        name: string;
        url: string;
        icon: any;
      };
      LinkedIn: {
        name: string;
        url: string;
        icon: any;
      };
    };
  };
  education: {
    school: string;
    degree: string;
    start: string;
    end: string;
  }[];
  work: {
    company: string;
    link: string;
    badges: string[];
    title: string;
    logo?: any;
    start: string;
    end: string;
    description: string;
  }[];
  skills: string[];
  projects: {
    title: string;
    techStack: string[];
    description: string;
    logo?: any;
    link?: {
      label: string;
      href: string;
    };
  }[];
  title: string;
}

export const RESUME_DATA: Resume = {
  name: "Wonjae Ra",
  initials: "WR",
  location: "San Francisco, CA",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  about: "Generalist Product Manager focused on AI and emerging technologies, with experience in delivering scalable solutions and driving product innovation.",
  summary: "Technical Product Manager with 5+ years of experience building and scaling products across multiple domains. Passionate about leveraging AI to solve complex problems and create meaningful user experiences.",
  avatarUrl: "/avatar.png",
  personalWebsiteUrl: "https://wonjae.me",
  contact: {
    email: "hello@wonjae.me",
    tel: "+1234567890",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/wonjae",
        icon: null
      },
      LinkedIn: {
        name: "LinkedIn", 
        url: "https://linkedin.com/in/wonjae",
        icon: null
      }
    }
  },
  education: [
    {
      school: "University of California, Berkeley",
      degree: "Bachelor's Degree in Computer Science",
      start: "2016",
      end: "2020"
    }
  ],
  work: [
    {
      company: "TechCorp",
      link: "https://techcorp.com",
      badges: ["Remote"],
      title: "Senior Product Manager",
      start: "2022",
      end: "Present",
      description: "Leading product strategy and development for AI-powered applications"
    }
  ],
  skills: [
    "Product Management",
    "AI/ML",
    "Python",
    "React",
    "TypeScript"
  ],
  projects: [
    {
      title: "Nimbus",
      techStack: ["React Native", "AI/ML", "Firebase"],
      description: "AI-powered personality insight application",
    }
  ],
  title: "Generalist Product Manager / AI - Enthusiast"
};
`;

  fs.writeFileSync(path.join(process.cwd(), 'src/lib/content.ts'), contentFile);
  console.log('✅ Content generated successfully from JSON files!');
  console.log(`📝 Generated ${blogPosts.length} blog posts and ${products.length} products`);
}

if (require.main === module) {
  generateContentFile();
}

module.exports = { generateContentFile };