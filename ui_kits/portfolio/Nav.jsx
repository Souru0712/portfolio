// Sticky nav with active-section indicator
const { useState, useEffect } = React;

// Terminal-style mark: pixelated ">_" — chevron + underscore cursor.
function PixelLogo({ size = 24 }) {
  const grid = [
    [0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0],
    [1,1,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,1],
    [0,0,0,0,0,1,1,1],
  ];
  const cell = size / 8;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', flexShrink: 0 }}>
      {grid.flatMap((row, y) =>
        row.map((v, x) =>
          v ? <rect key={`${x}-${y}`} x={x * cell} y={y * cell} width={cell} height={cell} fill="var(--accent)" /> : null
        )
      )}
    </svg>
  );
}

function Nav() {
  const [active, setActive] = useState('about');
  const sections = [
    { id: 'about',    label: 'about me'},
    { id: 'projects', label: 'projects'},
    { id: 'skills',     label: 'skills'     },
    { id: 'experience', label: 'experience' },
    { id: 'resume',     label: 'resume'     },
    { id: 'contact',  label: 'contact' },
  ];

  useEffect(() => {
    const onScroll = () => {
      const offset = 120;
      let current = 'about';
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= offset) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
  };

  return (
    <nav style={navStyles.bar}>
      <div style={navStyles.inner}>
        <div className="brand" style={navStyles.brand} onClick={() => go('about')}>
          <PixelLogo />
          <span>Oscar Lam Ho</span>
        </div>
        <div className="nav-links" style={navStyles.links}>
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              style={{
                ...navStyles.link,
                color: active === s.id ? 'var(--accent)' : 'var(--fg-2)',
                borderBottom: active === s.id ? '1px solid var(--accent)' : '1px solid transparent',
              }}
            >{s.label}</button>
          ))}
        </div>
      </div>
    </nav>
  );
}

const navStyles = {
  bar: {
    position: 'sticky', top: 0, zIndex: 50,
    background: 'rgba(10,10,10,0.7)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--border-1)',
    height: 76,
  },
  inner: {
    maxWidth: 'var(--content-max)', margin: '0 auto',
    height: '100%', padding: '0 var(--gutter-desk)',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  brand: {
    fontFamily: 'var(--font-mono)', fontWeight: 700,
    fontSize: 28, letterSpacing: '-0.01em', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: 12,
  },
  links: { display: 'flex', gap: 28 },
  link: {
    fontFamily: 'var(--font-mono)', fontSize: 17,
    background: 'transparent', border: 'none', cursor: 'pointer',
    padding: '4px 0', transition: 'color 140ms var(--ease-out)',
  },
};

window.Nav = Nav;
