'use server';

export async function analyzeUrl(url: string) {
  if (!url) return { error: 'URL is required' };
  
  if (!url.startsWith('http')) {
    url = 'https://' + url;
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ProTools-SEO-Analyzer/1.0',
      },
      next: { revalidate: 60 }, // Cache for 1 minute
    });

    if (!response.ok) {
      return { error: `Failed to fetch URL: ${response.statusText}` };
    }

    const html = await response.text();

    // Basic extraction using Regex (lightweight approach)
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) || 
                             html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
    
    const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi);
    const imgMatches = html.match(/<img[^>]+>/gi);
    const imgWithoutAlt = imgMatches?.filter(img => !img.toLowerCase().includes('alt='));

    const title = titleMatch ? titleMatch[1] : null;
    const description = descriptionMatch ? descriptionMatch[1] : null;
    
    return {
      url,
      title: {
        value: title,
        status: title && title.length > 10 && title.length < 70 ? 'good' : 'warning',
        message: !title ? 'Missing Title' : title.length < 10 ? 'Title too short' : title.length > 70 ? 'Title too long' : 'Good length'
      },
      description: {
        value: description,
        status: description && description.length > 50 && description.length < 160 ? 'good' : 'warning',
        message: !description ? 'Missing Description' : description.length < 50 ? 'Description too short' : description.length > 160 ? 'Description too long' : 'Good length'
      },
      h1: {
        count: h1Matches ? h1Matches.length : 0,
        status: h1Matches && h1Matches.length === 1 ? 'good' : 'warning',
        message: !h1Matches ? 'Missing H1' : h1Matches.length > 1 ? 'Multiple H1 tags found' : 'One H1 tag found'
      },
      images: {
        total: imgMatches ? imgMatches.length : 0,
        missingAlt: imgWithoutAlt ? imgWithoutAlt.length : 0,
        status: !imgWithoutAlt || imgWithoutAlt.length === 0 ? 'good' : 'warning',
        message: !imgWithoutAlt || imgWithoutAlt.length === 0 ? 'All images have alt tags' : `${imgWithoutAlt.length} images missing alt tags`
      }
    };

  } catch (error) {
    return { error: 'Failed to analyze URL. Please check if the URL is accessible.' };
  }
}
