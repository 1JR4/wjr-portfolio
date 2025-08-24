import React from 'react';

interface StatusWidgetProps {
  value: string;
  onChange: (value: string) => void;
  classNameWrapper?: string;
  setActiveStyle?: (style: any) => void;
  setInactiveStyle?: (style: any) => void;
}

const StatusWidget: React.FC<StatusWidgetProps> = ({ 
  value, 
  onChange, 
  classNameWrapper,
  setActiveStyle,
  setInactiveStyle 
}) => {
  const statusOptions = [
    { value: 'live', label: 'Live', color: '#10b981', icon: '🟢' },
    { value: 'mvp', label: 'MVP', color: '#8b5cf6', icon: '🟣' },
    { value: 'development', label: 'In Development', color: '#f59e0b', icon: '🟡' },
    { value: 'concept', label: 'Concept', color: '#6b7280', icon: '⚪' }
  ];

  const selectedStatus = statusOptions.find(option => option.value === value);

  return (
    <div className={classNameWrapper} style={{ position: 'relative' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '8px',
        marginTop: '8px'
      }}>
        {statusOptions.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: '8px',
                border: `2px solid ${isSelected ? option.color : '#e5e7eb'}`,
                background: isSelected ? `${option.color}15` : 'white',
                color: isSelected ? option.color : '#374151',
                fontSize: '14px',
                fontWeight: isSelected ? '600' : '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minHeight: '40px'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = '#f9fafb';
                  e.currentTarget.style.borderColor = option.color;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }
              }}
            >
              <span>{option.icon}</span>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
      
      {selectedStatus && (
        <div style={{
          marginTop: '8px',
          padding: '8px 12px',
          background: `${selectedStatus.color}10`,
          border: `1px solid ${selectedStatus.color}30`,
          borderRadius: '6px',
          fontSize: '12px',
          color: selectedStatus.color,
          textAlign: 'center'
        }}>
          Selected: <strong>{selectedStatus.label}</strong>
        </div>
      )}
    </div>
  );
};

export default StatusWidget;