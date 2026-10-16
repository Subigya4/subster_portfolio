'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Progressive-enhancement behaviours, re-run on every route change:
 *  - scroll reveal for `.reveal` elements (staggered per batch that enters together)
 *  - active state for the pill nav while scrolling the home page
 *  - turns smooth scrolling on only after the first paint (html.is-ready)
 */
export default function ClientEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const cleanups: Array<() => void> = [];

    /* Smooth scrolling after load ------------------------------------- */
    const ready = requestAnimationFrame(() => root.classList.add('is-ready'));
    cleanups.push(() => cancelAnimationFrame(ready));

    /* Scroll reveal ---------------------------------------------------- */
    if (reduce || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    } else {
      // Safety net: IntersectionObserver always reports observed targets once
      // right away; if nothing arrives (broken/embedded environments), show all.
      let reported = false;
      const failsafe = window.setTimeout(() => {
        if (!reported) revealEls.forEach((el) => el.classList.add('is-visible'));
      }, 1500);
      cleanups.push(() => window.clearTimeout(failsafe));

      const observer = new IntersectionObserver(
        (entries) => {
          reported = true;
          entries
            .filter((entry) => entry.isIntersecting)
            .forEach((entry, i) => {
              const el = entry.target as HTMLElement;
              // stagger only the elements that enter together
              el.style.transitionDelay = `${Math.min(i * 60, 240)}ms`;
              el.classList.add('is-visible');
              observer.unobserve(el);
            });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
      );
      revealEls.forEach((el) => {
        if (!el.classList.contains('is-visible')) observer.observe(el);
      });
      cleanups.push(() => observer.disconnect());
    }

    /* Active nav link (home page only) --------------------------------- */
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav__link'));
    const sections = links
      .map((a) => document.getElementById(a.dataset.section || ''))
      .filter((s): s is HTMLElement => Boolean(s));

    const setActive = (id: string) => {
      links.forEach((a) => {
        const on = a.dataset.section === id;
        a.classList.toggle('is-active', on);
        if (on) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    };

    if (sections.length) {
      // The section whose top sits above a probe line ~40% down the viewport
      // (capped so tall windows and short sections still resolve sensibly).
      // Past the last nav section (the contact form) nothing is highlighted.
      const after = sections[sections.length - 1].nextElementSibling as HTMLElement | null;
      let ticking = false;
      const update = () => {
        ticking = false;
        const line = window.scrollY + Math.min(window.innerHeight * 0.4, 300);
        let id = sections[0].id;
        for (const s of sections) {
          if (s.getBoundingClientRect().top + window.scrollY <= line) id = s.id;
        }
        if (after && after.getBoundingClientRect().top + window.scrollY <= line) id = '';
        setActive(id);
      };
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      };
      update();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      window.addEventListener('load', onScroll);
      document.fonts?.ready.then(onScroll).catch(() => undefined);
      cleanups.push(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        window.removeEventListener('load', onScroll);
      });
    } else {
      setActive('');
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
