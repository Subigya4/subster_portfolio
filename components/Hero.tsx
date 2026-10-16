import Link from 'next/link';
import Icon from './Icon';
import { hero, skills, stats } from '@/lib/data';

// Decorative strokes drawn twice per card (second copy offset in CSS), as in the reference artwork
const DECO = {
  orange: {
    viewBox: '0 0 388 155',
    d: 'M 400.825 526.501 C 359.981 521.61 275.061 502.161 262.145 463.503 C 249.228 424.845 64.622 467.64 -26.068 493.869 L -1.845 151.05 C 71.348 136.783 216.884 99.23 213.496 63.159 C 209.26 18.069 245.759 11.716 307.691 18.653 C 369.624 25.591 361.774 9.523 393.416 2.626',
  },
  lime: {
    viewBox: '0 0 422 284',
    d: 'M 33.026 0.557 L 4.893 135.318 L 98.467 61.255 L 128.435 164.831 L 227.513 61.255 L 250.754 164.831 L 310.078 107.475 L 328.426 247.247 L 426.893 107.475 L 433.62 254.486 L 472.762 292.353',
  },
};

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__intro reveal">
        <h1 className="display">
          <span className="display__line">{hero.headline[0]}</span>
          <span className="display__line display__line--ghost">{hero.headline[1]}</span>
        </h1>
        <p className="lead">{hero.lead}</p>
      </div>

      <ul className="stats reveal" aria-label="Highlights">
        {stats.map((s) => (
          <li className="stat" key={s.value}>
            <span className="stat__value">{s.value}</span>
            <span className="stat__label">
              {s.label[0]}
              <br />
              {s.label[1]}
            </span>
          </li>
        ))}
      </ul>

      <div className="skill-cards reveal">
        {skills.map((card) => (
          <Link key={card.tone} className={`skill-card skill-card--${card.tone}`} href={card.href}>
            <svg className="skill-card__deco" viewBox={DECO[card.tone].viewBox} aria-hidden="true">
              <path d={DECO[card.tone].d} />
            </svg>
            <svg className="skill-card__deco skill-card__deco--2" viewBox={DECO[card.tone].viewBox} aria-hidden="true">
              <path d={DECO[card.tone].d} />
            </svg>
            <Icon name={card.icon} className="skill-card__icon" />
            <span className="skill-card__title">
              {card.title[0]}
              <br />
              {card.title[1]}
            </span>
            <span className="skill-card__arrow" aria-hidden="true">
              <Icon name="arrowRight" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
