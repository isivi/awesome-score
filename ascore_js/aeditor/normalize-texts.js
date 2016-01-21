
export default function normalizeTexts({ text1, text2 }) {
  const t1Lines = text1.split(/\r?\n/g);
  const t2Lines = text2.split(/\r?\n/g);

  let longestLine = 0;
  for (const line of [].concat(t1Lines, t2Lines)) {
    longestLine = ((line.length > longestLine) ? line.length : longestLine);
  }

  for (let i = 0; i < t1Lines.length && i < t2Lines.length; i++) {
    if (t1Lines.length <= i) {
      t1Lines.push('');
    }
    if (t2Lines.length <= i) {
      t2Lines.push('');
    }

    t1Lines[i] = t1Lines[i].concat(Array(longestLine - t1Lines[i].length + 1).join(' '));
    t2Lines[i] = t2Lines[i].concat(Array(longestLine - t2Lines[i].length + 1).join(' '));
  }

  return { text1: t1Lines.join('\n'), text2: t2Lines.join('\n') };
}
