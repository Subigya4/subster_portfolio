import Link from 'next/link';
import { site } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} <Link href="/#home">{site.name}</Link>. Designed &amp; built with care.
      </p>
    </footer>
  );
}
