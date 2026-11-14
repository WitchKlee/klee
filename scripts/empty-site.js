'use strict';

// Hexo's index, archive, and feed generators omit their routes when no posts exist.
// Keep navigation usable until the first post is published.
hexo.extend.generator.register('empty-site', function(locals) {
  if (locals.posts.length) return [];

  const escapeXml = value => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
  const siteUrl = this.config.url.replace(/\/+$/, '') + '/';
  const feedPath = this.config.feed.path;

  return [
    {
      path: 'index.html',
      layout: 'page',
      data: { title: '首页', content: '<p>暂无文章。</p>', comments: false }
    },
    {
      path: this.config.archive_dir + '/index.html',
      layout: 'page',
      data: { title: '归档', content: '<p>暂无文章。</p>', comments: false }
    },
    {
      path: feedPath,
      data: '<?xml version="1.0" encoding="utf-8"?>\n' +
        '<feed xmlns="http://www.w3.org/2005/Atom">' +
        `<title>${escapeXml(this.config.title)}</title>` +
        `<id>${escapeXml(siteUrl)}</id>` +
        `<link href="${escapeXml(siteUrl)}"/>` +
        `<link href="${escapeXml(siteUrl + feedPath)}" rel="self"/>` +
        `<updated>${new Date().toISOString()}</updated>` +
        '</feed>\n'
    }
  ];
});
