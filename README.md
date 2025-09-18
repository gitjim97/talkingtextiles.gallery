# Talking Textiles Gallery

A modern, SEO-optimized art gallery website built with Astro, featuring textile art collections, exhibition booking, and class registration.

## 🚀 Features

- **SEO Optimized**: Comprehensive meta tags, structured data, sitemap generation
- **Performance Focused**: Image optimization, lazy loading, HTML compression
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation
- **Mobile Responsive**: Optimized for all device sizes
- **Art Gallery Specific**: Structured data for art galleries, exhibitions, and artists

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run seo:audit`       | Run SEO audit to check optimization status       |
| `npm run img:optimize`    | Optimize images for web performance              |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 🔍 SEO Features

### Meta Tags & Social Sharing
- Open Graph tags for Facebook sharing
- Twitter Card optimization
- Canonical URLs to prevent duplicate content
- Comprehensive meta descriptions and keywords

### Structured Data (JSON-LD)
- ArtGallery schema for the main site
- Product schema for the anthology book
- Article schema for blog content
- Event schema for exhibitions
- Breadcrumb navigation

### Technical SEO
- XML sitemap generation with @astrojs/sitemap
- Robots.txt with proper directives
- HTML compression
- Image optimization with Sharp
- Critical resource preloading

### Content Optimization
- Semantic HTML structure (H1-H6 hierarchy)
- Descriptive alt text for all images
- Internal linking strategy
- Mobile-first responsive design
- Fast loading times (< 3 seconds)

### Performance Optimizations
- WebP image format with fallbacks
- Lazy loading for below-the-fold images
- Efficient CSS with Tailwind utility classes
- Minimal JavaScript footprint
- CDN-ready asset optimization

## � SEO Audit

Run `npm run seo:audit` to check your site's SEO status:

```bash
npm run seo:audit
```

This will verify:
- Essential SEO files are present
- Meta tags are properly configured
- Structured data is implemented
- Performance optimizations are active

## 🚀 Deployment

The site is optimized for deployment to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

### Post-Deployment SEO Tasks

1. **Submit Sitemap**: Submit your sitemap to Google Search Console and Bing Webmaster Tools
2. **Set up Analytics**: Add Google Analytics 4 or similar tracking
3. **Monitor Performance**: Use tools like Google PageSpeed Insights and Core Web Vitals
4. **Local SEO**: Create and optimize Google My Business listing
5. **Backlinks**: Build relationships with art-related websites for backlinks

## 📁 Project Structure

```
/
├── public/
│   ├── robots.txt          # Search engine crawling directives
│   └── sitemap-index.xml   # Auto-generated sitemap
├── src/
│   ├── components/
│   │   ├── Layout.astro    # Main layout with SEO meta tags
│   │   ├── SEO.astro       # Reusable SEO component
│   │   └── Nav.astro       # Navigation component
│   ├── layouts/
│   │   └── Layout.astro    # Enhanced layout with structured data
│   └── pages/
│       ├── index.astro     # Homepage with hero slideshow
│       ├── gallery.astro   # Artist portfolio grid
│       ├── anthology.astro # Book purchase page
│       └── show/
│           └── book.astro  # Exhibition booking form
└── scripts/
    └── seo-audit.mjs       # SEO verification script
```

## 🎨 Art Gallery SEO Best Practices

This site implements industry-specific SEO for art galleries:

- **Artist Portfolio**: Optimized image galleries with proper alt text
- **Exhibition Booking**: Clear call-to-actions and booking forms
- **Class Registration**: Educational content with enrollment forms
- **Book Sales**: Product pages with structured data
- **Cultural Content**: Keywords targeting art enthusiasts and collectors

## 📈 Analytics & Monitoring

After deployment, set up:
- Google Search Console for search performance
- Google Analytics for user behavior
- Core Web Vitals monitoring
- Mobile usability reports
- Rich results testing for structured data

## 🤝 Contributing

When adding new pages or features:
1. Use the SEO component for page-specific optimization
2. Add proper meta descriptions and keywords
3. Include structured data where applicable
4. Optimize images before adding them
5. Test with `npm run seo:audit` before committing
