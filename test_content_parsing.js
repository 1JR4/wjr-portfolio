// Test content parsing to see actual HTML output
const content = `As AI applications mature, success depends on more than crafting clever prompts. Just as the industrial revolution didn't stop at building better tools, the AI revolution is moving from prompt-centric tinkering toward full-fledged system design. In the near future, building AI products will require new disciplines – thinking in terms of processes, guardrails, interfaces, and even teams of AI agents – much like designing an assembly line or orchestra, not just tuning a single machine.

In fact, experts observe that "the line between 'prompt engineering' and 'process engineering' is starting to blur". In other words, the next frontier is about how AI components fit together, behave, and serve users at scale. Let's explore four emerging areas shaping this evolution.

## 1. Process Engineering (Orchestration)

**What it is:** Process engineering (often called orchestration) is the practice of designing and managing multi-step AI workflows, rather than focusing on one-shot prompts. Think of it as the conductor or control center behind an AI system. Instead of sending a single prompt and getting an answer, you build a pipeline or workflow where multiple models, tools, and data sources interact.

### Tools, patterns and frameworks

New libraries and platforms help build these workflows. For example, LangChain and LlamaIndex let developers compose "chains" of prompts, data retrieval, and Python functions.

### Key takeaways

- Think of orchestration as building a pipeline or flowchart of AI calls (e.g. prompt ⇒ LLM ⇒ parse ⇒ API call ⇒ LLM ⇒ respond)
- Common patterns include prompt chaining (using one output as the next input), memory/state management (tracking conversation history or external context), and tool integration (calling APIs, searching databases, etc.)`;

const tableOfContents = [
  { "id": "1-process-engineering-orchestration", "title": "1. Process Engineering (Orchestration)", "level": 2 },
  { "id": "tools-patterns-and-frameworks", "title": "Tools, patterns and frameworks", "level": 3 },
  { "id": "key-takeaways", "title": "Key takeaways", "level": 3 }
];

const findMatchingTocId = (headingTitle, tableOfContents, level) => {
  // Strategy 1: Exact title match
  const exactMatch = tableOfContents.find(item => 
    item.level === level && item.title.toLowerCase() === headingTitle.toLowerCase()
  );
  if (exactMatch) return exactMatch.id;

  // Strategy 2: Clean title match (remove numbers, parentheses, special chars)
  const cleanHeading = headingTitle
    .replace(/^\d+\.\s*/, '') // Remove leading numbers like "1. "
    .replace(/[()]/g, '') // Remove parentheses
    .trim()
    .toLowerCase();
  
  const cleanMatch = tableOfContents.find(item => {
    const cleanTocTitle = item.title
      .replace(/^\d+\.\s*/, '')
      .replace(/[()]/g, '')
      .trim()
      .toLowerCase();
    return item.level === level && cleanTocTitle === cleanHeading;
  });
  if (cleanMatch) return cleanMatch.id;

  // Strategy 3: Partial match (contains key words)
  const keyWords = cleanHeading.split(/\s+/).filter(word => word.length > 3);
  const partialMatch = tableOfContents.find(item => {
    if (item.level !== level) return false;
    const tocWords = item.title.toLowerCase().split(/\s+/);
    return keyWords.some(word => tocWords.some(tocWord => tocWord.includes(word) || word.includes(tocWord)));
  });
  if (partialMatch) return partialMatch.id;

  // Strategy 4: Fallback - generate ID from heading title
  return headingTitle.toLowerCase()
    .replace(/^\d+\.\s*/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Process content exactly like the React component
const html = content
  .split('\n')
  .map(line => {
    if (line.startsWith('# ')) {
      const title = line.substring(2).trim();
      const id = findMatchingTocId(title, tableOfContents, 1);
      return `<h1 id="${id}" class="text-2xl font-bold text-white mt-6 mb-3 scroll-mt-20">${title}</h1>`;
    } else if (line.startsWith('## ')) {
      const title = line.substring(3).trim();
      const id = findMatchingTocId(title, tableOfContents, 2);
      return `<h2 id="${id}" class="text-xl font-semibold text-white mt-5 mb-2 scroll-mt-20">${title}</h2>`;
    } else if (line.startsWith('### ')) {
      const title = line.substring(4).trim();
      const id = findMatchingTocId(title, tableOfContents, 3);
      return `<h3 id="${id}" class="text-lg font-medium text-white mt-4 mb-2 scroll-mt-20">${title}</h3>`;
    } else if (line.startsWith('- ')) {
      return `<li class="text-white/70 ml-4">${line.substring(2)}</li>`;
    } else if (line.trim() === '') {
      return '';
    } else {
      return `<p class="text-white/70 mb-1 leading-relaxed">${line}</p>`;
    }
  })
  .join('');

console.log('Generated HTML:');
console.log(html);

// Extract just the headings with IDs
const headingMatches = html.match(/<h[1-6][^>]*id="([^"]*)"[^>]*>([^<]*)<\/h[1-6]>/g);
console.log('\nHeadings with IDs:');
headingMatches?.forEach(heading => console.log(heading));

console.log('\nTOC expects these IDs:');
tableOfContents.forEach(item => console.log(`- ${item.id} (${item.title})`));