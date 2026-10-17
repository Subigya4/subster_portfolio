import type { Metadata } from 'next';
import Link from 'next/link';
import PromptBox from './PromptBox';
import styles from './first.module.css';

/* Resources for people arriving from Reel 001 (comment "PROMPT"). */

const SITE = { name: '21st.dev', href: 'https://21st.dev/' };

const PLACEHOLDER = '[PASTE 21ST.DEV COMPONENT HERE]';

const PROMPT = `Act as an expert frontend engineer and award-winning UI/UX designer.
Analyze my existing website's design, tech stack, and structure.
I will provide a UI component from 21st.dev. Your task is to integrate it seamlessly into my existing website.
Preserve all existing functionality while adapting the component to my branding, typography, colors, and layout.
Make it fully responsive, accessible, and production-ready. Install any required dependencies, add smooth animations where appropriate, and ensure everything works correctly.
Avoid generic AI-generated designs. The result should look like a premium, professionally designed website.
Here is the component I want to use:
${PLACEHOLDER}`;

const DESCRIPTION = 'The secret website and AI prompt from my first reel.';

export const metadata: Metadata = {
  title: 'Reel 001 — You found it',
  description: DESCRIPTION,
  alternates: { canonical: '/first/' },
  openGraph: {
    title: 'You found it. 👀',
    description: DESCRIPTION,
    type: 'website',
    url: '/first/',
    images: [{ url: '/assets/og.png', width: 1200, height: 630 }],
  },
};

export default function FirstReelPage() {
  return (
    <main className="page page--sub">
      <article className="article">
        <Link className="back-link" href="/">
          ← Back to portfolio
        </Link>

        <header className="article__header">
          <p className="article__kicker">SUBSTER / REEL 001</p>
          <h1 className="article__title">You found it. 👀</h1>
          <p className={styles.subtitle}>Here&apos;s everything I promised.</p>
        </header>

        <div className={styles.resources}>
          <section className={`${styles.card} reveal`} aria-labelledby="secret-website">
            <p className={styles.eyebrow}>01</p>
            <h2 id="secret-website" className={styles.heading}>
              Secret Website
            </h2>
            <p className={styles.site}>{SITE.name}</p>
            <p className={styles.text}>
              Community-made UI components for React and Tailwind. Pick one you love, then use the prompt below to add
              it to your site.
            </p>
            <a className={`btn btn--inline ${styles.cta}`} href={SITE.href} target="_blank" rel="noopener noreferrer">
              Visit Website ↗
            </a>
          </section>

          <section className={`${styles.card} reveal`} aria-labelledby="secret-prompt">
            <p className={styles.eyebrow}>02</p>
            <h2 id="secret-prompt" className={styles.heading}>
              Secret AI Prompt
            </h2>
            <p className={styles.text}>
              Paste your 21st.dev component where marked, then give the whole prompt to your AI coding assistant.
            </p>
            <PromptBox prompt={PROMPT} placeholder={PLACEHOLDER} />
          </section>
        </div>
      </article>
    </main>
  );
}
