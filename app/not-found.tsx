import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="page page--sub">
      <article className="article">
        <h1 className="heading">
          <span className="heading__line">404</span>
          <span className="heading__line heading__line--ghost">Not found</span>
        </h1>
        <p className="lead">The page you are looking for does not exist.</p>
        <p>
          <Link className="back-link" href="/">
            ← Back home
          </Link>
        </p>
      </article>
    </main>
  );
}
