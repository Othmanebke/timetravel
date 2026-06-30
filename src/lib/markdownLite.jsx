// Renders a tiny safe subset of markdown (**bold**, line breaks) as React nodes.
// The chatbot model is instructed to avoid markdown but sometimes emits it anyway —
// this guarantees clean rendering regardless.
export function renderLiteMarkdown(text) {
  const lines = text.split("\n");
  return lines.map((line, lineIndex) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
    const rendered = parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-semibold text-gold-soft">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
    return (
      <span key={lineIndex}>
        {rendered}
        {lineIndex < lines.length - 1 && <br />}
      </span>
    );
  });
}
