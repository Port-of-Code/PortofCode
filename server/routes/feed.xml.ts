export default defineEventHandler(async (event) => {
  const siteUrl = 'https://portofcode.com'

  const [shipyardPosts, fleetPosts, logPosts] = await Promise.all([
    queryCollection(event, 'shipyard').order('date', 'DESC').all(),
    queryCollection(event, 'fleet').order('date', 'DESC').all(),
    queryCollection(event, 'logs').order('date', 'DESC').all(),
  ])

  const allPosts = [...shipyardPosts, ...fleetPosts, ...logPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const items = allPosts.map((post) => {
    const pubDate = new Date(post.date).toUTCString()
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description || ''}]]></description>
      <link>${siteUrl}${post.path}</link>
      <guid isPermaLink="true">${siteUrl}${post.path}</guid>
      <pubDate>${pubDate}</pubDate>
    </item>`
  }).join('')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Port of Code</title>
    <link>${siteUrl}</link>
    <description>Autonomous Digital Shipyard</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`

  setResponseHeader(event, 'content-type', 'application/xml')
  return feed
})
