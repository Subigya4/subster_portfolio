import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import ContactForm from './ContactForm';
import { experience, formatDate, posts, projects, tools } from '@/lib/data';

const Arrow = () => (
  <span className="row__arrow" aria-hidden="true">
    <Icon name="arrowUpRight" />
  </span>
);

export function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <SectionHeading lines={['Recent', 'Projects']} />
      <ul className="list">
        {projects.map((p) => (
          <li className="reveal" key={p.slug}>
            <Link className="row row--project" href={`/projects/${p.slug}`}>
              <span className="row__thumb">
                <Image src={p.thumb} alt="" width={130} height={135} />
              </span>
              <span className="row__body">
                <span className="row__title">{p.title}</span>
                <span className="row__sub">{p.subtitle}</span>
              </span>
              <Arrow />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <SectionHeading lines={['3+ Years of', 'Experience']} />
      <ul className="list">
        {experience.map((job) => {
          const inner = (
            <>
              <span className="row__body">
                <span className="row__title">{job.company}</span>
                <span className="row__text">{job.description}</span>
                <span className="row__date">{job.period}</span>
              </span>
              <Arrow />
            </>
          );
          return (
            <li className="reveal" key={job.company}>
              {job.href ? (
                <a className="row row--exp" href={job.href} target="_blank" rel="noopener">
                  {inner}
                </a>
              ) : (
                <div className="row row--exp">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function ToolsSection() {
  return (
    <section id="tools" className="section">
      <SectionHeading lines={['Favorite', 'Tools']} />
      <ul className="tools">
        {tools.map((t) => (
          <li className="reveal" key={t.name}>
            <a className="tool" href={t.href} target="_blank" rel="noopener">
              <span className="tool__icon">
                <Image src={t.icon} alt="" width={30} height={30} />
              </span>
              <span className="tool__body">
                <span className="tool__title">{t.name}</span>
                <span className="tool__sub">{t.description}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ThoughtsSection() {
  return (
    <section id="thoughts" className="section">
      <SectionHeading lines={['Dev', 'Thoughts']} />
      <ul className="list">
        {posts.map((post) => (
          <li className="reveal" key={post.slug}>
            <Link className="row row--post" href={`/blog/${post.slug}`}>
              <span className="row__body">
                <span className="row__title">{post.title}</span>
                <span className="row__text">{post.excerpt}</span>
                <span className="row__meta">
                  <span>{formatDate(post.date)}</span>
                  <span>{post.readTime}</span>
                </span>
              </span>
              <Arrow />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="section">
      <SectionHeading lines={["Let's Work", 'Together']} />
      <ContactForm />
    </section>
  );
}
