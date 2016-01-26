
export default function normalizeTexts({
    text1, text2, cols = 0, fill1 = ' ', fill2 = '_'
  }) {
  const t1Lines = text1.split(/\r?\n/g);
  const t2Lines = text2.split(/\r?\n/g);
  let columns = cols;

  if (!columns) {
    let longestLine = 0;
    for (const line of [].concat(t1Lines, t2Lines)) {
      longestLine = ((line.length > longestLine) ? line.length : longestLine);
    }
    columns = longestLine;
  }

  for (let i = 0; i < t1Lines.length || i < t2Lines.length; i++) {
    // Add missing lines
    if (t1Lines.length <= i) {
      t1Lines.push('');
    }
    if (t2Lines.length <= i) {
      t2Lines.push('');
    }

    // Equal length of lines
    t1Lines[i] = (t1Lines[i].concat(Array(Math.max(0, columns - t1Lines[i].length)).join(fill1))).substr(0, columns);
    t2Lines[i] = (t2Lines[i].concat(Array(Math.max(0, columns - t2Lines[i].length)).join(fill2))).substr(0, columns);
  }

  return { text1: t1Lines.join('\n'), text2: t2Lines.join('\n') };
}
