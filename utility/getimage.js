export default function extractFirstImageSrc(htmlString) {
  if (!htmlString || typeof htmlString !== "string") {
    return null;
  }
  const regexMatch = htmlString.match(
    /<img[^>]+src\s*=\s*["']([^"']+)["'][^>]*>/i
  );

  return regexMatch ? regexMatch[1] : null;
}
