import React from 'react';

interface ProductPreviewProps {
  entry: any;
  widgetFor: (name: string) => React.ReactNode;
  getAsset: (path: string) => any;
}

const ProductPreview: React.FC<ProductPreviewProps> = ({ entry, widgetFor, getAsset }) => {
  const data = entry.getIn(['data']).toJS();
  const icon = getAsset(data.icon);
  const mainImage = getAsset(data.image);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return { bg: '#10b981', text: 'white' };
      case 'mvp': return { bg: '#8b5cf6', text: 'white' };
      case 'development': return { bg: '#f59e0b', text: 'white' };
      case 'concept': return { bg: '#6b7280', text: 'white' };
      default: return { bg: '#6b7280', text: 'white' };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'Live';
      case 'mvp': return 'MVP';
      case 'development': return 'In Development';
      case 'concept': return 'Concept';
      default: return status;
    }
  };

  const statusColor = getStatusColor(data.status);

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      maxWidth: '900px',
      margin: '0 auto',
      padding: '24px',
      lineHeight: '1.6',
      color: '#374151'
    }}>
      {/* Header with Icon */}
      <header style={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        gap: '20px',
        marginBottom: '32px',
        padding: '24px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        color: 'white'
      }}>
        {/* Product Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '16px',
          overflow: 'hidden',
          flexShrink: 0,
          background: 'rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon ? (
            <img 
              src={icon} 
              alt={`${data.name} icon`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'white'
            }}>
              {data.name ? data.name.charAt(0) : '?'}
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            margin: '0 0 8px 0',
            color: 'white'
          }}>
            {data.name}
          </h1>
          
          <p style={{
            fontSize: '18px',
            margin: '0 0 16px 0',
            opacity: 0.9
          }}>
            {data.description}
          </p>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {data.status && (
              <span style={{
                background: statusColor.bg,
                color: statusColor.text,
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                {getStatusText(data.status)}
              </span>
            )}
            
            {data.category && (
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                {data.category}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Image */}
      {mainImage && (
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <img 
            src={mainImage} 
            alt={data.name}
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
      )}

      {/* Product Details Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Left Column */}
        <div>
          {/* Basic Info */}
          <div style={{
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
              Product Details
            </h3>
            {data.type && (
              <p><strong>Type:</strong> {data.type}</p>
            )}
            {data.version && (
              <p><strong>Version:</strong> {data.version}</p>
            )}
            {data.platforms && data.platforms.length > 0 && (
              <p><strong>Platforms:</strong> {data.platforms.join(', ')}</p>
            )}
          </div>

          {/* Technologies */}
          {data.technologies && data.technologies.length > 0 && (
            <div style={{
              background: '#f0f9ff',
              border: '1px solid #0ea5e9',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#0369a1' }}>
                Technologies
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {data.technologies.map((tech: string, index: number) => (
                  <span 
                    key={index}
                    style={{
                      background: '#0ea5e9',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Links */}
          <div style={{
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
              Links
            </h3>
            {data.link && (
              <p>
                <a href={data.link} target="_blank" rel="noopener noreferrer" 
                   style={{ color: '#6366f1', textDecoration: 'none' }}>
                  🌐 Live Site
                </a>
              </p>
            )}
            {data.demo && (
              <p>
                <a href={data.demo} target="_blank" rel="noopener noreferrer"
                   style={{ color: '#6366f1', textDecoration: 'none' }}>
                  🎮 Demo
                </a>
              </p>
            )}
            {data.github && (
              <p>
                <a href={data.github} target="_blank" rel="noopener noreferrer"
                   style={{ color: '#6366f1', textDecoration: 'none' }}>
                  📁 GitHub
                </a>
              </p>
            )}
            {data.documentation && (
              <p>
                <a href={data.documentation} target="_blank" rel="noopener noreferrer"
                   style={{ color: '#6366f1', textDecoration: 'none' }}>
                  📖 Documentation
                </a>
              </p>
            )}
          </div>

          {/* Timeline */}
          {data.createdAt && (
            <div style={{
              background: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                Timeline
              </h3>
              {data.createdAt && (
                <p><strong>Created:</strong> {data.createdAt}</p>
              )}
              {data.launchDate && (
                <p><strong>Launch:</strong> {data.launchDate}</p>
              )}
              {data.updatedAt && (
                <p><strong>Updated:</strong> {data.updatedAt}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Full Description */}
      {data.fullDescription && (
        <div style={{
          marginBottom: '32px',
          padding: '20px',
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
            About {data.name}
          </h3>
          <div style={{ fontSize: '16px', lineHeight: '1.7' }}>
            {widgetFor('fullDescription')}
          </div>
        </div>
      )}

      {/* KPIs */}
      {data.kpis && data.kpis.length > 0 && (
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #22c55e',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#15803d' }}>
            Key Metrics
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
            {data.kpis.map((kpi: any, index: number) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#15803d' }}>
                  {kpi.value}
                </div>
                <div style={{ fontSize: '14px', color: '#374151' }}>
                  {kpi.label}
                </div>
                {kpi.trend && (
                  <div style={{ fontSize: '12px', marginTop: '4px' }}>
                    {kpi.trend === 'up' ? '📈' : kpi.trend === 'down' ? '📉' : '➡️'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      {data.features && data.features.length > 0 && (
        <div style={{
          background: '#fefbf2',
          border: '1px solid #f59e0b',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#92400e' }}>
            Features
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
            {data.features.map((feature: any, index: number) => (
              <div key={index} style={{
                background: 'white',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #f3f4f6'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <strong style={{ fontSize: '14px' }}>{feature.title}</strong>
                  <span style={{
                    background: feature.status === 'available' ? '#10b981' : feature.status === 'coming-soon' ? '#f59e0b' : '#6b7280',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '8px',
                    fontSize: '10px',
                    fontWeight: '500'
                  }}>
                    {feature.status === 'available' ? '✅' : feature.status === 'coming-soon' ? '⏳' : '📋'}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      {data.faq && data.faq.length > 0 && (
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
            Frequently Asked Questions
          </h3>
          {data.faq.map((item: any, index: number) => (
            <div key={index} style={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '12px'
            }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#374151'
              }}>
                {item.question}
              </h4>
              <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                {typeof item.answer === 'string' ? item.answer : widgetFor(`faq.${index}.answer`)}
              </div>
            </div>
          ))}
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
        🚀 This is a preview of your product page. The actual styling may vary slightly on the live site.
      </div>
    </div>
  );
};

export default ProductPreview;