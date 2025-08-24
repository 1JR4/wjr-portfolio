import CMS from 'decap-cms-app';

// Import custom components
import BlogPreview from './previews/BlogPreview.tsx';
import ProductPreview from './previews/ProductPreview.tsx';
import StatusWidget from './widgets/StatusWidget.tsx';
import CategoryWidget from './widgets/CategoryWidget.tsx';
import FAQWidget from './widgets/FAQWidget.tsx';

// Register custom preview templates
CMS.registerPreviewTemplate('blog', BlogPreview);
CMS.registerPreviewTemplate('product', ProductPreview);

// Register custom widgets
CMS.registerWidget('status', StatusWidget);
CMS.registerWidget('category', CategoryWidget); 
CMS.registerWidget('faq', FAQWidget);

// Custom preview styles
CMS.registerPreviewStyle('/cms-preview-styles.css');

// Initialize CMS
CMS.init();

// Export for use in admin
window.CMS = CMS;
window.BlogPreview = BlogPreview;
window.ProductPreview = ProductPreview;
window.StatusWidget = StatusWidget;
window.CategoryWidget = CategoryWidget;
window.FAQWidget = FAQWidget;