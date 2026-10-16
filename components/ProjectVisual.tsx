import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { Project } from '@/lib/data';

type Props = { project: Project; variant: 'thumb' | 'cover'; priority?: boolean };

/** Project artwork: the brand logo on its tile background, or a plain image. */
export default function ProjectVisual({ project, variant, priority }: Props) {
  const { logo } = project;

  if (logo) {
    const style = {
      background: logo.background,
      '--logo-pad': variant === 'thumb' ? logo.thumbPadding : logo.coverPadding,
    } as CSSProperties;
    return (
      <span className="project-logo" style={style}>
        <Image
          src={logo.src}
          alt={variant === 'cover' ? `${project.title} logo` : ''}
          width={logo.width}
          height={logo.height}
          priority={priority}
        />
      </span>
    );
  }

  const src = variant === 'cover' ? (project.cover ?? project.thumb) : project.thumb;
  if (!src) return null;
  return variant === 'cover' ? (
    <Image src={src} alt={`${project.title} preview`} width={696} height={480} priority={priority} />
  ) : (
    <Image src={src} alt="" width={130} height={135} />
  );
}
