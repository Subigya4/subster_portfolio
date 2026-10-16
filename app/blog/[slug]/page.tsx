import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatDate, posts } from '@/lib/data';

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article', publishedTime: post.date },
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const { default: Body } = await import(`@/content/posts/${slug}.mdx`);

  return (
    <main className="page page--sub">
      <article className="article">
        <Link className="back-link" href="/#thoughts">
          ← Back to thoughts
        </Link>
        <header className="article__header">
          <p className="article__kicker">Dev Thoughts</p>
          <h1 className="article__title">{post.title}</h1>
          <p className="article__meta">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </p>
        </header>
        <div className="prose">
          <Body />
        </div>
      </article>
    </main>
  );
}
