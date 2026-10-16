import Image from 'next/image';
import Icon from './Icon';
import { profile, site, socials } from '@/lib/data';

export default function ProfileCard() {
  return (
    <div className="profile-card reveal">
      <svg className="profile-card__arc profile-card__arc--top" viewBox="0 0 194 83" aria-hidden="true">
        <path d="M0 17 A97 66 0 0 0 194 17" />
      </svg>
      <svg className="profile-card__arc profile-card__arc--bottom" viewBox="0 0 130 100" aria-hidden="true">
        <path d="M0 95 A115 95 0 0 0 110 37" />
      </svg>

      {/* Orange frame + transparent cut-out; the head pops slightly above the frame */}
      <div className="profile-card__photo">
        <div className="profile-card__cutout">
          <Image
            src={profile.photo}
            alt={profile.photoAlt}
            width={profile.photoSize.width}
            height={profile.photoSize.height}
            sizes="340px"
            priority
          />
        </div>
      </div>

      <div className="profile-card__body">
        <div className="profile-card__head">
          {/* <p>, not a heading: the page's h1 is the hero title and this card precedes it */}
          <p className="profile-card__name">{site.name}</p>
          <span className="profile-card__badge" aria-hidden="true">
            <Icon name="flame" />
          </span>
        </div>
        <div className="profile-card__meta">
          <p className="profile-card__bio">{profile.bio}</p>
          <ul className="socials" aria-label="Social links">
            {socials.map((s) => {
              const external = s.href.startsWith('http');
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    {...(external ? { target: '_blank', rel: 'noopener' } : {})}
                  >
                    <Icon name={s.icon} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
