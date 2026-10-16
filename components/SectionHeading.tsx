type Props = { lines: [string, string]; as?: 'h1' | 'h2' };

/** Two-line, two-tone section title (second line ghosted) */
export default function SectionHeading({ lines, as: Tag = 'h2' }: Props) {
  return (
    <Tag className="heading reveal">
      <span className="heading__line">{lines[0]}</span>
      <span className="heading__line heading__line--ghost">{lines[1]}</span>
    </Tag>
  );
}
