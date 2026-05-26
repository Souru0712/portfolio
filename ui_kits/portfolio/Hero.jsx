// About-me hero — SQL editor with CTE script + result table + sidebar
const { useState: useStateHero, useEffect: useEffectHero } = React;

// 5x7 pixel font — uppercase
const PIXEL_FONT = {
  A: ["01110","10001","10001","11111","10001","10001","10001"],
  C: ["01111","10000","10000","10000","10000","10000","01111"],
  D: ["11110","10001","10001","10001","10001","10001","11110"],
  E: ["11111","10000","10000","11110","10000","10000","11111"],
  F: ["11111","10000","10000","11110","10000","10000","10000"],
  G: ["01110","10001","10000","10111","10001","10001","01110"],
  I: ["11111","00100","00100","00100","00100","00100","11111"],
  L: ["10000","10000","10000","10000","10000","10000","11111"],
  M: ["10001","11011","10101","10101","10001","10001","10001"],
  N: ["10001","11001","10101","10101","10101","10011","10001"],
  O: ["01110","10001","10001","10001","10001","10001","01110"],
  P: ["11110","10001","10001","11110","10000","10000","10000"],
  R: ["11110","10001","10001","11110","10100","10010","10001"],
  T: ["11111","00100","00100","00100","00100","00100","00100"],
  W: ["10001","10001","10001","10101","10101","11011","10001"],
  Y: ["10001","10001","01010","00100","00100","00100","00100"],
  '!': ["00100","00100","00100","00100","00100","00000","00100"],
  ' ': ["00000","00000","00000","00000","00000","00000","00000"],
};
function PixelText({ text, cell = 3, cellH, color = 'var(--accent)' }) {
  const chars = text.toUpperCase().split('');
  const charW = 5, charH = 7;
  const cw = cell;
  const ch = cellH || cell;
  const totalW = chars.length * (charW + 1) - 1;
  return (
    <svg width={totalW * cw} height={charH * ch}
      viewBox={`0 0 ${totalW * cw} ${charH * ch}`}
      style={{ flexShrink: 0, display: 'block' }}>
      {chars.map((ch_, ci) => {
        const grid = PIXEL_FONT[ch_] || PIXEL_FONT[' '];
        const xOff = ci * (charW + 1) * cw;
        return grid.flatMap((row, y) =>
          row.split('').map((v, x) =>
            v === '1' ? <rect key={`${ci}-${x}-${y}`} x={xOff + x * cw} y={y * ch} width={cw} height={ch} fill={color}/> : null
          )
        );
      })}
    </svg>
  );
}

// SQL color tokens
const SQL_KW   = 'var(--accent)';
const SQL_STR  = '#ffffff';
const SQL_CMT  = '#8D5BD0';

// Helpers for tokens
const kw  = (text) => ({ kind: 'kw', text });
const str = (text) => ({ kind: 'str', text });
const cmt = (text) => ({ kind: 'cmt', text });
const pl  = (text) => ({ kind: 'plain', text });

function Hero() {
  // Multi-CTE about query
  const script = [
    [kw('WITH'), pl(' core_identity '), kw('AS'), pl(' (')],
    [pl('    '), kw('SELECT')],
    [pl('        '), str("'Oscar'"), pl(' '), kw('AS'), pl(' name,')],
    [pl('        '), str("'Data Engineer in Progress'"), pl(' '), kw('AS'), pl(' role,')],
    [pl('        '), kw('ARRAY'), pl('['), str("'Python'"), pl(', '), str("'SQL'"), pl(', '), str("'dbt'"), pl(', '), str("'Airflow'"), pl(', '), str("'Spark'"), pl('] '), kw('AS'), pl(' tech_stack,')],
    [pl('        '), kw('ARRAY'), pl('['), str("'ETL Pipelines'"), pl(', '), str("'Data Modeling'"), pl(', '), str("'Streaming Concepts'"), pl('] '), kw('AS'), pl(' focus_areas,')],
    [pl('        '), str("'Builder of systems, not just scripts'"), pl(' '), kw('AS'), pl(' philosophy,')],
    [pl('        '), kw('ARRAY'), pl('['), str("'Love Coffee'"), pl(', '), str("'Sushi Crafter'"), pl(', '), str("'Latte Art Designer'"), pl(', '), str("'Ramen Enthusiast'"), pl('] '), kw('AS'), pl(' interests')],
    [pl('),')],
    [],
    [pl('personality_traits '), kw('AS'), pl(' (')],
    [pl('    '), kw('SELECT'), pl(' '), kw('ARRAY'), pl('[')],
    [pl('        '), str("'Curious'"), pl(',')],
    [pl('        '), str("'Resilient'"), pl(',')],
    [pl('        '), str("'Analytical'"), pl(',')],
    [pl('        '), str("'Self-Improving'")],
    [pl('    ] '), kw('AS'), pl(' traits')],
    [pl('),')],
    [],
    [pl('current_mission '), kw('AS'), pl(' (')],
    [pl('    '), kw('SELECT')],
    [pl('        '), str("'Design scalable data pipelines'"), pl(' '), kw('AS'), pl(' goal,')],
    [pl('        '), str("'Turn raw data into meaningful insights'"), pl(' '), kw('AS'), pl(' purpose,')],
    [pl('        '), str("'Continuously level up skills and discipline'"), pl(' '), kw('AS'), pl(' mindset,')],
    [pl('        '), str("'Meet for coffee and talk about tech, AI, food, or music'"), pl(' '), kw('AS'), pl(' plan')],
    [pl(')')],
    [],
    [kw('SELECT')],
    [pl('    c.name,')],
    [pl('    c.role,')],
    [pl('    c.tech_stack,')],
    [pl('    c.focus_areas,')],
    [pl('    c.philosophy,')],
    [pl('    p.traits,')],
    [pl('    m.goal,')],
    [pl('    m.purpose,')],
    [pl('    m.mindset')],
    [kw('FROM'), pl(' core_identity c')],
    [kw('JOIN'), pl(' personality_traits p '), kw('ON'), pl(' '), kw('TRUE')],
    [kw('JOIN'), pl(' current_mission m '), kw('ON'), pl(' '), kw('TRUE'), pl(';')],
  ];

  const totalChars = script.reduce((acc, line) =>
    acc + line.reduce((a, t) => a + (t.kind === 'autocomplete' ? 1 : t.text.length), 0), 0);

  // Speed: type fast so the long script finishes in ~6-8s
  const [progress, setProgress] = useStateHero(0);
  const [showResult, setShowResult] = useStateHero(false);

  useEffectHero(() => {
    if (progress >= totalChars) {
      const t = setTimeout(() => setShowResult(true), 300);
      return () => clearTimeout(t);
    }
    // Step many characters per tick to keep total time short
    const step = 6;
    const t = setTimeout(() => setProgress(p => Math.min(p + step, totalChars)), 14);
    return () => clearTimeout(t);
  }, [progress]);

  const renderLines = () => {
    let remaining = progress;
    const out = [];
    for (let li = 0; li < script.length; li++) {
      const line = script[li];
      if (line.length === 0) { out.push(<div key={li} style={{height:'1.4em'}}/>); continue; }
      const parts = [];
      let lineDone = true;
      for (let ti = 0; ti < line.length; ti++) {
        const tok = line[ti];
        if (tok.kind === 'autocomplete') {
          if (remaining > 0) { remaining -= 1; parts.push(<AutocompleteToken key={`${li}-${ti}`} />); }
          else { lineDone = false; break; }
          continue;
        }
        if (remaining <= 0) { lineDone = false; break; }
        const slice = tok.text.slice(0, remaining);
        remaining -= slice.length;
        const color = tok.kind === 'kw' ? SQL_KW : tok.kind === 'cmt' ? SQL_CMT : SQL_STR;
        const weight = tok.kind === 'kw' ? 700 : 400;
        parts.push(<span key={`${li}-${ti}`} style={{color, fontWeight: weight}}>{slice}</span>);
        if (slice.length < tok.text.length) { lineDone = false; break; }
      }
      out.push(
        <div key={li} style={heroStyles.sqlLine}>
          <span style={heroStyles.lineNum}>{String(li+1).padStart(2,' ')}</span>
          <span style={heroStyles.lineContent}>
            {parts}
            {!lineDone && progress < totalChars && <span className="cursor" style={heroStyles.cursor}/>}
          </span>
        </div>
      );
      if (!lineDone) break;
    }
    return out;
  };

  return (
    <section id="about" style={heroStyles.section}>
      <div style={heroStyles.container}>
        <div style={heroStyles.hintRow}>
          <div style={heroStyles.musicHint}>
            <em>* click the page to play song *</em><br/>
            <em>End of Beginning (Instrumental) by Djo</em>
          </div>
          <div style={heroStyles.welcomeWrap}>
          </div>
        </div>
        <h2 className="h2-bubbly" style={heroStyles.h2}>
          <span style={{color:'var(--accent)'}}>◆</span> About me
        </h2>

        <div style={heroStyles.aboutRow}>
          {/* Side taskbar */}
          <aside style={heroStyles.sidebar}>
            <SideIcon
              href="https://github.com/Souru0712"
              label="GitHub"
              external
              path="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1-.02-1.96-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"
            />
            <SideIcon
              href="https://www.linkedin.com/in/oscarlam84/"
              label="LinkedIn"
              external
              path="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"
            />
            {/* Document / Resume download */}
            <SideIcon
              href="assets/oscar_lam_ho_resume.pdf"
              label="Download resume"
              download="Oscar_Lam_Ho_Junior_Data_Engineer.pdf"
              path="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM7 14h10v2H7v-2zm0 4h7v2H7v-2z"
            />
          </aside>

          {/* SQL editor + result */}
          <div style={{display:'flex', flexDirection:'column', gap:16, minWidth:0}}>
            <div style={heroStyles.editor}>
              <div style={heroStyles.editorBar}>
                <div style={{...heroStyles.dot, background:'#ff5577'}}/>
                <div style={{...heroStyles.dot, background:'#ffb84d'}}/>
                <div style={{...heroStyles.dot, background:'#00ff88'}}/>
                <span style={heroStyles.editorTitle}>about.sql — postgres</span>
              </div>
              <div style={heroStyles.editorBody}>
                {renderLines()}
              </div>
            </div>

            {/* Result table + profile photo on the right */}
            <div style={{display:'grid', gridTemplateColumns:'1fr 220px', gap:16, alignItems:'stretch'}}>
              <div style={{...heroStyles.editor, opacity: showResult ? 1 : 0.35, transition:'opacity 400ms ease'}}>
                <div style={heroStyles.editorBar}>
                  <div style={{...heroStyles.dot, background:'#ff5577'}}/>
                  <div style={{...heroStyles.dot, background:'#ffb84d'}}/>
                  <div style={{...heroStyles.dot, background:'#00ff88'}}/>
                  <span style={heroStyles.editorTitle}>result · 1 row · {showResult ? '0.042s' : '—'}</span>
                </div>
                <ResultTable />
              </div>
              <div className="glow-card" style={{
                borderRadius: 6, overflow: 'hidden', border: '1px solid var(--border-1)',
                aspectRatio: '1 / 1', alignSelf: 'start',
              }}>
                <img src="assets/profile.jpg" alt="Oscar Lam Ho"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>

            {/* Contact autocomplete in its own window */}
            <div style={heroStyles.editor}>
              <div style={heroStyles.editorBar}>
                <div style={{...heroStyles.dot, background:'#ff5577'}}/>
                <div style={{...heroStyles.dot, background:'#ffb84d'}}/>
                <div style={{...heroStyles.dot, background:'#00ff88'}}/>
                <span style={heroStyles.editorTitle}>let's meet for coffee!</span>
              </div>
              <div style={{...heroStyles.editorBody, minHeight: 220, paddingBottom: 200}}>
                <div style={heroStyles.sqlLine}>
                  <span style={heroStyles.lineNum}> 1</span>
                  <span style={heroStyles.lineContent}>
                    <AutocompleteToken />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultTable() {
  const cols = [
    { k: 'name',         v: 'Oscar' },
    { k: 'role',         v: 'Data Engineer in Progress' },
    { k: 'tech_stack',   v: '{Python, SQL, dbt, Airflow, Spark}' },
    { k: 'focus_areas',  v: '{ETL Pipelines, Data Modeling, Streaming Concepts}' },
    { k: 'philosophy',   v: 'Builder of systems, not just scripts' },
    { k: 'traits',       v: '{Curious, Resilient, Analytical, Self-Improving}' },
    { k: 'goal',         v: 'Design scalable data pipelines' },
    { k: 'purpose',      v: 'Turn raw data into meaningful insights' },
    { k: 'mindset',      v: 'Continuously level up skills and discipline' },
  ];
  return (
    <div style={rt.wrap}>
      <table style={rt.table}>
        <thead>
          <tr>
            {cols.map(c => <th key={c.k} style={rt.th}>{c.k}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            {cols.map(c => <td key={c.k} style={rt.td}>{c.v}</td>)}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const rt = {
  wrap: { overflow: 'auto', padding: 0 },
  table: {
    width: '100%', borderCollapse: 'collapse',
    fontFamily: "'Michroma', monospace", fontSize: 11,
  },
  th: {
    padding: '10px 12px', textAlign: 'left',
    color: SQL_KW, fontWeight: 700, letterSpacing: '0.05em',
    borderBottom: '1px solid var(--border-1)',
    borderRight: '1px solid var(--border-1)',
    background: 'rgba(0,255,136,0.06)',
    whiteSpace: 'nowrap',
  },
  td: {
    padding: '10px 12px', verticalAlign: 'top',
    color: 'var(--fg-1)',
    borderBottom: '1px solid var(--border-1)',
    borderRight: '1px solid var(--border-1)',
    fontSize: 11, lineHeight: 1.6,
    minWidth: 140, maxWidth: 280,
  },
};

function SideIcon({ href, label, path, download, external }) {
  const props = {
    href, 'aria-label': label, title: label,
    className: 'glow-card', style: sideStyles.iconBtn,
  };
  if (download) props.download = download;
  if (external) { props.target = '_blank'; props.rel = 'noopener'; }
  return (
    <a {...props}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d={path}/>
      </svg>
    </a>
  );
}

const sideStyles = {
  iconBtn: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 56, height: 56,
    background: 'transparent', border: '1px solid var(--border-1)',
    borderRadius: 12, color: 'var(--fg-1)', cursor: 'pointer',
    textDecoration: 'none',
  },
};

function AutocompleteToken() {
  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
  };
  const items = [
    { name: 'Contact',   sub: 'jump to contact section', target: 'contact', active: true },
    { name: 'CASE',      sub: 'conditional expression' },
    { name: 'CAST',      sub: 'type conversion' },
    { name: 'CHECK',     sub: 'column constraint' },
    { name: 'COMMIT',    sub: 'persist transaction' },
    { name: 'CREATE',    sub: 'define a relation' },
  ];
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ color: SQL_KW, fontWeight: 700 }}>C</span>
      <span className="cursor" style={{ display:'inline-block', width:'0.55em', height:'1em', background:'var(--accent)', verticalAlign:'text-bottom', marginLeft:2 }}/>
      <div style={ac.popup}>
        {items.map((it) => (
          <div
            key={it.name}
            onClick={() => it.target && goTo(it.target)}
            style={{
              ...ac.item,
              ...(it.active ? ac.itemActive : null),
              cursor: it.target ? 'pointer' : 'default',
            }}
            onMouseEnter={(e) => { if (it.target) { e.currentTarget.style.background = 'rgba(0,255,136,0.18)'; }}}
            onMouseLeave={(e) => { if (it.target) { e.currentTarget.style.background = it.active ? 'rgba(0,255,136,0.22)' : 'transparent'; }}}
          >
            <span style={ac.icon}>{it.target ? '↗' : 'C'}</span>
            <span style={ac.name}>{it.name}</span>
            <span style={ac.sub}>{it.sub}</span>
          </div>
        ))}
      </div>
    </span>
  );
}

const ac = {
  popup: {
    position: 'absolute', top: '1.6em', left: 0, zIndex: 5,
    minWidth: 320, padding: 6,
    background: 'rgba(20,20,20,0.96)',
    border: '1px solid rgba(0,255,136,0.45)',
    borderRadius: 6,
    boxShadow: '0 8px 28px rgba(0,0,0,0.5), 0 0 18px rgba(0,255,136,0.18)',
    fontFamily: "'Michroma', sans-serif", fontSize: 11,
  },
  item: {
    display: 'grid', gridTemplateColumns: '20px auto 1fr', gap: 10,
    alignItems: 'center', padding: '8px 10px', borderRadius: 4,
    color: '#cfcfcf', whiteSpace: 'nowrap',
  },
  itemActive: {
    background: 'rgba(0,255,136,0.22)',
    color: '#ffffff',
    boxShadow: 'inset 0 0 0 1px rgba(0,255,136,0.55)',
  },
  icon: { color: '#00ff88', fontSize: 11, textAlign: 'center' },
  name: { fontWeight: 700, letterSpacing: '0.04em' },
  sub:  { color: '#8a8a8a', fontSize: 10 },
};

const heroStyles = {
  section: { padding: '24px 0 64px' },
  container: { maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 var(--gutter-desk)' },
  h2: {
    fontFamily: 'var(--font-mono)', fontSize: 41, fontWeight: 500,
    letterSpacing: '-0.01em', marginBottom: 16, color: 'var(--fg-1)',
  },
  musicHint: {
    fontFamily: 'var(--font-mono)', fontSize: 14,
    color: '#cfcfcf', lineHeight: 1.6,
  },
  hintRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: 24, marginTop: 24, marginBottom: 24, flexWrap: 'wrap',
  },
  welcomeWrap: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    flex: 1, minWidth: 0,
  },
  aboutRow: {
    display: 'grid', gridTemplateColumns: '88px 1fr', gap: 16, alignItems: 'start',
  },
  sidebar: {
    display: 'flex', flexDirection: 'column', gap: 14,
    padding: 14,
    background: 'transparent',
    border: '1px solid var(--border-1)',
    borderRadius: 8,
    alignItems: 'center',
    position: 'sticky', top: 80,
  },
  editor: {
    background: 'transparent',
    border: '1px solid var(--border-1)',
    borderRadius: 6, overflow: 'visible', minWidth: 0,
  },
  editorBar: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '10px 14px',
    borderBottom: '1px solid var(--border-1)',
    background: 'transparent',
  },
  dot: { width: 10, height: 10, borderRadius: '50%' },
  editorTitle: {
    marginLeft: 12, fontFamily: "'Michroma', sans-serif",
    fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.06em',
  },
  editorBody: {
    padding: '24px 18px 28px',
    fontFamily: "'Michroma', 'JetBrains Mono', monospace",
    fontSize: 12, lineHeight: 2.0, minHeight: 280,
    overflow: 'auto',
    letterSpacing: '0.06em',
    wordSpacing: '0.4em',
  },
  sqlLine: {
    display: 'grid', gridTemplateColumns: '34px 1fr', gap: 18,
    whiteSpace: 'pre-wrap', alignItems: 'baseline',
    padding: '2px 0',
  },
  lineNum: {
    color: '#5a5a5a', textAlign: 'right',
    borderRight: '1px solid var(--border-1)', paddingRight: 8,
    fontSize: 10, userSelect: 'none',
  },
  lineContent: { color: SQL_STR, fontFamily: "'Michroma', monospace" },
  cursor: {
    display: 'inline-block', width: '0.5em', height: '1em',
    background: 'var(--accent)', verticalAlign: 'text-bottom', marginLeft: 2,
  },
};

window.Hero = Hero;
