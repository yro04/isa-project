import emailjs from '@emailjs/browser';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { CustomCursor } from './components/CustomCursor';
import './styles/layout.css';
import './styles/sections.css';

function stripEnvValue(v: string | undefined): string {
  if (v == null) return '';
  let s = v.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

function readEmailJsEnv() {
  const publicKey = stripEnvValue(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  const serviceId = stripEnvValue(import.meta.env.VITE_EMAILJS_SERVICE_ID);
  const templateId = stripEnvValue(import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
  const configured = Boolean(publicKey && serviceId && templateId);
  return { publicKey, serviceId, templateId, configured };
}

const marqueeItems = [
  'Customer Success',
  'Coaching & L&D',
  'CX Consulting',
  'Remote-First',
  'C2 English',
  'People First',
  'Agent Enablement',
  'Bilingual EN & ES',
] as const;

function MarqueeTrack() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div className="marquee-track">
      {doubled.map((label, i) => (
        <span key={`${label}-${i}`} className="marquee-item">
          {label} <span className="marquee-dot" />
        </span>
      ))}
    </div>
  );
}

function ContactMail() {
  const { publicKey, serviceId, templateId, configured } = readEmailJsEnv();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    if (configured) {
      emailjs.init({ publicKey });
    }
  }, [configured, publicKey]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!message.trim() || sending) return;
      if (!configured) {
        setFeedback({
          kind: 'err',
          text: 'Add your EmailJS service ID and template ID to the environment, restart the dev server, then try again.',
        });
        return;
      }
      setSending(true);
      setFeedback(null);
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            subject: subject.trim() || 'Website inquiry',
            message: message.trim(),
            user_email: userEmail.trim(),
          },
          { publicKey },
        );
        setSubject('');
        setMessage('');
        setUserEmail('');
        setFeedback({ kind: 'ok', text: 'Message sent.' });
      } catch (err) {
        const text =
          err && typeof err === 'object' && 'text' in err && typeof (err as { text?: string }).text === 'string'
            ? (err as { text: string }).text
            : err instanceof Error
              ? err.message
              : 'Send failed. Check the browser console and EmailJS dashboard.';
        setFeedback({ kind: 'err', text });
      } finally {
        setSending(false);
      }
    },
    [configured, message, publicKey, sending, serviceId, subject, templateId, userEmail],
  );

  return (
    <div className="contact-mailbox">
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="contact-subject" className="contact-label">
          Subject <span className="contact-label-hint">(optional)</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          className="contact-input"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Collaboration, role, timeline"
          autoComplete="off"
          disabled={sending}
        />

        <label htmlFor="contact-user-email" className="contact-label contact-label-spaced">
          Your email <span className="contact-label-hint">(optional, for reply)</span>
        </label>
        <input
          id="contact-user-email"
          type="email"
          className="contact-input"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          disabled={sending}
        />

        <label htmlFor="contact-message" className="contact-label contact-label-spaced">
          Message
        </label>
        <textarea
          id="contact-message"
          className="contact-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here…"
          rows={6}
          spellCheck
          required
          disabled={sending}
        />

        <div className="contact-actions">
          <button type="submit" className="btn-cream" disabled={!message.trim() || sending || !configured}>
            {sending ? 'Sending…' : 'Send email'}
          </button>
          <a href="https://linkedin.com/in/isabellagora" className="btn-white-outline" target="_blank" rel="noreferrer">
            LinkedIn profile
          </a>
        </div>
      </form>

      {feedback ? (
        <p className={`contact-status ${feedback.kind === 'ok' ? 'contact-status--ok' : 'contact-status--err'}`} role="status">
          {feedback.text}
        </p>
      ) : null}
    </div>
  );
}

export default function App() {
  return (
    <>
      <CustomCursor />

      <nav>
        <a href="#" className="nav-logo">
          Isabella <span>Gomez</span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#contact" className="nav-cta">
              Work with me
            </a>
          </li>
        </ul>
      </nav>

      <div className="hero">
        <div className="hero-bg-text">PEOPLE FIRST</div>
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-tag">Available for remote engagements</div>
            <h1 className="hero-name">
              Isabella
              <em>Gomez.</em>
            </h1>
            <p className="hero-desc">
              Customer Success, CX & Learning professional helping global teams build better relationships — with their
              customers and with each other.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn-red">
                Work with me →
              </a>
              <a href="#services" className="btn-outline">
                See my services
              </a>
            </div>
          </div>
          <div className="hero-right">
            <div className="stat-card">
              <div className="stat-num">10+</div>
              <div className="stat-info">
                <strong>Years in CX & Customer Success</strong>
                <span>Across support, coaching, sales & consulting</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-num">40+</div>
              <div className="stat-info">
                <strong>Agents coached per month</strong>
                <span>Post-training field effectiveness, Scotiabank</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-num">C2</div>
              <div className="stat-info">
                <strong>English proficiency</strong>
                <span>EF SET certified — fluent across all contexts</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-num">3</div>
              <div className="stat-info">
                <strong>Continents served</strong>
                <span>North America, Europe & Latin America</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="marquee-strip">
        <MarqueeTrack />
      </div>

      <section className="services" id="services">
        <div className="services-header">
          <div>
            <div className="eyebrow">What I offer</div>
            <h2 className="section-title">
              Three ways I can <em>help you.</em>
            </h2>
          </div>
          <p className="services-sub">
            Whether you need someone to manage your customer relationships, develop your support team, or improve your
            CX processes — I bring over a decade of hands-on experience in remote, international environments. TESTYING
          </p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <span className="service-num">01</span>
            <h3 className="service-title">Customer Success & Retention</h3>
            <div className="service-rule" />
            <p className="service-desc">
              I build genuine, lasting relationships with your clients — managing the full customer journey from
              onboarding to renewal, reducing churn, and making sure your users feel supported at every touchpoint. Hola como estas????
            </p>
            <div className="service-tags">
              <span className="tag">Account management</span>
              <span className="tag">Onboarding</span>
              <span className="tag">Retention</span>
              <span className="tag">Multi-channel support</span>
            </div>
          </div>
          <div className="service-card">
            <span className="service-num">02</span>
            <h3 className="service-title">Coaching & Learning & Development</h3>
            <div className="service-rule" />
            <p className="service-desc">
              I take your agents from training into confident, effective production performance. Hands-on, individual —
              daily check-ins, personalised coaching plans, and structured improvement sessions for those who need extra
              support.
            </p>
            <div className="service-tags">
              <span className="tag">Agent enablement</span>
              <span className="tag">Performance coaching</span>
              <span className="tag">Field effectiveness</span>
              <span className="tag">L&D programmes</span>
            </div>
          </div>
          <div className="service-card">
            <span className="service-num">03</span>
            <h3 className="service-title">CX Consulting & Content</h3>
            <div className="service-rule" />
            <p className="service-desc">
              I help you find where your customer experience is breaking down and build processes that hold up at
              scale. I also produce support documentation, help center content, and bilingual copywriting in English and
              Spanish.
            </p>
            <div className="service-tags">
              <span className="tag">CX audits</span>
              <span className="tag">Process design</span>
              <span className="tag">Copywriting</span>
              <span className="tag">EN & ES content</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-left">
          <div className="eyebrow">About me</div>
          <h2 className="section-title">
            A decade of putting <em>people first.</em>
          </h2>
          <div className="about-body">
            <p>
              I&apos;ve spent the last ten years working at the intersection of customer experience and people
              development — across support, coaching, recruiting, logistics, and sales. The thread connecting all of
              it: understand what someone needs, and help them get there.
            </p>
            <p>
              I currently work in the cybersecurity sector in a customer success capacity, supporting a technically
              demanding client base. It&apos;s an environment that rewards precision, patience, and the ability to
              translate complexity into clarity.
            </p>
            <p>
              Earlier in my career at Scotiabank, I was promoted from Customer Service Representative to Field
              Effectiveness Coach — taking agents after formal training and making sure that transition into live
              production actually stuck.
            </p>
          </div>
        </div>
        <div className="about-right">
          <div className="highlight">
            <strong>Bilingual — C2 English, Native Spanish</strong>
            <span>
              EF SET certified. Comfortable working with clients and teams across North America, Europe, and Latin
              America.
            </span>
          </div>
          <div className="highlight">
            <strong>Remote-first since 2020</strong>
            <span>
              Fully distributed work across multiple time zones, managing international client relationships with
              autonomy and precision.
            </span>
          </div>
          <div className="highlight">
            <strong>Coaching 20 to 40 agents per month</strong>
            <span>
              At Scotiabank, running personalised coaching plans and performance sessions for cohorts of new and
              underperforming agents.
            </span>
          </div>
          <div className="highlight">
            <strong>Cybersecurity & tech sector experience</strong>
            <span>
              Currently supporting technically complex products and high-trust client relationships in the cybersecurity
              industry.
            </span>
          </div>
        </div>
      </section>

      <section className="experience" id="experience">
        <div className="experience-header">
          <div>
            <div className="eyebrow">Career</div>
            <h2 className="section-title">
              Where I&apos;ve <em>done the work.</em>
            </h2>
          </div>
          <p className="services-sub">
            A decade of roles across industries — each one adding something different to how I think about customers,
            teams, and performance.
          </p>
        </div>
        <div className="timeline">
          <div className="tl-item featured">
            <div>
              <div className="tl-badge">Current role</div>
              <div className="tl-date">Nov 2022 — Present</div>
              <div className="tl-role">Customer Support Consultant</div>
              <div className="tl-company">SupportYourApp · Remote</div>
            </div>
            <p className="tl-desc">
              End-to-end support for international clients across chat and email, including escalation management,
              cross-functional coordination with dev teams, copywriting, and bilingual content production. Rejoined
              following a previous engagement — brought back based on performance and relationships built.
            </p>
          </div>

          <div className="tl-item featured">
            <div>
              <div className="tl-badge">Promoted internally</div>
              <div className="tl-date">Feb 2018 — Aug 2019</div>
              <div className="tl-role">Field Effectiveness Coach</div>
              <div className="tl-company">Scotiabank · Bogotá</div>
            </div>
            <p className="tl-desc">
              Post-training role bridging classroom and live production. Coached monthly cohorts of 20 to 40 agents
              through daily check-ins, individual coaching plans, and structured performance sessions. Promoted from
              Customer Service Representative within the same team.
            </p>
          </div>

          <div className="tl-item">
            <div className="tl-date">Jun 2022 — Oct 2022</div>
            <div className="tl-role">Talent Acquisition Specialist</div>
            <div className="tl-company">BairesDev · Remote</div>
            <p className="tl-desc">
              Candidate sourcing, assessment, and interview coordination for technical roles across LinkedIn, email, and
              phone.
            </p>
          </div>

          <div className="tl-item">
            <div className="tl-date">Jan 2022 — Jun 2022</div>
            <div className="tl-role">Track and Trace Specialist</div>
            <div className="tl-company">MoLo Solutions · Remote</div>
            <p className="tl-desc">
              Real-time freight tracking and issue resolution across carriers, dispatchers, and clients to ensure timely
              delivery.
            </p>
          </div>

          <div className="tl-item">
            <div className="tl-date">Oct 2020 — May 2021</div>
            <div className="tl-role">Customer Support Consultant</div>
            <div className="tl-company">SupportYourApp · Remote</div>
            <p className="tl-desc">
              First engagement — high-volume multi-channel support for international clients. Rehired in 2022 based on
              performance.
            </p>
          </div>

          <div className="tl-item">
            <div className="tl-date">Sep 2019 — Dec 2021</div>
            <div className="tl-role">Sales Associate</div>
            <div className="tl-company">Celebrity Cruises & Norwegian Cruise Line</div>
            <p className="tl-desc">
              Consultative sales and customer engagement for cruise travel packages across a diverse international
              clientele.
            </p>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="eyebrow">Get in touch</div>
        <h2 className="section-title">
          Ready to work <em>together?</em>
        </h2>
        <p className="contact-sub">
          I&apos;m open to remote engagements in Customer Success, CX Consulting, and Learning & Development with
          international teams. Let&apos;s talk.
        </p>
        <ContactMail />
      </section>

      <footer>
        <a href="#" className="footer-logo">
          Isabella <span>Gomez</span>
        </a>
        <span className="footer-note">Customer Success · CX · Learning & Development · Remote</span>
      </footer>
    </>
  );
}
