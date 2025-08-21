# Content Management Guide

## How to Add New Blog Posts

1. **Create a JSON file** in `/contents/blogs/` with your blog post data
2. **Add images** to `/contents/blogs/images/` 
3. **Reference images** in your JSON using the path: `/contents/blogs/images/your-image.jpg`

### Blog Post JSON Format:
```json
{
  "title": "Your Blog Title",
  "slug": "your-blog-slug",
  "excerpt": "Brief description of your blog post",
  "content": "Full blog content in markdown format",
  "date": "2024-01-15",
  "readTime": "5 min read",
  "category": "Technology",
  "author": "Wonjae Ra",
  "image": "/contents/blogs/images/hero-image.jpg",
  "tags": ["AI", "Product Management", "Innovation"],
  "tldr": [
    "Key point 1",
    "Key point 2",
    "Key point 3"
  ],
  "tableOfContents": [
    {"id": "introduction", "title": "Introduction", "level": 1},
    {"id": "main-content", "title": "Main Content", "level": 1}
  ],
  "resources": [
    {
      "title": "Related Article",
      "url": "https://example.com",
      "type": "link"
    }
  ]
}
```

## How to Add New Products

1. **Create a JSON file** in `/contents/products/` with your product data
2. **Add images** to `/contents/products/images/`
3. **Reference images** using the path: `/contents/products/images/your-image.jpg`

### Product JSON Format:
```json
{
  "name": "Product Name",
  "slug": "product-slug",
  "description": "Product description",
  "status": "live", // or "development" or "concept"
  "technologies": ["React", "TypeScript", "AI/ML"],
  "link": "https://product-url.com",
  "github": "https://github.com/your-repo",
  "images": [
    "/contents/products/images/screenshot1.jpg",
    "/contents/products/images/screenshot2.jpg",
    "/contents/products/images/screenshot3.jpg"
  ],
  "updatedAt": "2024-01-15"
}
```

## Deployment Steps

After adding new content:

1. **Copy images to public folder**:
   ```bash
   cp -r contents/blogs/images/* portfolio-nextjs/public/contents/blogs/images/
   cp -r contents/products/images/* portfolio-nextjs/public/contents/products/images/
   ```

2. **Build the project**:
   ```bash
   cd portfolio-nextjs
   npm run build
   ```

3. **Deploy to Firebase**:
   ```bash
   firebase deploy --only hosting
   ```

## Important Notes

- Images should be optimized (max 1MB recommended)
- Use descriptive file names for images
- JSON files are automatically loaded during build
- The build process generates content from all JSON files in the folders
- Always test locally before deploying