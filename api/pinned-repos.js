export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'GITHUB_TOKEN not configured' });
  }

  const query = `{
    user(login: "Souru0712") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            primaryLanguage { name }
            repositoryTopics(first: 10) {
              nodes { topic { name } }
            }
          }
        }
      }
    }
  }`;

  const ghRes = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!ghRes.ok) {
    return res.status(502).json({ error: 'GitHub API error', status: ghRes.status });
  }

  const { data, errors } = await ghRes.json();
  if (errors) {
    return res.status(502).json({ error: errors[0].message });
  }

  const repos = data.user.pinnedItems.nodes.map((repo, i) => {
    const topics = repo.repositoryTopics.nodes.map(n => n.topic.name.toLowerCase());
    const lang = repo.primaryLanguage ? repo.primaryLanguage.name.toLowerCase() : null;
    const stack = [...new Set([...(lang ? [lang] : []), ...topics])];

    return {
      id: i + 1,
      num: String(i + 1).padStart(2, '0'),
      name: repo.name.toLowerCase().replace(/_/g, '-'),
      status: 'live',
      blurb: repo.description || '',
      stack,
      demo: repo.homepageUrl || null,
      repo: repo.url,
    };
  });

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.status(200).json(repos);
}
