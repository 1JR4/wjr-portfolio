import React from 'react';

interface BlogPreviewProps {
  entry: any;
  widgetFor: (name: string) => React.ReactNode;
  getAsset: (path: string) => any;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ entry, widgetFor, getAsset }) => {
  const data = entry.getIn(['data']).toJS();
  const image = getAsset(data.image);

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '24px',
      lineHeight: '1.6',
      color: '#374151'
    }}>
      {/* Header */}
      <header style={{ marginBottom: '32px', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
          {data.category && (
            <span style={{
              display: 'inline-block',
              background: '#dbeafe',
              color: '#1d4ed8',
              padding: '4px 12px',
              borderRadius: '16px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              {data.category}
            </span>
          )}
        </div>
        
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          lineHeight: '1.2',
          marginBottom: '16px',
          color: '#111827'
        }}>
          {data.title}
        </h1>
        
        <p style={{
          fontSize: '18px',
          color: '#6b7280',
          marginBottom: '16px',
          fontStyle: 'italic'
        }}>
          {data.excerpt}
        </p>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <span>{data.author || 'Wonjae Ra'}</span>
          <span>•</span>
          <span>{data.date}</span>
          <span>•</span>
          <span>{data.readTime}</span>
        </div>
      </header>

      {/* Featured Image */}
      {image && (
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <img 
            src={image} 
            alt={data.title}
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
      )}

      {/* TL;DR Section */}
      {data.tldr && data.tldr.length > 0 && (
        <div style={{
          background: '#f0f9ff',
          border: '1px solid #0ea5e9',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '32px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#0369a1'
          }}>
            TL;DR
          </h3>
          <ul style={{
            margin: '0',
            paddingLeft: '20px',
            listStyleType: 'disc'
          }}>
            {data.tldr.map((item: string, index: number) => (
              <li key={index} style={{ marginBottom: '4px', color: '#374151' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Table of Contents */}
      {data.tableOfContents && data.tableOfContents.length > 0 && (
        <div style={{
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '32px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#374151'
          }}>
            Table of Contents
          </h3>
          <ul style={{
            margin: '0',
            paddingLeft: '0',
            listStyleType: 'none'
          }}>
            {data.tableOfContents.map((item: any, index: number) => (
              <li key={index} style={{ 
                marginBottom: '8px',
                paddingLeft: `${(item.level - 1) * 16}px`
              }}>
                <a 
                  href={`#${item.id}`}
                  style={{
                    color: '#6366f1',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: item.level === 2 ? '500' : '400'
                  }}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Content */}
      <article style={{
        fontSize: '16px',
        lineHeight: '1.7',
        marginBottom: '32px'
      }}>
        {widgetFor('content')}
      </article>

      {/* Tags */}
      {data.tags && data.tags.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#374151'
          }}>
            Tags
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {data.tags.map((tag: string, index: number) => (
              <span 
                key={index}
                style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '14px',
                  border: '1px solid #e5e7eb'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Resources */}
      {data.resources && data.resources.length > 0 && (
        <div style={{
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '16px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#374151'
          }}>
            Additional Resources
          </h3>
          <ul style={{
            margin: '0',
            paddingLeft: '20px',
            listStyleType: 'disc'
          }}>
            {data.resources.map((resource: any, index: number) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                <a 
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#6366f1',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}
                >
                  {resource.title}
                </a>
                <span style={{
                  color: '#6b7280',
                  fontSize: '14px',
                  marginLeft: '8px'
                }}>
                  ({resource.type})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Preview Notice */}
      <div style={{
        background: '#fef3c7',
        border: '1px solid #f59e0b',
        borderRadius: '8px',
        padding: '12px',
        marginTop: '32px',
        textAlign: 'center',
        fontSize: '14px',
        color: '#92400e'
      }}>
        📝 This is a preview of your blog post. The actual styling may vary slightly on the live site.
      </div>
    </div>
  );
};

export default BlogPreview;