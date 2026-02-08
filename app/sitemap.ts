import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://protools.com'; // Replace with actual domain
  const locales = ['en', 'fr', 'ar'];
  const services = [
    'cv-generator',
    'cover-letter',
    'cv-analyzer',
    'invoice-generator',
    'quotation-generator',
    'contract-generator',
    'net-salary',
    'seo-analyzer',
    'meta-tags',
    'pdf-tools/merge',
    'pdf-tools/compress',
    'pdf-tools/word-to-pdf',
    'doc-cleaner',
    'pdf-summarizer',
    'text-rewriter',
    'grammar-checker',
    'audio-report'
  ];

  const entries: MetadataRoute.Sitemap = [];

  locales.forEach(locale => {
    // Home
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    });

    // Services
    services.forEach(service => {
      entries.push({
        url: `${baseUrl}/${locale}/services/${service}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });

    // Static pages
    entries.push({
      url: `${baseUrl}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    });
    entries.push({
      url: `${baseUrl}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  });

  return entries;
}
