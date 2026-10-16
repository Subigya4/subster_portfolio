import Link from 'next/link';
import Icon from './Icon';
import { navItems } from '@/lib/data';

export default function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      {navItems.map((item) => (
        <Link
          key={item.section}
          href={item.href}
          className="nav__link"
          data-tip={item.label}
          data-section={item.section}
          aria-label={item.label}
        >
          <Icon name={item.icon} />
        </Link>
      ))}
    </nav>
  );
}
