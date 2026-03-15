/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Simple rich text renderer for Payload Lexical content.
 * Renders the serialized Lexical JSON as HTML.
 */

function renderNode(node: any): React.ReactNode {
  if (!node) return null

  if (node.type === 'text') {
    let text: React.ReactNode = node.text || ''
    if (node.format & 1) text = <strong key="b">{text}</strong>
    if (node.format & 2) text = <em key="i">{text}</em>
    if (node.format & 16) text = <code key="c">{text}</code>
    if (node.format & 8) text = <s key="s">{text}</s>
    return text
  }

  const children = node.children?.map((child: any, i: number) => (
    <RenderNodeWrapper key={i} node={child} />
  ))

  switch (node.type) {
    case 'root':
      return <>{children}</>
    case 'paragraph':
      return <p>{children}</p>
    case 'heading':
      const Tag = (node.tag || 'h2') as keyof React.JSX.IntrinsicElements
      return <Tag>{children}</Tag>
    case 'list':
      return node.listType === 'number' ? <ol>{children}</ol> : <ul>{children}</ul>
    case 'listitem':
      return <li>{children}</li>
    case 'link':
    case 'autolink':
      return <a href={node.fields?.url || node.url || '#'} target="_blank" rel="noopener noreferrer">{children}</a>
    case 'quote':
      return <blockquote>{children}</blockquote>
    case 'code':
      return <pre><code>{node.children?.map((c: any) => c.text).join('\n')}</code></pre>
    case 'upload': {
      const val = node.value
      if (val?.url) {
        return (
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={val.url} alt={val.alt || ''} className="rounded-lg" />
          </figure>
        )
      }
      return null
    }
    default:
      return children ? <div>{children}</div> : null
  }
}

function RenderNodeWrapper({ node }: { node: any }) {
  return <>{renderNode(node)}</>
}

export function RichTextRenderer({ content }: { content: any }) {
  if (!content?.root) return null
  return <div>{renderNode(content.root)}</div>
}
