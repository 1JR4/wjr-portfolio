// Debug script to test TOC matching
const content = `## 1. Process Engineering (Orchestration)

**What it is:** Process engineering...

### Tools, patterns and frameworks

New libraries and platforms...

### Key takeaways

- Think of orchestration...`;

const tableOfContents = [
  { "id": "1-process-engineering-orchestration", "title": "1. Process Engineering (Orchestration)", "level": 2 },
  { "id": "tools-patterns-and-frameworks", "title": "Tools, patterns and frameworks", "level": 3 },
  { "id": "key-takeaways", "title": "Key takeaways", "level": 3 }
];

// Copy the exact findMatchingTocId function
const findMatchingTocId = (headingTitle, tableOfContents, level) => {
  console.log(`\n=== Looking for: "${headingTitle}" at level ${level} ===`);
  
  // Strategy 1: Exact title match
  const exactMatch = tableOfContents.find(item => 
    item.level === level && item.title.toLowerCase() === headingTitle.toLowerCase()
  );
  if (exactMatch) {
    console.log(`✅ Exact match found: ${exactMatch.id}`);
    return exactMatch.id;
  }

  // Strategy 2: Clean title match
  const cleanHeading = headingTitle
    .replace(/^\d+\.\s*/, '') // Remove leading numbers like "1. "
    .replace(/[()]/g, '') // Remove parentheses
    .trim()
    .toLowerCase();
  
  console.log(`Clean heading: "${cleanHeading}"`);
  
  const cleanMatch = tableOfContents.find(item => {
    const cleanTocTitle = item.title
      .replace(/^\d+\.\s*/, '')
      .replace(/[()]/g, '')
      .trim()
      .toLowerCase();
    console.log(`  Comparing with TOC "${item.title}" -> "${cleanTocTitle}" (level ${item.level})`);
    return item.level === level && cleanTocTitle === cleanHeading;
  });
  if (cleanMatch) {
    console.log(`✅ Clean match found: ${cleanMatch.id}`);
    return cleanMatch.id;
  }

  // Strategy 3: Partial match
  const keyWords = cleanHeading.split(/\s+/).filter(word => word.length > 3);
  console.log(`Key words: [${keyWords.join(', ')}]`);
  
  const partialMatch = tableOfContents.find(item => {
    if (item.level !== level) return false;
    const tocWords = item.title.toLowerCase().split(/\s+/);
    return keyWords.some(word => tocWords.some(tocWord => tocWord.includes(word) || word.includes(tocWord)));
  });
  if (partialMatch) {
    console.log(`✅ Partial match found: ${partialMatch.id}`);
    return partialMatch.id;
  }

  // Strategy 4: Fallback - generate ID
  const fallbackId = headingTitle.toLowerCase()
    .replace(/^\d+\.\s*/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  console.log(`⚠️ No match found, using fallback: ${fallbackId}`);
  return fallbackId;
};

// Test the content parsing
const lines = content.split('\n');
lines.forEach(line => {
  if (line.startsWith('## ')) {
    const title = line.substring(3).trim();
    const id = findMatchingTocId(title, tableOfContents, 2);
    console.log(`\nHTML would be: <h2 id="${id}">${title}</h2>`);
  } else if (line.startsWith('### ')) {
    const title = line.substring(4).trim();
    const id = findMatchingTocId(title, tableOfContents, 3);
    console.log(`\nHTML would be: <h3 id="${id}">${title}</h3>`);
  }
});