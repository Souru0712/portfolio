// Resume — quick stats + looking for (preview removed)
function Resume() {
  return (
    <section id="resume" style={rs.section}>
      <div style={rs.container}>
        <h2 className="h2-bubbly" style={rs.h2}><span style={{color:'var(--accent)'}}>◆</span> Resume</h2>

        <div style={rs.row}>
          <div className="glow-card" style={rs.sideCard}>
            <div style={rs.sideLabel}>quick stats</div>
            <div style={rs.statRow}><span style={rs.statK}>years coding</span><span style={rs.statV}>4</span></div>
            <div style={rs.statRow}><span style={rs.statK}>shipped end-to-end pipelines</span><span style={rs.statV}>4+</span></div>
            <div style={rs.statRow}><span style={rs.statK}>languages used</span><span style={rs.statV}>5</span></div>
            <div style={rs.statRow}><span style={rs.statK}>cups of coffee</span><span style={rs.statV}>∞</span></div>
          </div>
          <div className="glow-card" style={rs.sideCard}>
            <div style={rs.sideLabel}>looking for</div>
            <div style={rs.lookingFor}>full-time · remote-first · data engineering or data-related roles. <br/><br/>also open to consulting on S3/Snowflake + dbt + airflow setups.</div>
            <a
              href="assets/oscar_lam_ho_resume.pdf"
              download="Oscar_Lam_Ho_Junior_Data_Engineer.pdf"
              className="glow-btn"
              style={rs.download}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{marginRight:6}}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM12 11v5.5l2-2 1.4 1.4L12 19.3 8.6 15.9 10 14.5l2 2V11h0z"/>
              </svg>
              download resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const rs = {
  section: { padding: '64px 0' },
  container: { maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 var(--gutter-desk)' },
  h2: { fontFamily: 'var(--font-mono)', fontSize: 41, fontWeight: 500, letterSpacing: '-0.01em', marginBottom: 16 },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  sideCard: { background: 'transparent', border: '1px solid var(--border-1)', borderRadius: 6, padding: 20 },
  sideLabel: { fontFamily: "'Michroma', sans-serif", fontSize: 12, color: 'var(--fg-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 },
  statRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
    fontFamily: "'Michroma', sans-serif", fontSize: 13, padding: '8px 0',
    borderBottom: '1px solid var(--border-1)',
  },
  statK: { color: 'var(--fg-2)' },
  statV: { color: 'var(--accent)', fontWeight: 700 },
  lookingFor: { fontFamily: "'Michroma', sans-serif", fontSize: 13, color: 'var(--fg-1)', lineHeight: 1.7 },
  download: {
    marginTop: 18, alignSelf: 'flex-start', fontSize: 12,
  },
};

window.Resume = Resume;
