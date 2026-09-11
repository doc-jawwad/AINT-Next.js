type Props = {
  html: string;
  className?: string;
};

/** Renders migrated WordPress HTML (already sanitized at export). */
export default function HtmlContent({ html, className }: Props) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
