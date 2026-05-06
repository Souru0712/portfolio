// Contact: methods + composer
const { useState: useStateContact } = React;

function Contact() {
  const [from, setFrom] = useStateContact('');
  const [msg, setMsg] = useStateContact('');
  const [sent, setSent] = useStateContact(false);
  const [sending, setSending] = useStateContact(false);
  const [error, setError] = useStateContact('');

  const send = (e) => {
    e.preventDefault();
    if (!from || !msg) return;
    setSending(true);
    setError('');
    emailjs.send('service_7hf43jq', 'template_5skb6tg', {
      from_email: from,
      message: msg,
    }).then(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => { setSent(false); setFrom(''); setMsg(''); }, 3500);
    }).catch(() => {
      setSending(false);
      setError('something went wrong — try emailing directly.');
    });
  };

  const methods = [
    { k: 'email',     v: 'oscarlam84@gmail.com',           href: 'mailto:oscarlam84@gmail.com' },
    { k: 'github',    v: 'github.com/Souru0712',           href: 'https://github.com/Souru0712' },
    { k: 'linkedin',  v: 'linkedin.com/in/oscarlam84',     href: 'https://www.linkedin.com/in/oscarlam84/' },
    { k: 'follow me on instagram!', v: 'instagram.com/souru.0712', href: 'https://www.instagram.com/souru.0712/' },
  ];

  return (
    <section id="contact" style={ct.section}>
      <div style={ct.container}>
        <h2 className="h2-bubbly" style={ct.h2}><span style={{color:'var(--accent)'}}>◆</span> Contact</h2>

        <div style={ct.row}>
          <div style={ct.methods}>
            {methods.map(m => (
              <a key={m.k} href={m.href} className="glow-card method" style={ct.method}>
                <span style={ct.methodK}>{m.k}</span>
                <span style={ct.methodV}>{m.v} <span style={{color:'var(--accent)'}}>↗</span></span>
              </a>
            ))}
          </div>

          <form onSubmit={send} style={ct.form}>
            {!sent ? (
              <>
                <input
                  value={from}
                  onChange={e => setFrom(e.target.value)}
                  placeholder="your email"
                  style={ct.input}
                />
                <textarea
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  placeholder="what are you working on?"
                  rows={5}
                  style={ct.textarea}
                />
                <button type="submit" className="send-btn" style={ct.send} disabled={sending}>
                  {sending ? 'sending…' : 'send →'}
                </button>
                {error && <div style={{fontFamily:'var(--font-mono)', fontSize:13, color:'var(--error)'}}>{error}</div>}
              </>
            ) : (
              <div style={ct.success}>
                <div style={{color:'var(--accent)'}}>message sent.</div>
                <div style={{color:'var(--fg-2)', marginTop:8}}>I'll reply within ~24h.</div>
              </div>
            )}
          </form>
        </div>

        <footer style={ct.footer}>
          <div>© 2026 oscar · built with html, react, and far too much coffee</div>
        </footer>
      </div>
    </section>
  );
}

const ct = {
  section: { padding: '64px 0 32px' },
  container: { maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 var(--gutter-desk)' },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 12 },
  h2: { fontFamily: 'var(--font-mono)', fontSize: 41, fontWeight: 500, letterSpacing: '-0.01em', marginBottom: 8 },
  subtitle: { fontFamily: 'Inter, sans-serif', fontSize: 17, color: 'var(--fg-2)', marginBottom: 32, maxWidth: 560 },
  row: { display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 16 },
  methods: { display: 'flex', flexDirection: 'column', gap: 8 },
  method: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: 'var(--bg-1)', border: '1px solid var(--border-1)',
    borderRadius: 4, padding: '14px 18px', textDecoration: 'none',
    fontFamily: 'var(--font-mono)', fontSize: 15,
  },
  methodK: { color: 'var(--fg-3)', letterSpacing: '0.05em' },
  methodV: { color: 'var(--fg-1)' },
  form: { background: '#f4f4f1', border: '1px solid var(--border-1)', borderRadius: 4, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 },
  formLabel: { fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 },
  input: {
    fontFamily: 'var(--font-mono)', fontSize: 16, background: '#d9d9d6',
    border: '1px solid #b8b8b3', color: '#0a0a0a',
    padding: '10px 12px', borderRadius: 4, outline: 'none',
  },
  textarea: {
    fontFamily: 'var(--font-mono)', fontSize: 16, background: '#d9d9d6',
    border: '1px solid #b8b8b3', color: '#0a0a0a',
    padding: '10px 12px', borderRadius: 4, outline: 'none', resize: 'vertical',
  },
  send: {
    fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 500,
    padding: '12px 22px', borderRadius: 999,
    background: '#d9d9d6', color: '#0a0a0a',
    border: '1px solid #b8b8b3', cursor: 'pointer', alignSelf: 'flex-start',
  },
  success: { padding: 20, fontFamily: 'var(--font-mono)', fontSize: 16 },
  footer: {
    marginTop: 64, paddingTop: 24, borderTop: '1px solid var(--border-1)',
    display: 'flex', justifyContent: 'space-between',
    fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--fg-3)',
  },
};

window.Contact = Contact;
