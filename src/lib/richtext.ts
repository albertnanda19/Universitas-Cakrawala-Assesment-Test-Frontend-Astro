export function renderText(children: any[] = []): string {
  return children
    .map((node: any) => (typeof node?.text === "string" ? node.text : ""))
    .join("");
}

export function renderNode(node: any): string {
  if (!node) return "";
  switch (node.type) {
    case "heading": {
      const level =
        typeof node.level === "number" && Number.isFinite(node.level)
          ? node.level
          : 1;
      const text = renderText(node.children || []);
      const h = Math.min(Math.max(level, 1), 6);
      return `<h${h}>${text}</h${h}>`;
    }
    case "paragraph": {
      const text = renderText(node.children || []);
      return `<p>${text}</p>`;
    }
    default: {
      const text = renderText(node.children || []);
      return text ? `<p>${text}</p>` : "";
    }
  }
}

export function renderNodes(nodes: any): string {
  if (!nodes) return "";
  if (typeof nodes === "string") return nodes;
  if (Array.isArray(nodes)) return nodes.map(renderNode).join("");
  return "";
}


