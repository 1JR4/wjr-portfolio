import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQWidgetProps {
  value: FAQItem[];
  onChange: (value: FAQItem[]) => void;
  classNameWrapper?: string;
}

const FAQWidget: React.FC<FAQWidgetProps> = ({ 
  value = [], 
  onChange, 
  classNameWrapper 
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const addFAQItem = () => {
    const newItem: FAQItem = { question: '', answer: '' };
    onChange([...value, newItem]);
    // Expand the newly added item
    setExpandedItems(prev => new Set([...prev, value.length]));
  };

  const removeFAQItem = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
    // Remove from expanded items
    const newExpanded = new Set(expandedItems);
    newExpanded.delete(index);
    setExpandedItems(newExpanded);
  };

  const updateFAQItem = (index: number, field: 'question' | 'answer', newValue: string) => {
    const updatedValue = value.map((item, i) => 
      i === index ? { ...item, [field]: newValue } : item
    );
    onChange(updatedValue);
  };

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === value.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newValue = [...value];
    [newValue[index], newValue[newIndex]] = [newValue[newIndex], newValue[index]];
    onChange(newValue);

    // Update expanded state
    const newExpanded = new Set(expandedItems);
    if (expandedItems.has(index)) {
      newExpanded.delete(index);
      newExpanded.add(newIndex);
    }
    if (expandedItems.has(newIndex)) {
      newExpanded.delete(newIndex);
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className={classNameWrapper} style={{ position: 'relative' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <div>
          <h4 style={{ 
            margin: '0', 
            fontSize: '16px', 
            fontWeight: '600',
            color: '#374151'
          }}>
            FAQ Items ({value.length})
          </h4>
          <p style={{ 
            margin: '4px 0 0 0', 
            fontSize: '12px', 
            color: '#6b7280' 
          }}>
            Add frequently asked questions for this content
          </p>
        </div>
        
        <button
          type="button"
          onClick={addFAQItem}
          style={{
            background: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>+</span>
          Add FAQ
        </button>
      </div>

      {/* FAQ Items */}
      {value.length === 0 ? (
        <div style={{
          background: '#f8fafc',
          border: '2px dashed #cbd5e1',
          borderRadius: '8px',
          padding: '24px',
          textAlign: 'center',
          color: '#64748b'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>❓</div>
          <p style={{ margin: '0', fontSize: '14px' }}>
            No FAQ items yet. Click "Add FAQ" to get started.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {value.map((item, index) => {
            const isExpanded = expandedItems.has(index);
            return (
              <div
                key={index}
                style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              >
                {/* FAQ Item Header */}
                <div 
                  style={{
                    background: isExpanded ? '#f8fafc' : '#fff',
                    padding: '12px 16px',
                    borderBottom: isExpanded ? '1px solid #e5e7eb' : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  onClick={() => toggleExpanded(index)}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '2px'
                    }}>
                      {item.question || `FAQ Item ${index + 1}`}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      maxWidth: '400px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {item.answer || 'No answer provided yet...'}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* Move buttons */}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); moveItem(index, 'up'); }}
                      disabled={index === 0}
                      style={{
                        background: 'none',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        padding: '4px',
                        cursor: index === 0 ? 'not-allowed' : 'pointer',
                        opacity: index === 0 ? 0.5 : 1
                      }}
                    >
                      ↑
                    </button>
                    
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); moveItem(index, 'down'); }}
                      disabled={index === value.length - 1}
                      style={{
                        background: 'none',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        padding: '4px',
                        cursor: index === value.length - 1 ? 'not-allowed' : 'pointer',
                        opacity: index === value.length - 1 ? 0.5 : 1
                      }}
                    >
                      ↓
                    </button>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeFAQItem(index); }}
                      style={{
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      ✕
                    </button>

                    {/* Expand/collapse icon */}
                    <span style={{ 
                      fontSize: '12px', 
                      color: '#6b7280',
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }}>
                      ▼
                    </span>
                  </div>
                </div>

                {/* FAQ Item Content */}
                {isExpanded && (
                  <div style={{ padding: '16px' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '4px'
                      }}>
                        Question:
                      </label>
                      <input
                        type="text"
                        value={item.question}
                        onChange={(e) => updateFAQItem(index, 'question', e.target.value)}
                        placeholder="Enter the frequently asked question..."
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '4px'
                      }}>
                        Answer:
                      </label>
                      <textarea
                        value={item.answer}
                        onChange={(e) => updateFAQItem(index, 'answer', e.target.value)}
                        placeholder="Enter the detailed answer..."
                        rows={4}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          resize: 'vertical',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Summary */}
      {value.length > 0 && (
        <div style={{
          marginTop: '12px',
          padding: '8px 12px',
          background: '#f0f9ff',
          border: '1px solid #0ea5e9',
          borderRadius: '6px',
          fontSize: '12px',
          color: '#0369a1'
        }}>
          💡 <strong>{value.length}</strong> FAQ item(s) configured. 
          {value.filter(item => !item.question || !item.answer).length > 0 && (
            <span style={{ color: '#dc2626', marginLeft: '8px' }}>
              ({value.filter(item => !item.question || !item.answer).length} incomplete)
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FAQWidget;