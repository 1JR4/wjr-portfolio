"use client";

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  PenTool, 
  Package, 
  Route, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Save, 
  X,
  Upload,
  Image as ImageIcon,
  FileText,
  Calendar,
  Tag,
  User,
  Globe,
  Github,
  ExternalLink
} from 'lucide-react';
import { ImageUpload } from '@/components/image-upload';

interface ContentItem {
  _filename?: string;
  _path?: string;
  _sha?: string;
  title?: string;
  name?: string;
  excerpt?: string;
  description?: string;
  slug?: string;
  date?: string;
  category?: string;
  status?: string;
  tags?: string[];
  content?: string;
  [key: string]: any;
}

interface ContentType {
  label: string;
  icon: React.ReactNode;
  color: string;
  fields: Field[];
}

interface Field {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'tags' | 'list' | 'markdown' | 'url' | 'date' | 'boolean' | 'image';
  required?: boolean;
  default?: any;
  options?: string[];
}

const CONTENT_TYPES: Record<string, ContentType> = {
  blogs: {
    label: 'Blog Posts',
    icon: <PenTool className="w-5 h-5" />,
    color: 'blue',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'readTime', label: 'Read Time', type: 'text', default: '5 min read' },
      { 
        name: 'category', 
        label: 'Category', 
        type: 'select', 
        options: ['AI & Engineering', 'Technology & Innovation', 'Product Management', 'Finance & Technology', 'Nature & Technology', 'AI & Business'],
        required: true 
      },
      { name: 'author', label: 'Author', type: 'text', default: 'Wonjae Ra' },
      { name: 'image', label: 'Featured Image', type: 'image' },
      { name: 'tags', label: 'Tags', type: 'tags', default: ['Technology'] },
      { name: 'tldr', label: 'TL;DR Points', type: 'list' },
      { name: 'content', label: 'Content', type: 'markdown', required: true }
    ]
  },
  products: {
    label: 'Products',
    icon: <Package className="w-5 h-5" />,
    color: 'purple',
    fields: [
      { name: 'name', label: 'Product Name', type: 'text', required: true },
      { name: 'description', label: 'Short Description', type: 'textarea', required: true },
      { name: 'fullDescription', label: 'Full Description', type: 'textarea' },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { 
        name: 'status', 
        label: 'Status', 
        type: 'select', 
        options: ['live', 'mvp', 'development', 'concept'],
        required: true 
      },
      { name: 'category', label: 'Category', type: 'text', required: true },
      { name: 'icon', label: 'Icon', type: 'image' },
      { name: 'image', label: 'Product Image', type: 'image' },
      { name: 'technologies', label: 'Technologies', type: 'tags', default: ['React', 'TypeScript'] },
      { name: 'link', label: 'Live Link', type: 'url' },
      { name: 'github', label: 'GitHub URL', type: 'url' },
      { name: 'demo', label: 'Demo URL', type: 'url' }
    ]
  },
  journey: {
    label: 'Journey',
    icon: <Route className="w-5 h-5" />,
    color: 'green',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'type', label: 'Type', type: 'select', options: ['work', 'personal', 'education', 'achievement'], required: true },
      { name: 'company', label: 'Company/Organization', type: 'text' },
      { name: 'position', label: 'Position/Role', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'duration', label: 'Duration', type: 'text' },
      { name: 'highlights', label: 'Key Highlights', type: 'list' },
      { name: 'skills', label: 'Skills/Technologies', type: 'tags', default: [] },
      { name: 'content', label: 'Detailed Description', type: 'markdown', required: true }
    ]
  }
};

export default function CMSPage() {
  const [activeTab, setActiveTab] = useState('blogs');
  const [content, setContent] = useState<Record<string, ContentItem[]>>({});
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load content from your existing JSON files
  useEffect(() => {
    loadExistingContent();
  }, []);

  const loadExistingContent = async () => {
    try {
      // For now, show a message that the CMS requires server setup
      console.log('CMS requires server-side functionality for full operation');
      // Mock data for demonstration
      setContent({
        blogs: [],
        products: [],
        journey: []
      });
    } catch (err) {
      console.error('Error loading content:', err);
    }
  };

  const handleSave = async (formData: ContentItem) => {
    setLoading(true);
    try {
      // Mock save for demonstration - in full version would integrate with GitHub API
      console.log('Would save:', formData);
      alert('⚠️ This CMS requires server-side functionality to save files.\n\nFull CMS functionality available when deployed with server-side support.');
      setShowModal(false);
      setEditingItem(null);
    } catch (err) {
      setError(`Save failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item: ContentItem) => {
    if (!confirm(`Are you sure you want to delete "${item.title || item.name}"?`)) {
      return;
    }
    
    setLoading(true);
    try {
      console.log('Would delete:', item);
      alert('⚠️ This CMS requires server-side functionality to delete files.\n\nFull CMS functionality available when deployed with server-side support.');
    } catch (err) {
      setError(`Delete failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Portfolio CMS</h1>
              <p className="text-gray-300">Content Management System</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-600 text-yellow-100 px-3 py-1 rounded text-sm">
                ⚠️ Demo Mode - Server functionality required for full CMS
              </div>
              <a
                href="/"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                ← Back to Site
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg mb-8">
          {Object.entries(CONTENT_TYPES).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === key 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              {config.icon}
              <span>{config.label}</span>
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              {CONTENT_TYPES[activeTab].label}
            </h2>
            <button
              onClick={() => {
                setEditingItem(null);
                setShowModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add New</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(content[activeTab] || []).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold line-clamp-2">
                    {item.title || item.name}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setShowModal(true);
                      }}
                      className="text-blue-400 hover:text-blue-300 p-1"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {item.excerpt || item.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags?.slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="text-xs text-gray-400">
                  {item.date && (
                    <div className="flex items-center space-x-1 mb-1">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </div>
                  )}
                  {item.category && (
                    <div className="flex items-center space-x-1">
                      <Tag className="w-3 h-3" />
                      <span>{item.category}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content Modal */}
        {showModal && (
          <ContentModal
            contentType={activeTab}
            item={editingItem}
            onSave={handleSave}
            onClose={() => {
              setShowModal(false);
              setEditingItem(null);
            }}
            loading={loading}
          />
        )}

        {/* Error Notification */}
        {error && (
          <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <span>{error}</span>
              <button
                onClick={() => setError('')}
                className="text-red-200 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Content Modal Component
function ContentModal({ 
  contentType, 
  item, 
  onSave, 
  onClose, 
  loading 
}: {
  contentType: string;
  item: ContentItem | null;
  onSave: (data: ContentItem) => void;
  onClose: () => void;
  loading: boolean;
}) {
  const [formData, setFormData] = useState<ContentItem>(item || {});
  const config = CONTENT_TYPES[contentType];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateField = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              {item ? 'Edit' : 'Create'} {config.label}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {config.fields.map((field) => (
                <div key={field.name} className="w-full">
                  <FormField
                    field={field}
                    value={formData[field.name]}
                    onChange={(value) => updateField(field.name, value)}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// Form Field Component
function FormField({ 
  field, 
  value, 
  onChange 
}: {
  field: Field;
  value: any;
  onChange: (value: any) => void;
}) {
  const renderField = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            rows={3}
            required={field.required}
          />
        );

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            required={field.required}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'tags':
        return (
          <TagsInput
            value={Array.isArray(value) ? value : []}
            onChange={onChange}
            placeholder={`Add ${field.label.toLowerCase()}...`}
          />
        );

      case 'list':
        return (
          <ListInput
            value={Array.isArray(value) ? value : []}
            onChange={onChange}
            placeholder={`Add ${field.label.toLowerCase()}...`}
          />
        );

      case 'markdown':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white font-mono"
            rows={8}
            required={field.required}
            placeholder="Write your content in Markdown..."
          />
        );

      case 'image':
        return (
          <ImageUpload
            value={value}
            onChange={onChange}
            placeholder={`Upload ${field.label.toLowerCase()}...`}
            className="w-full"
          />
        );

      default:
        return (
          <input
            type={field.type === 'date' ? 'date' : field.type === 'url' ? 'url' : 'text'}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            required={field.required}
          />
        );
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        {field.label}
        {field.required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {renderField()}
    </div>
  );
}

// Tags Input Component
function TagsInput({ value, onChange, placeholder }: {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
}) {
  const [input, setInput] = useState('');

  const addTag = () => {
    if (input.trim() && !value.includes(input.trim())) {
      onChange([...value, input.trim()]);
      setInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag, index) => (
          <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-blue-200 hover:text-white ml-1"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          placeholder={placeholder}
          className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
        />
        <button
          type="button"
          onClick={addTag}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg"
        >
          +
        </button>
      </div>
    </div>
  );
}

// List Input Component
function ListInput({ value, onChange, placeholder }: {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
}) {
  const [input, setInput] = useState('');

  const addItem = () => {
    if (input.trim()) {
      onChange([...value, input.trim()]);
      setInput('');
    }
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="space-y-2 mb-2">
        {value.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 bg-gray-700 p-2 rounded">
            <span className="flex-1 text-white">{item}</span>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-red-400 hover:text-red-300"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())}
          placeholder={placeholder}
          className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
        />
        <button
          type="button"
          onClick={addItem}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg"
        >
          +
        </button>
      </div>
    </div>
  );
}