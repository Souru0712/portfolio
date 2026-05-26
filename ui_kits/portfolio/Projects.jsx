// Projects grid — data fetched from /api/pinned-repos (GitHub pinned repositories)
const { useState: useStateProj, useEffect: useEffectProj } = React;

const FALLBACK_PROJECTS = [
  {
    id: 1, num: '01',
    name: 'mta-subway-reliability-tracker',
    status: 'live',
    blurb: 'Tracks and analyzes NYC MTA subway reliability metrics with automated data pipelines.',
    stack: ['python', 'sql', 'data-engineering'],
    demo: null,
    repo: 'https://github.com/Souru0712/MTA-subway-reliability-tracker',
  },
  {
    id: 2, num: '02',
    name: 'nyc-311-service-equity',
    status: 'live',
    blurb: 'Dashboard analyzing NYC 311 service request equity across city boroughs.',
    stack: ['python', 'streamlit', 'sql'],
    demo: 'https://nyc-311-service-equity.streamlit.app/',
    repo: 'https://github.com/Souru0712/NYC-311-service-equity',
  },
  {
    id: 3, num: '03',
    name: 'inventory-management',
    status: 'live',
    blurb: 'Docker-orchestrated system for automatic inventory management and sales reporting.',
    stack: ['python', 'docker', 'airflow'],
    demo: null,
    repo: 'https://github.com/Souru0712/Inventory_Management',
  },
  {
    id: 4, num: '04',
    name: 'vitals-realtime-datastream',
    status: 'live',
    blurb: 'Real-time vitals data streaming pipeline using event-driven architecture.',
    stack: ['python', 'kafka', 'streaming'],
    demo: null,
    repo: 'https://github.com/Souru0712/Vitals-Realtime-Datastream',
  },
  {
    id: 5, num: '05',
    name: 'local-buzz-event-awareness',
    status: 'wip',
    blurb: 'ETL pipeline for aggregating and surfacing local event awareness data.',
    stack: ['python', 'etl', 'data-engineering'],
    demo: null,
    repo: 'https://github.com/Souru0712/Local-buzz-event-awareness',
  },
  {
    id: 6, num: '06',
    name: 'reddit-posts-engineering',
    status: 'live',
    blurb: 'Data engineering pipeline for ingesting and analyzing Reddit posts at scale.',
    stack: ['python', 'reddit-api', 'etl'],
    demo: null,
    repo: 'https://github.com/Souru0712/Reddit_Posts_Engineering',
  },
];

function Projects() {
  const [projects, setProjects] = useStateProj([]);
  const [filter, setFilter] = useStateProj('all');
  const [loading, setLoading] = useStateProj(true);
  const [error, setError] = useStateProj(null);

  useEffectProj(() => {
    fetch('/api/pinned-repos')
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => {
        setProjects(data && data.length > 0 ? data : FALLBACK_PROJECTS);
        setLoading(false);
      })
      .catch(() => { setProjects(FALLBACK_PROJECTS); setLoading(false); });
  }, []);

  const allTags = ['all', ...new Set(projects.flatMap(p => p.stack))];
  const filtered = filter === 'all' ? projects : projects.filter(p => p.stack.includes(filter));

  return (
    <section id="projects" style={projStyles.section}>
      <div style={projStyles.container}>
        <h2 className="h2-bubbly" style={projStyles.h2}><span style={{color:'var(--accent)'}}>◆</span> Projects</h2>

        {!loading && !error && (
          <div style={projStyles.filters}>
            <span style={projStyles.filterLabel}>filter:</span>
            {allTags.map(t => (
              <button key={t} onClick={() => setFilter(t)} style={{
                ...projStyles.filterBtn,
                color: filter === t ? 'var(--accent)' : 'var(--fg-2)',
                borderColor: filter === t ? 'var(--accent)' : 'var(--border-1)',
              }}>{t}</button>
            ))}
          </div>
        )}

        {loading && <div style={projStyles.status}>loading projects…</div>}

        <div style={projStyles.grid}>
          {filtered.map(p => <ProjectCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }) {
  const [hover, setHover] = useStateProj(false);
  const statusColor = p.status === 'live' ? 'var(--accent)' : p.status === 'wip' ? 'var(--warning)' : 'var(--fg-3)';
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="glow-card"
      style={{...projStyles.card, borderColor: hover ? 'var(--accent)' : 'var(--border-1)'}}
    >
      <div style={projStyles.cardHead}>
        <div>
          <div style={projStyles.cardNum}>{p.num} · project</div>
          <div style={projStyles.cardName}>{p.name}</div>
        </div>
        <span style={{...projStyles.status, color: statusColor, borderColor: statusColor}}>
          <span style={{
            width: 5, height: 5, borderRadius: '50%', background: statusColor,
            display: 'inline-block', boxShadow: p.status === 'live' ? `0 0 6px ${statusColor}` : 'none',
          }}/>
          {p.status.toUpperCase()}
        </span>
      </div>
      <div style={projStyles.cardBlurb}>{p.blurb}</div>
      <div style={projStyles.tags}>
        {p.stack.map(s => <span key={s} style={projStyles.tag}>{s}</span>)}
      </div>
      <div style={projStyles.links}>
        {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" style={projStyles.link}>↗ live demo</a>}
        {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" style={projStyles.link}>↗ github</a>}
      </div>
    </div>
  );
}

const projStyles = {
  section: { padding: '64px 0' },
  container: { maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 var(--gutter-desk)' },
  h2: { fontFamily: 'var(--font-mono)', fontSize: 41, fontWeight: 500, letterSpacing: '-0.01em', marginBottom: 8 },
  filters: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' },
  filterLabel: { fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--fg-3)', marginRight: 4 },
  filterBtn: {
    fontFamily: 'var(--font-mono)', fontSize: 14, padding: '4px 10px',
    background: 'transparent', border: '1px solid var(--border-1)',
    borderRadius: 2, cursor: 'pointer', transition: 'all 140ms var(--ease-out)',
  },
  status: { fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--fg-3)', marginBottom: 24 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 },
  card: {
    background: 'var(--bg-1)', border: '1px solid var(--border-1)',
    borderRadius: 4, padding: 20, display: 'flex', flexDirection: 'column', gap: 12,
    transition: 'border-color 140ms var(--ease-out)',
  },
  cardHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
  cardNum: { fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 },
  cardName: { fontFamily: 'var(--font-mono)', fontSize: 21, fontWeight: 500, color: 'var(--fg-1)' },
  status: {
    fontFamily: 'var(--font-mono)', fontSize: 12, padding: '2px 8px',
    border: '1px solid', borderRadius: 2, display: 'inline-flex', alignItems: 'center', gap: 6,
    flexShrink: 0, letterSpacing: '0.05em',
  },
  cardBlurb: { fontFamily: 'Inter, sans-serif', fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.55 },
  tags: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  tag: { fontFamily: 'var(--font-mono)', fontSize: 13, padding: '3px 8px', background: 'var(--bg-3)', color: 'var(--fg-2)', borderRadius: 2 },
  links: { display: 'flex', gap: 14, paddingTop: 8, borderTop: '1px solid var(--border-1)', marginTop: 4 },
  link: { fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--accent)', textDecoration: 'none' },
};

window.Projects = Projects;
