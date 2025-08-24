import React from 'react';

interface CategoryWidgetProps {
  value: string;
  onChange: (value: string) => void;
  field: {
    options?: string[];
  };
  classNameWrapper?: string;
}

const CategoryWidget: React.FC<CategoryWidgetProps> = ({ 
  value, 
  onChange, 
  field,
  classNameWrapper 
}) => {
  // Default categories with icons and colors
  const defaultCategories = [
    { value: 'Web Builder/AI-Admin', label: 'Web Builder/AI-Admin', icon: '🔧', color: '#3b82f6' },
    { value: 'Productivity', label: 'Productivity', icon: '⚡', color: '#10b981' },
    { value: 'Personal Development', label: 'Personal Development', icon: '🧠', color: '#8b5cf6' },
    { value: 'Content Aggregator/Research Tool', label: 'Content Aggregator/Research Tool', icon: '📊', color: '#f59e0b' },
    { value: 'AI & Engineering', label: 'AI & Engineering', icon: '🤖', color: '#ef4444' },
    { value: 'Product Management', label: 'Product Management', icon: '📱', color: '#06b6d4' },
    { value: 'Technology Trends', label: 'Technology Trends', icon: '📈', color: '#84cc16' },
    { value: 'Industry Analysis', label: 'Industry Analysis', icon: '🔍', color: '#f97316' }
  ];

  // Use options from field config if available, otherwise use defaults
  const categories = field.options 
    ? field.options.map(option => {
        const defaultCat = defaultCategories.find(cat => cat.value === option);
        return defaultCat || { value: option, label: option, icon: '📂', color: '#6b7280' };
      })
    : defaultCategories;

  const selectedCategory = categories.find(cat => cat.value === value);

  return (
    <div className={classNameWrapper} style={{ position: 'relative' }}>
      {/* Category Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '8px',
        marginTop: '8px'
      }}>
        {categories.map((category) => {
          const isSelected = value === category.value;
          return (
            <button
              key={category.value}
              type="button"
              onClick={() => onChange(category.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '8px',
                padding: '12px',
                borderRadius: '8px',
                border: `2px solid ${isSelected ? category.color : '#e5e7eb'}`,
                background: isSelected ? `${category.color}15` : 'white',
                color: isSelected ? category.color : '#374151',
                fontSize: '14px',
                fontWeight: isSelected ? '600' : '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                minHeight: '48px'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = '#f9fafb';
                  e.currentTarget.style.borderColor = category.color;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }
              }}
            >
              <span style={{ fontSize: '18px' }}>{category.icon}</span>
              <div>
                <div style={{ fontWeight: isSelected ? '600' : '500' }}>
                  {category.label}
                </div>
                {category.value.includes('/') && (
                  <div style={{ 
                    fontSize: '12px', 
                    opacity: 0.7,
                    marginTop: '2px' 
                  }}>
                    {category.value.split('/')[1]}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Selected Category Display */}
      {selectedCategory && (
        <div style={{
          marginTop: '12px',
          padding: '12px',
          background: `${selectedCategory.color}10`,
          border: `1px solid ${selectedCategory.color}30`,
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '16px' }}>{selectedCategory.icon}</span>
          <div>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: selectedCategory.color 
            }}>
              Selected Category
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>
              {selectedCategory.label}
            </div>
          </div>
        </div>
      )}
      
      {/* Custom Category Input */}
      <div style={{
        marginTop: '12px',
        padding: '8px',
        background: '#f8fafc',
        borderRadius: '6px',
        border: '1px dashed #cbd5e1'
      }}>
        <label style={{
          display: 'block',
          fontSize: '12px',
          color: '#64748b',
          marginBottom: '4px',
          fontWeight: '500'
        }}>
          Or enter custom category:
        </label>
        <input
          type="text"
          value={categories.find(cat => cat.value === value) ? '' : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type custom category..."
          style={{
            width: '100%',
            padding: '6px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '13px',
            background: 'white'
          }}
        />
      </div>
    </div>
  );
};

export default CategoryWidget;