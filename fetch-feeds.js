const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');
const parser = new Parser();

(async function(){
  try {
    const feedsPath = path.join(__dirname, '..', 'feeds.json');
    const feeds = JSON.parse(fs.readFileSync(feedsPath, 'utf8'));
    const posts = [];
    for (const url of feeds) {
      try {
        const feed = await parser.parseURL(url);
        const items = feed.items || [];
        for (const item of items.slice(0, 8)) {
          const id = (item.guid || item.id || item.link || item.title || (Math.random()*1e9)).toString();
          posts.push({
            id: `${feed.title || url}-${id}`,
            title: item.title || '',
            excerpt: (item.contentSnippet || item.content || '').replace(/\n+/g, ' ').slice(0, 240),
            image: (item.enclosure && item.enclosure.url) || null,
            url: item.link || null,
            published_at: item.isoDate || item.pubDate || new Date().toISOString(),
            source: feed.title || url
          });
        }
      } catch (e) {
        console.error('fetch error for', url, e && e.message);
      }
    }
    posts.sort((a,b)=> new Date(b.published_at) - new Date(a.published_at));
    const outDir = path.join(__dirname, '..', 'public');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
    fs.writeFileSync(path.join(outDir, 'posts.json'), JSON.stringify({ posts, hasMore: false }, null, 2));
    console.log('wrote public/posts.json with', posts.length, 'posts');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();