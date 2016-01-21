
export default function combineTexts({ orig, upd }) {
  const origLines = orig.split(/\r?\n/g);
  const updLines = upd.split(/\r?\n/g);

  let longestLine = 0;
  for (const line of [].concat(origLines, updLines)) {
    longestLine = ((line.length > longestLine) ? line.length : longestLine);
  }

  for (let i = 0; i < origLines.length && i < updLines.length; i++) {
    if (origLines.length <= i) {
      origLines.push('');
    }
    if (updLines.length <= i) {
      updLines.push('');
    }

    origLines[i] = origLines[i].concat(Array(longestLine - origLines[i].length + 1).join(' '));
    updLines[i] = updLines[i].concat(Array(longestLine - updLines[i].length + 1).join(' '));
  }

  return { orig: origLines.join('\n'), upd: updLines.join('\n') };
}
