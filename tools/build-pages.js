'use strict';

const path = require('node:path');
const Hexo = require('hexo');

async function main() {
  const hexo = new Hexo(path.resolve(__dirname, '..'));
  try {
    await hexo.init();
    const siteUrl = new URL(process.env.PAGES_URL || hexo.config.url);
    if (!['http:', 'https:'].includes(siteUrl.protocol) ||
        siteUrl.username || siteUrl.password || siteUrl.search || siteUrl.hash) {
      throw new Error('PAGES_URL must be an HTTP(S) site URL without credentials, query, or fragment.');
    }
    hexo.config.root = siteUrl.pathname.replace(/\/+$/, '') + '/';
    hexo.config.url = siteUrl.origin + hexo.config.root.replace(/\/$/, '');
    console.log(`Building site for ${hexo.config.url}`);
    await hexo.call('clean');
    await hexo.call('generate', { bail: true });
  } finally {
    await hexo.exit();
  }
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
