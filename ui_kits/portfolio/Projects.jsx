// Projects grid with tag filter
const { useState: useStateProj } = React;

const PROJECTS = [
  {
    id: 1, num: '01', name: 'supply-chain-pipeline', status: 'live',
    blurb: 'end-to-end supply chain data pipeline — ingests vendor feeds, normalizes SKUs, and lands clean fact tables for downstream analytics.',
    stack: ['python', 'airflow', 'snowflake', 'etl'],
    demo: null, repo: 'https://github.com/Souru0712',
  },
  {
    id: 2, num: '02', name: 'inventory-management', status: 'live',
    blurb: 'docker + airflow pipeline that automates inventory deduction and sales reporting against square POS. v2 cut dag runtime from 3min to 2min via batch api calls.',
    stack: ['python', 'airflow', 'docker', 'square-api'],
    demo: null, repo: 'https://github.com/Souru0712/Inventory_Management',
  },
];

const ALL_TAGS = ['all', 'python', 'airflow', 'docker', 'etl'];

function Projects() {
  const [filter, setFilter] = useStateProj('all');
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.stack.includes(filter));

  return (
    <section id="projects" style={projStyles.section}>
      <div style={projStyles.container}>
        <h2 className="h2-bubbly" style={projStyles.h2}><span style={{color:'var(--accent)'}}>◆</span> Projects</h2>

        <div style={projStyles.filters}>
          <span style={projStyles.filterLabel}>filter:</span>
          {ALL_TAGS.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{
              ...projStyles.filterBtn,
              color: filter === t ? 'var(--accent)' : 'var(--fg-2)',
              borderColor: filter === t ? 'var(--accent)' : 'var(--border-1)',
            }}>{t}</button>
          ))}
        </div>

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
        {p.demo && <a href={p.demo} style={projStyles.link}>↗ live demo</a>}
        {p.repo && <a href={p.repo} style={projStyles.link}>↗ github</a>}
      </div>
    </div>
  );
}

const projStyles = {
  section: { padding: '64px 0' },
  container: { maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 var(--gutter-desk)' },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 12 },
  h2: { fontFamily: 'var(--font-mono)', fontSize: 41, fontWeight: 500, letterSpacing: '-0.01em', marginBottom: 8 },
  subtitle: { fontFamily: 'Inter, sans-serif', fontSize: 17, color: 'var(--fg-2)', marginBottom: 32 },
  filters: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' },
  filterLabel: { fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--fg-3)', marginRight: 4 },
  filterBtn: {
    fontFamily: 'var(--font-mono)', fontSize: 14, padding: '4px 10px',
    background: 'transparent', border: '1px solid var(--border-1)',
    borderRadius: 2, cursor: 'pointer', transition: 'all 140ms var(--ease-out)',
  },
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
