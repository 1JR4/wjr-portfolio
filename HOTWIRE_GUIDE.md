# 🔥 Hotwire Modern UI Guide

Minimal JavaScript, Maximum Interactivity - Perfect for Anti-Over-Engineering

## 🎯 Why Hotwire?

Hotwire (HTML Over The Wire) aligns perfectly with our **NO OVER-ENGINEERING** principle:
- **Server-side rendering** with dynamic updates
- **Minimal JavaScript** - most logic stays on the server
- **No build step required** with Import Maps
- **Progressive enhancement** - works without JavaScript
- **Simpler mental model** - think in server-side terms

## 🏗️ Architecture

### Traditional SPA Approach (Over-engineered)
```
Server → JSON API → JavaScript Framework → Virtual DOM → HTML
```

### Hotwire Approach (Simple)
```
Server → HTML → Direct DOM Updates
```

## 📦 Core Components

### 1. Turbo Drive
Turns your application into a SPA without writing JavaScript
```html
<!-- Automatic! All links and forms work via AJAX -->
<a href="/users">Users</a> <!-- Fetches via Turbo -->
<form action="/users" method="post"> <!-- Submits via Turbo -->
```

### 2. Turbo Frames
Lazy-loading and partial page updates
```html
<!-- _index.html -->
<turbo-frame id="user-list">
  <div class="grid gap-4">
    <% users.forEach(user => { %>
      <div class="p-4 border rounded">
        <%= user.name %>
        <a href="/users/<%= user.id %>/edit" 
           data-turbo-frame="user-list">Edit</a>
      </div>
    <% }) %>
  </div>
</turbo-frame>

<!-- Edit form replaces the frame content -->
```

### 3. Turbo Streams
Real-time updates without WebSockets complexity
```html
<!-- Server response -->
<turbo-stream action="append" target="messages">
  <template>
    <div id="message-123" class="message">
      New message content
    </div>
  </template>
</turbo-stream>

<!-- Automatically appends to: -->
<div id="messages">
  <!-- New message appears here -->
</div>
```

### 4. Stimulus
Minimal JavaScript when you need it
```javascript
// controllers/hello_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["output"]
  
  greet() {
    this.outputTarget.textContent = "Hello, Stimulus!"
  }
}
```

```html
<div data-controller="hello">
  <input type="text" data-hello-target="output">
  <button data-action="click->hello#greet">Greet</button>
</div>
```

## 🚀 Implementation in Our Stack

### Package.json Updates
```json
{
  "dependencies": {
    "@hotwired/turbo": "^8.0.0",
    "@hotwired/stimulus": "^3.2.0",
    "tailwindcss": "^3.4.0"
  },
  "scripts": {
    "build:css": "tailwindcss -i ./src/input.css -o ./dist/output.css --watch"
  }
}
```

### Import Maps Setup (No Build Required!)
```html
<!-- public/index.html -->
<script type="importmap">
{
  "imports": {
    "@hotwired/turbo": "https://unpkg.com/@hotwired/turbo@8.0.0/dist/turbo.es2017-esm.js",
    "@hotwired/stimulus": "https://unpkg.com/@hotwired/stimulus@3.2.0/dist/stimulus.js",
    "controllers/": "/js/controllers/"
  }
}
</script>

<script type="module">
  import * as Turbo from "@hotwired/turbo"
  import { Application } from "@hotwired/stimulus"
  
  // Auto-register all controllers
  const application = Application.start()
  
  // Import controllers
  import HelloController from "controllers/hello_controller.js"
  application.register("hello", HelloController)
</script>
```

### Express.js Integration
```typescript
// src/index.ts
import express from 'express';
import { renderTurboStream } from './utils/turbo';

const app = express();

// Turbo Stream response helper
app.post('/messages', async (req, res) => {
  const message = await createMessage(req.body);
  
  // Check if Turbo Stream request
  if (req.headers.accept?.includes('text/vnd.turbo-stream.html')) {
    res.type('text/vnd.turbo-stream.html');
    res.send(renderTurboStream('append', 'messages', message));
  } else {
    // Regular redirect for non-Turbo requests
    res.redirect('/messages');
  }
});

// Turbo Frame responses
app.get('/users/:id/edit', async (req, res) => {
  const user = await getUser(req.params.id);
  
  // Return only the frame content for Turbo Frame requests
  if (req.headers['turbo-frame']) {
    res.render('users/edit_frame', { user });
  } else {
    res.render('users/edit', { user });
  }
});
```

### Tailwind CSS with shadcn Style
```html
<!-- Components using only Tailwind utilities -->
<button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
  Click me
</button>

<!-- Card component -->
<div class="rounded-lg border bg-card text-card-foreground shadow-sm">
  <div class="flex flex-col space-y-1.5 p-6">
    <h3 class="text-2xl font-semibold leading-none tracking-tight">Card Title</h3>
    <p class="text-sm text-muted-foreground">Card description</p>
  </div>
  <div class="p-6 pt-0">
    Content here
  </div>
</div>
```

## 🎨 Tailwind Configuration

### tailwind.config.js (shadcn-style)
```javascript
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
```

### CSS Variables (globals.css)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }
  
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark mode colors */
  }
}
```

## 📝 Example: Real-time Chat with Hotwire

### Server (Node.js/Express)
```typescript
// No WebSockets needed!
app.post('/rooms/:id/messages', async (req, res) => {
  const message = await Message.create({
    roomId: req.params.id,
    userId: req.user.id,
    content: req.body.content
  });
  
  // Broadcast to all clients using Server-Sent Events
  broadcast(req.params.id, renderTurboStream('append', 'messages', 
    `<div class="flex gap-3 p-4 hover:bg-gray-50">
      <img src="${message.user.avatar}" class="w-10 h-10 rounded-full">
      <div>
        <div class="font-semibold">${message.user.name}</div>
        <div>${message.content}</div>
      </div>
    </div>`
  ));
  
  res.type('text/vnd.turbo-stream.html');
  res.send(renderTurboStream('replace', 'message-form', 
    '<form id="message-form">...</form>'
  ));
});
```

### Client (HTML + Stimulus)
```html
<div id="chat-room" data-controller="chat">
  <div id="messages" class="h-96 overflow-y-auto">
    <!-- Messages appear here via Turbo Streams -->
  </div>
  
  <form id="message-form" 
        action="/rooms/123/messages" 
        method="post"
        data-turbo-frame="_top">
    <input type="text" 
           name="content" 
           class="w-full px-4 py-2 border rounded-lg"
           data-chat-target="input"
           data-action="keydown.enter->chat#submit">
    <button type="submit" 
            class="px-4 py-2 bg-blue-500 text-white rounded-lg">
      Send
    </button>
  </form>
</div>

<script>
// Minimal Stimulus controller
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input"]
  
  submit(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      this.element.querySelector("form").requestSubmit()
    }
  }
  
  connect() {
    // Auto-focus input
    this.inputTarget.focus()
  }
}
</script>
```

## 🚀 Migration Strategy

### From React/Vue to Hotwire
1. **Keep your backend logic** - it becomes more important
2. **Replace API endpoints** with HTML responses
3. **Add Turbo Frames** for partial updates
4. **Use Stimulus** only where needed
5. **Progressively enhance** - start with one feature

### Benefits Over Traditional SPAs
- **90% less JavaScript** to maintain
- **No build step** with Import Maps
- **SEO-friendly** by default
- **Faster initial load** - no JS bundle
- **Simpler debugging** - it's just HTML
- **Works without JavaScript** - progressive enhancement

## 🎯 When to Use What

### Use Turbo Drive for:
- Navigation between pages
- Form submissions
- General page transitions

### Use Turbo Frames for:
- Inline editing
- Lazy loading content
- Tab interfaces
- Modal dialogs

### Use Turbo Streams for:
- Real-time updates
- Adding/removing list items
- Live notifications
- Form validation feedback

### Use Stimulus for:
- Keyboard shortcuts
- Drag and drop
- Rich text editing
- Complex interactions

## 📚 Resources

- **Turbo Documentation**: https://turbo.hotwired.dev
- **Stimulus Documentation**: https://stimulus.hotwired.dev
- **Turbo Rails (reference)**: https://github.com/hotwired/turbo-rails
- **shadcn/ui (Tailwind patterns)**: https://ui.shadcn.com

## 🔧 Quick Commands

```bash
# Add Hotwire to existing project
npm install @hotwired/turbo @hotwired/stimulus

# Add Tailwind CSS
npm install -D tailwindcss
npx tailwindcss init

# Pin JavaScript modules (if using importmap)
npx importmap pin @hotwired/turbo
npx importmap pin @hotwired/stimulus

# Generate Stimulus controller
mkdir -p src/controllers
echo 'import { Controller } from "@hotwired/stimulus"
export default class extends Controller {
  connect() {
    console.log("Hello, Stimulus!")
  }
}' > src/controllers/hello_controller.js
```

## 💡 Pro Tips

1. **Think server-first**: Most logic should live on the server
2. **Use Tailwind utilities only**: No custom CSS classes
3. **Embrace HTML responses**: Stop thinking in JSON
4. **Progressive enhancement**: Make it work without JS first
5. **Minimal Stimulus**: Only add JavaScript when HTML can't do it

---

**Remember**: Hotwire embodies our anti-over-engineering principle perfectly. It's boring, proven technology that delivers modern UX without the complexity of SPAs.