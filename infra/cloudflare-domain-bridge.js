// Cloudflare Worker for craigweston.co.uk.
// Origin stays on the GitHub-connected Cloudflare Pages project.
// Deploy this as the `craigweston-site-bridge` Worker and attach the
// craigweston.co.uk Custom Domain after DNS delegation is corrected.
// This Worker preserves paths, queries, method, and response headers.
addEventListener('fetch', event => {
  event.respondWith((async () => {
    const url = new URL(event.request.url);
    url.protocol = 'https:';
    url.hostname = 'craigweston-website.pages.dev';
    url.port = '';
    const request = new Request(url.toString(), event.request);
    const response = await fetch(request);
    return new Response(response.body, response);
  })());
});
