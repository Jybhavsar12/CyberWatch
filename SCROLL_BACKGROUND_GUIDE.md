# Scroll-Based Background Transitions

## How Shopify (and other top brands) create smooth background color changes on scroll

### 🎯 Two Approaches Implemented

#### **1. Framer Motion Approach** (`scroll-background.tsx`)
**Best for:** Continuous, smooth color interpolation as you scroll

**How it works:**
- Uses Framer Motion's `useScroll` hook to track scroll position
- `useTransform` maps scroll progress to color values
- Interpolates between colors smoothly
- GPU-accelerated via CSS transforms

**Pros:**
- Buttery smooth transitions
- Continuous color interpolation
- Simple API

**Cons:**
- Requires Framer Motion dependency
- Slightly more complex setup

**Demo:** `/scroll-demo`

---

#### **2. IntersectionObserver Approach** (`scroll-background-observer.tsx`)
**Best for:** Discrete color changes when sections enter viewport

**How it works:**
- Uses native `IntersectionObserver` API
- Detects when sections enter/exit viewport
- Triggers color change via React Context
- CSS transitions handle the smoothness

**Pros:**
- No animation library needed
- More precise control
- Better for distinct sections
- Lighter bundle size

**Cons:**
- Less smooth than continuous interpolation
- Requires Context setup

**Demo:** `/scroll-demo-2`

---

### 📖 Usage Examples

#### **Framer Motion Approach:**

```tsx
import { ScrollBackground, ScrollSection } from '@/components/scroll-background'

export default function Page() {
  return (
    <ScrollBackground
      sections={[
        { color: '#ffffff', gradient: 'linear-gradient(...)' },
        { color: '#000000', gradient: 'linear-gradient(...)' },
      ]}
    >
      <ScrollSection>
        <h1>Section 1</h1>
      </ScrollSection>
      
      <ScrollSection>
        <h1>Section 2</h1>
      </ScrollSection>
    </ScrollBackground>
  )
}
```

#### **IntersectionObserver Approach:**

```tsx
import { ScrollBackgroundProvider, ColorSection } from '@/components/scroll-background-observer'

export default function Page() {
  return (
    <ScrollBackgroundProvider>
      <ColorSection color="#ffffff" gradient="linear-gradient(...)">
        <h1>Section 1</h1>
      </ColorSection>
      
      <ColorSection color="#000000" gradient="linear-gradient(...)">
        <h1>Section 2</h1>
      </ColorSection>
    </ScrollBackgroundProvider>
  )
}
```

---

### 🎨 Color & Gradient Tips

**Solid Colors:**
```tsx
color="#1a1a2e"
```

**Linear Gradients:**
```tsx
gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
```

**Radial Gradients:**
```tsx
gradient="radial-gradient(circle at top right, #e0e7ff 0%, #f8f9fa 50%)"
```

**Beautiful Gradient Combinations:**
- Purple Dream: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Sunset: `linear-gradient(135deg, #fa709a 0%, #fee140 100%)`
- Ocean: `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`
- Pink Bliss: `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`

---

### ⚡ Performance Optimization

Both approaches are optimized for 60fps:

1. **GPU Acceleration:** Background uses `position: fixed` and CSS transforms
2. **Debouncing:** Scroll events are optimized
3. **Will-change:** CSS hint for browser optimization
4. **Passive Listeners:** Non-blocking scroll events

---

### 🚀 Which One Should You Use?

| Use Case | Recommended Approach |
|----------|---------------------|
| Marketing pages with flowing content | Framer Motion |
| Product showcases with distinct sections | IntersectionObserver |
| Already using Framer Motion | Framer Motion |
| Want minimal dependencies | IntersectionObserver |
| Need precise section control | IntersectionObserver |
| Want continuous smooth transitions | Framer Motion |

---

### 🔧 Customization

Both components accept:
- Custom colors (any valid CSS color)
- Gradients (linear, radial, conic)
- Custom thresholds (IntersectionObserver only)
- Custom transition durations

---

### 📱 Mobile Considerations

- Both approaches work perfectly on mobile
- Touch scrolling is smooth and responsive
- Gradients are optimized for mobile GPUs
- No performance issues on modern devices

---

### 🌐 Browser Support

- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari 15.4+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

### 💡 Inspiration

This technique is used by:
- Shopify Editions pages
- Apple product launches
- Stripe marketing pages
- Linear.app
- Vercel homepage

