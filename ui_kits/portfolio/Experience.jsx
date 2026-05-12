// Experience section
const EXPERIENCE = [
  {
    company: 'Luckin Coffee',
    location: 'New York, NY',
    title: 'Assistant Manager',
    start: 'Dec 2023',
    end: 'Apr 2026',
    bullets: [
      'Trained and onboarded 2 new hires per week by developing structured weekly training plans and delegating tasks to build team productivity.',
      'Analyzed 100+ drinks and modifications daily, tracking hourly cup counts and customer satisfaction metrics to optimize store performance.',
      'Managed inventory counts for 50+ raw products on a daily and weekly basis to minimize waste and maintain supply continuity.',
    ],
  },
];

function Experience() {
  return (
    <section id="experience" style={ex.section}>
      <div style={ex.container}>
        <h2 className="h2-bubbly" style={ex.h2}><span style={{color:'var(--accent)'}}>◆</span> Experience</h2>
        <p style={ex.subtitle}>nothing yet but coffee</p>

        <div style={ex.list}>
          {EXPERIENCE.map((job, i) => <ExperienceCard key={i} job={job} />)}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ job }) {
  const { useState: useStateEx } = React;
  const [hover, setHover] = useStateEx(false);
  return (
    <div
      className="glow-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{...ex.card, borderColor: hover ? 'var(--accent)' : 'var(--border-1)'}}
    >
      <div style={ex.cardHead}>
        <div>
          <div style={ex.company}>{job.company} <span style={ex.location}>· {job.location}</span></div>
          <div style={ex.title}>{job.title}</div>
        </div>
        <div style={ex.dates}>{job.start} – {job.end}</div>
      </div>
      <ul style={ex.bullets}>
        {job.bullets.map((b, i) => (
          <li key={i} style={ex.bullet}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

const ex = {
  section: { padding: '64px 0' },
  container: { maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 var(--gutter-desk)' },
  h2: { fontFamily: 'var(--font-mono)', fontSize: 41, fontWeight: 500, letterSpacing: '-0.01em', marginBottom: 8 },
  subtitle: { fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--fg-3)', marginBottom: 28, letterSpacing: '0.04em' },
  list: { display: 'flex', flexDirection: 'column', gap: 16 },
  card: {
    background: 'var(--bg-1)', border: '1px solid var(--border-1)',
    borderRadius: 4, padding: 24, display: 'flex', flexDirection: 'column', gap: 14,
    transition: 'border-color 140ms var(--ease-out)',
  },
  cardHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
  company: { fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500, color: 'var(--fg-1)', marginBottom: 4 },
  location: { fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--fg-3)', fontWeight: 400 },
  title: { fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--accent)', letterSpacing: '0.04em' },
  dates: { fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-3)', whiteSpace: 'nowrap', flexShrink: 0 },
  bullets: { margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 },
  bullet: { fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.6 },
};

window.Experience = Experience;
