export function extractFirstImageSrc(htmlString) {
  if (!htmlString || typeof htmlString !== "string") {
    return null;
  }
  const regexMatch = htmlString.match(
    /<img[^>]+src\s*=\s*["']([^"']+)["'][^>]*>/i
  );

  return regexMatch ? regexMatch[1] : null;
}

export function extractFirstParagraphText(htmlString) {
  if (!htmlString || typeof htmlString !== "string") {
    return null;
  }

  const regexMatch = htmlString.match(/<p[^>]*>([^<]+)<\/p>/i);

  if (!regexMatch) {
    return null;
  }
  const fullText = regexMatch[1].trim();
  const firstLine = fullText.split(/[\n\r]+/)[0];
  if (firstLine.length > 100) {
    const truncated = firstLine.substr(0, 100).split(" ");
    truncated.pop();
    return truncated.join(" ") + "...";
  }

  return firstLine;
}
