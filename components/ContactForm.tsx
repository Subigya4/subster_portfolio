'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { budgetOptions, site } from '@/lib/data';

type Status = { kind: 'idle' | 'sending' | 'success' | 'error'; message: string };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle', message: '' });
  const [submitted, setSubmitted] = useState(false);
  // Progressive enhancement: native validation stays on until JS has hydrated.
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => setEnhanced(true), []);

  const sending = status.kind === 'sending';
  const hasEndpoint = Boolean(site.formEndpoint);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitted(true);

    if (!form.checkValidity()) {
      setStatus({ kind: 'error', message: 'Please fill in all fields with a valid email.' });
      form.querySelector<HTMLElement>(':invalid')?.focus();
      return;
    }

    const data = new FormData(form);

    if (!hasEndpoint) {
      // No backend configured: hand off to the visitor's email client.
      const subject = encodeURIComponent(`Project inquiry from ${data.get('name')}`);
      const body = encodeURIComponent(
        `Name: ${data.get('name')}\r\nEmail: ${data.get('email')}\r\nBudget: ${data.get('budget')}\r\n\r\n${data.get('message')}`,
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus({ kind: 'success', message: 'Opening your email app…' });
      return;
    }

    setStatus({ kind: 'sending', message: 'Sending…' });
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      form.reset();
      setStatus({ kind: 'success', message: 'Thanks! Your message has been sent — I will get back to you soon.' });
    } catch {
      setStatus({ kind: 'error', message: `Something went wrong. Please email ${site.email} instead.` });
    }
  }

  const statusClass =
    status.kind === 'success' ? 'form__status is-success' : status.kind === 'error' ? 'form__status is-error' : 'form__status';

  return (
    <form
      className={submitted ? 'form reveal was-submitted' : 'form reveal'}
      onSubmit={onSubmit}
      noValidate={enhanced}
      // Without JS the browser submits here: the real endpoint, or a mailto: draft.
      action={hasEndpoint ? site.formEndpoint : `mailto:${site.email}`}
      method="post"
      encType={hasEndpoint ? 'multipart/form-data' : 'text/plain'}
    >
      <div className="form__row">
        <label className="field">
          <span className="field__label">Name</span>
          <input
            className="field__input"
            type="text"
            name="name"
            placeholder="Your Name"
            required
            pattern=".*\S.*"
            title="Please enter your name"
            autoComplete="name"
          />
        </label>
        <label className="field">
          <span className="field__label">Email</span>
          <input className="field__input" type="email" name="email" placeholder="Your@email.com" required autoComplete="email" />
        </label>
      </div>
      <label className="field">
        <span className="field__label">Budget</span>
        <span className="select-wrap">
          <select className="field__input" name="budget" required defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {budgetOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </span>
      </label>
      <label className="field">
        <span className="field__label">Message</span>
        <textarea className="field__input field__input--area" name="message" placeholder="Message" rows={4} required />
      </label>
      <button className="btn" type="submit" disabled={sending}>
        {sending ? 'Sending…' : 'Submit'}
      </button>
      <p className={statusClass} role="status" aria-live="polite">
        {status.message}
      </p>
    </form>
  );
}
