// Skills bucketed by domain
const SKILL_GROUPS = [
  { label: 'languages', items: [
    { name: 'python', level: 5 }, { name: 'sql', level: 5 },
  ]},
  { label: 'data & warehouse', items: [
    { name: 'dbt', level: 5 }, { name: 'snowflake', level: 5 }, { name: 'duckdb', level: 5 },
    { name: 'postgres', level: 5 }, { name: 'aws s3', level: 4 },
  ]},
  { label: 'orchestration', items: [
    { name: 'airflow', level: 5 }, { name: 'dagster', level: 3 },
  ]},
  { label: 'infra & devops', items: [
    { name: 'docker', level: 4 }, { name: 'aws', level: 4 }, { name: 'github actions', level: 5 },
  ]},
  { label: 'AI & automation', items: [
    { name: 'openai api', level: 5 }, { name: 'langchain', level: 4 },
    { name: 'prompt eng.', level: 5 }, { name: 'zapier / n8n', level: 4 },
  ]},
];

function Skills() {
  return (
    <section id="skills" style={sk.section}>
      <div style={sk.container}>
        <h2 className="h2-bubbly" style={sk.h2}><span style={{color:'var(--accent)'}}>◆</span> Skills</h2>

        <div style={sk.grid}>
          {SKILL_GROUPS.map(g => (
            <div key={g.label} className="glow-card" style={sk.group}>
              <div style={sk.groupLabel}>{g.label}</div>
              <div style={sk.items}>
                {g.items.map(i => (
                  <div key={i.name} style={sk.row}>
                    <span style={sk.name}>{i.name}</span>
                    <span style={sk.dots}>
                      {[1,2,3,4,5].map(n => (
                        <span key={n} style={{
                          ...sk.dot,
                          background: n <= i.level ? 'var(--accent)' : 'var(--bg-3)',
                          boxShadow: n <= i.level ? '0 0 4px rgba(0,255,136,0.5)' : 'none',
                        }}/>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const sk = {
  section: { padding: '64px 0' },
  container: { maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 var(--gutter-desk)' },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 12 },
  h2: { fontFamily: 'var(--font-mono)', fontSize: 41, fontWeight: 500, letterSpacing: '-0.01em', marginBottom: 8 },
  subtitle: { fontFamily: 'Inter, sans-serif', fontSize: 17, color: 'var(--fg-2)', marginBottom: 32 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 },
  group: { background: 'var(--bg-1)', border: '1px solid var(--border-1)', borderRadius: 4, padding: 20 },
  groupLabel: {
    fontFamily: 'var(--font-mono)', fontSize: 13,
    letterSpacing: '0.08em', textTransform: 'uppercase',
    color: 'var(--accent)', marginBottom: 16, paddingBottom: 12,
    borderBottom: '1px solid var(--border-1)',
  },
  items: { display: 'flex', flexDirection: 'column', gap: 10 },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--fg-1)' },
  dots: { display: 'flex', gap: 4 },
  dot: { width: 6, height: 6, borderRadius: '50%' },
};

window.Skills = Skills;
