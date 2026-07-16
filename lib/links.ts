/**
 * Returns target and rel props for external links.
 * Internal links (#hash, relative paths) are left unchanged.
 */
export function externalLinkProps(href: string) {
  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.endsWith(".pdf");

  return isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}
