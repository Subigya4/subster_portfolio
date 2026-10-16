import type { Metadata } from 'next';
import Link from 'next/link';
import ProjectVisual from '@/components/ProjectVisual';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/data';

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.subtitle}`,
    description: `${project.title}: ${project.subtitle}`,
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { default: Body } = await import(`@/content/projects/${slug}.mdx`);

  return (
    <main className="page page--sub">
      <article className="article">
        <Link className="back-link" href="/#projects">
          ← Back to projects
        </Link>
        <header className="article__header">
          <p className="article__kicker">Project · {project.year}</p>
          <h1 className="article__title">{project.title}</h1>
          <p className="article__meta">{project.subtitle}</p>
          <ul className="tags" aria-label="Technologies">
            {project.tags.map((t) => (
              <li className="tag" key={t}>
                {t}
              </li>
            ))}
          </ul>
        </header>

        <div className="article__cover">
          <ProjectVisual project={project} variant="cover" priority />
        </div>

        {project.links && (project.links.live || project.links.source) && (
          <p className="article__links">
            {project.links.live && (
              <a className="btn btn--inline" href={project.links.live} target="_blank" rel="noopener">
                View live ↗
              </a>
            )}
            {project.links.source && (
              <a className="btn btn--inline btn--ghost" href={project.links.source} target="_blank" rel="noopener">
                Source code ↗
              </a>
            )}
          </p>
        )}

        <div className="prose">
          <Body />
        </div>
      </article>
    </main>
  );
}
