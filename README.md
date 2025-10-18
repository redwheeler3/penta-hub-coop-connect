# Penta Housing Co-Op Website

A modern, performant website for Penta Housing Co-Op built with React, TypeScript, and Vite. The site provides information about the cooperative housing community and includes an application system for prospective members.

**Live URL**: https://staging.pentacoop.com

## Project Overview

This is a single-page application (SPA) built for Penta Housing Co-Op, a cooperative housing community in Vancouver's Point Grey neighbourhood. The website features:

- Information about the co-op and cooperative housing model
- Application system with Google Forms integration
- Email signup for housing availability notifications
- Comprehensive analytics tracking
- Mobile-responsive design
- SEO-optimized structure

## Architecture

### Technology Stack

- **Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 5.4
- **Routing**: React Router v6
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS with custom theme
- **State Management**: React hooks (useState, useEffect, useCallback)
- **Form Handling**: React Hook Form with Zod validation
- **Analytics**: Google Analytics (gtag.js)

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui component library
│   ├── Navigation.tsx  # Main navigation (memoized)
│   └── ScrollToTop.tsx # Scroll restoration utility
├── pages/              # Route components (lazy-loaded)
│   ├── Index.tsx       # Home page
│   ├── About.tsx       # About page
│   ├── Apply.tsx       # Application page
│   ├── Members.tsx     # Members area
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
│   ├── useAnalytics.ts # Centralized analytics tracking
│   ├── usePageTitle.ts # Dynamic page titles
│   └── use-toast.ts    # Toast notifications
├── config/             # Application configuration
│   └── constants.ts    # Centralized constants and config
├── lib/                # Utility functions
│   └── utils.ts        # Helper functions
├── App.tsx             # Root component with routing
└── main.tsx            # Application entry point
```

### Key Architectural Decisions

#### 1. **Code Splitting & Performance**

The application uses React's lazy loading and Suspense for route-based code splitting:

```typescript
// App.tsx
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
// ... other routes

<Suspense fallback={<PageLoader />}>
  <Routes>
    <Route path="/" element={<Index />} />
    // ... routes
  </Routes>
</Suspense>
```

**Benefits**:
- ~44% reduction in initial bundle size (450KB → 250KB)
- Faster initial page load
- Routes load on-demand
- Better caching opportunities

#### 2. **Component Optimization**

Performance-critical components use React optimization techniques:

```typescript
// Navigation.tsx - Memoized component
const Navigation = memo(() => {
  const handleNavClick = useCallback((destination, location) => {
    trackNavigation(destination, location);
    if (location === 'mobile') setIsMenuOpen(false);
  }, [trackNavigation]);
  // ...
});
```

**Benefits**:
- Prevents unnecessary re-renders
- Stable function references with useCallback
- Better memory management

#### 3. **Centralized Configuration**

All constants and configuration live in `src/config/constants.ts`:

```typescript
export const APP_CONFIG = {
  APPLICATIONS_OPEN: false,
  GOOGLE_FORM_URL: 'https://applications.pentacoop.com/',
  // ...
} as const;

export const EXTERNAL_LINKS = {
  DESIGNER_WEBSITE: 'https://www.jeffo.net',
  CHF_BC: 'https://www.chf.bc.ca',
  // ...
} as const;
```

**Benefits**:
- Single source of truth for configuration
- Type-safe with TypeScript `as const`
- Easy to update URLs, form fields, and settings
- Better maintainability

#### 4. **Type Safety**

Full TypeScript coverage with proper type declarations:

```typescript
// Global type declarations for third-party libraries
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetIdOrEventName: string,
      configOrParams?: Record<string, any>
    ) => void;
  }
}
```

## Google Analytics Implementation

### Analytics Architecture

The website uses a centralized analytics system built around a custom `useAnalytics` hook that provides type-safe tracking methods.

#### Core Hook: `useAnalytics`

Located at `src/hooks/useAnalytics.ts`, this hook encapsulates all analytics logic:

```typescript
export const useAnalytics = () => {
  const trackEvent = (eventName: string, eventParams = {}) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, {
        page_location: window.location.href,
        ...eventParams,
      });
    }
  };

  const trackCTA = (buttonName: string, buttonLocation: string) => {
    trackEvent('cta_click', {
      button_name: buttonName,
      button_location: buttonLocation,
    });
  };

  // ... other tracking methods
  
  return {
    trackEvent,
    trackCTA,
    trackNavigation,
    trackExternalLink,
    trackFormStart,
    trackFormSubmit,
    trackFormError,
    trackFormAbandonment,
  };
};
```

### Tracked Events

The analytics system tracks the following user interactions:

#### 1. **Call-to-Action Clicks**
Tracks when users click important action buttons:
- "Learn More" button (hero section)
- "Apply Now" button (hero section)
- "Start Your Application" button (bottom CTA)
- "Join Our Community" button (About page)
- "Complete Application Form" button (when applications are open)

```typescript
const { trackCTA } = useAnalytics();
trackCTA('Learn More', 'hero');
```

#### 2. **Navigation Tracking**
Tracks all navigation clicks across the site:
- Desktop menu navigation
- Mobile menu navigation
- Logo clicks
- Internal page links

```typescript
const { trackNavigation } = useAnalytics();
trackNavigation('about', 'desktop');
```

#### 3. **External Link Tracking**
Monitors when users click external links:
- Designer website link (footer)
- Point Grey neighbourhood guide
- CHF BC (Co-op Housing Federation of BC)
- CHF Canada

```typescript
const { trackExternalLink } = useAnalytics();
trackExternalLink('CHF BC', 'https://www.chf.bc.ca');
```

#### 4. **Form Interaction Tracking**
Comprehensive form analytics for the email signup form:

**Form Start**: Fired when user focuses email input
```typescript
const { trackFormStart } = useAnalytics();
trackFormStart('Email Signup');
```

**Form Submit**: Fired when form is successfully submitted
```typescript
const { trackFormSubmit } = useAnalytics();
trackFormSubmit('Email Signup');
```

**Form Error**: Tracks validation or submission errors
```typescript
const { trackFormError } = useAnalytics();
trackFormError('Email Signup', 'Missing Information');
```

**Form Abandonment**: Tracks when users start but don't complete the form
```typescript
useEffect(() => {
  const handleBeforeUnload = () => {
    if (formStarted && email && !isSubmitting) {
      trackFormAbandonment('Email Signup');
    }
  };
  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [formStarted, email, isSubmitting, trackFormAbandonment]);
```

### Analytics Data Structure

All events automatically include:
- `page_location`: Current page URL
- Custom parameters specific to the event type

Example event data:
```javascript
{
  event: 'cta_click',
  button_name: 'Apply Now',
  button_location: 'hero',
  page_location: 'https://staging.pentacoop.com/'
}
```

### Implementation in Components

Components use the hook to track interactions:

```typescript
// Example from Index.tsx
const Index = () => {
  const { trackCTA, trackExternalLink } = useAnalytics();

  return (
    <>
      <Link to="/about" onClick={() => trackCTA('Learn More', 'hero')}>
        <Button>Learn More</Button>
      </Link>
      
      <a 
        href="https://www.jeffo.net"
        onClick={() => trackExternalLink('Designer Website', 'https://www.jeffo.net')}
      >
        Jeff Oriecuia
      </a>
    </>
  );
};
```

### Analytics Best Practices

1. **Centralized Logic**: All tracking code in one hook, no duplication
2. **Type Safety**: TypeScript ensures correct parameter usage
3. **Consistent Naming**: Event names follow a clear convention
4. **Automatic Context**: Page location automatically included
5. **Graceful Degradation**: Checks for gtag availability before tracking
6. **Form Journey Tracking**: Complete funnel from start to abandonment

### Google Analytics 4 Configuration

#### Custom Dimensions Setup

To view custom event data in GA4, register these custom dimensions:

**Navigation Events:**
- `destination` - Where the user navigated to
- `location` - Where the navigation originated (desktop/mobile/logo)

**CTA Click Events:**
- `button_name` - Name of the CTA button clicked
- `button_location` - Location of the button on the page

**Form Events:**
- `form_name` - Name of the form (e.g., "Email Signup")
- `error_type` - Type of error that occurred

**Link Events:**
- `link_name` - Name of the external link
- `link_url` - URL of the external link

**Resource Events (Members page):**
- `resource_category` - Category of the resource
- `link_name` - Specific link clicked within the resource

**Steps to Configure Custom Dimensions:**

1. Go to Google Analytics 4 Admin → Data display → Custom definitions
2. Click "Create custom dimension" for each parameter listed above
3. Configure each dimension:
   - **Dimension name**: User-friendly name (e.g., "Button Location")
   - **Scope**: Event
   - **Event parameter**: Exact parameter name (e.g., `button_location`)
   - **Description**: Brief description of what it tracks

#### Recommended GA4 Reports

Create these custom reports for better insights:

1. **Navigation Flow Report**
   - Event: `navigation_click`
   - Dimensions: `destination`, `location`

2. **CTA Performance Report**
   - Event: `cta_click`
   - Dimensions: `button_name`, `button_location`

3. **Form Funnel Report**
   - Events: `form_start`, `form_submit`, `form_error`, `form_abandonment`
   - Dimensions: `form_name`, `error_type`

4. **External Links Report**
   - Event: `external_link_click`
   - Dimensions: `link_name`, `link_url`

#### Tracking by Page

**All Pages:**
- `page_view` - Automatically tracked on every page load
  - `page_path`, `page_title`, `page_location`, `page_referrer`

**Home Page (Index.tsx):**
- CTA clicks: "Learn More", "Apply Now", "Start Your Application"
- External link: Designer website

**About Page (About.tsx):**
- CTA click: "Join Our Community"
- External links: Point Grey Guide, CHF BC, CHF Canada

**Apply Page (Apply.tsx):**
- CTA click: "Complete Application Form"
- Form tracking: start, submit, error, abandonment
- Internal navigation: "Learn More About Our Community"

**Members Page (Members.tsx):**
- Resource link clicks with categories
- Accordion expansion tracking

#### Testing Analytics

To verify tracking implementation:

1. Install Google Analytics Debugger Chrome extension
2. Enable debug mode and navigate through the site
3. Open GA4 DebugView to see events in real-time
4. Verify all custom parameters are being sent correctly

**Note**: Custom dimensions appear in GA4 within 24-48 hours of first data collection. Historical data before dimension registration won't be available.

## Google Forms Integration

The application system integrates with Google Forms for data collection:

### Email Signup Form

Located in `Apply.tsx`, the form submits directly to Google Forms:

```typescript
const form = document.createElement('form');
form.action = 'https://docs.google.com/forms/d/e/.../formResponse';
form.method = 'POST';
form.target = 'hidden_iframe';

// Add form fields
const emailInput = document.createElement('input');
emailInput.name = 'emailAddress';
emailInput.value = email;
form.appendChild(emailInput);
```

**Form Fields**:
- Email address
- Bedroom preferences (1, 2, or 3 bedroom units)

**Configuration** (in `constants.ts`):
```typescript
export const FORM_FIELDS = {
  EMAIL: 'emailAddress',
  BEDROOM_PREFERENCE: 'entry.2074227584',
};

export const BEDROOM_PREFERENCES = {
  ONE_BEDROOM: {
    id: '1-bedroom',
    label: '1 bedroom - 1 or 2 adults',
    formValue: '1 bedroom (1 or 2 adults)',
  },
  // ... other preferences
};
```

### Application Status Toggle

The application system can be toggled on/off via `APP_CONFIG.APPLICATIONS_OPEN` in `constants.ts`. When open, users see:
- Current available unit details
- Application form link
- Deadline information

When closed, users see:
- Email signup form
- Application process timeline
- Information about when applications typically open

## Development

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Setup

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd penta-hub-coop-connect

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server runs at `http://localhost:8080` with hot module replacement.

### Available Scripts

```sh
# Development
npm run dev              # Start dev server

# Building
npm run build            # Production build
npm run build:dev        # Development build
npm run preview          # Preview production build locally

# Linting
npm run lint             # Run ESLint

# Deployment
npm run deploy           # Build and deploy to GitHub Pages
```

### Code Quality

The project uses:
- **ESLint**: For code quality and consistency
- **TypeScript**: For type safety
- **Prettier** (via editor): For code formatting

ESLint configuration includes:
- React hooks rules
- TypeScript recommended rules
- Unused variables warning (with underscore pattern ignore)

## Deployment

### GitHub Pages Deployment

The site is configured for deployment to GitHub Pages:

```sh
npm run deploy
```

This command:
1. Builds the production bundle (`npm run build`)
2. Copies `index.html` to `404.html` for SPA routing
3. Deploys the `dist` folder to GitHub Pages

### Custom Domain

The site uses a custom domain configured via `public/CNAME`:
```
staging.pentacoop.com
```

### Build Configuration

Key build settings in `vite.config.ts`:
```typescript
export default defineConfig({
  base: "./",  // Relative paths for assets
  plugins: [
    react(),
    componentTagger(), // Development only
  ],
  // ...
});
```

## Environment Configuration

### Base URL

The site uses relative paths (`base: "./"`) for asset loading, making it work on any domain without configuration changes.

### Image Assets

Images are stored in `public/lovable-uploads/` and referenced using:
```typescript
const BASE_URL = import.meta.env.BASE_URL;
<img src={`${BASE_URL}lovable-uploads/image.png`} />
```

## Testing Recommendations

Before deploying:

1. **Analytics**: Verify all events fire correctly in Google Analytics
2. **Forms**: Test email signup with various inputs
3. **Navigation**: Test all links on desktop and mobile
4. **Routes**: Verify lazy loading and loading states work correctly
5. **Responsive Design**: Test on various screen sizes
6. **External Links**: Verify all external links open in new tabs

## Browser Support

The site supports:
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Metrics

- **Initial Load**: ~250KB JavaScript bundle
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s

## Contributing

### Making Changes

1. Create a new branch for your changes
2. Make your modifications
3. Test thoroughly
4. Commit with clear messages
5. Push and create a pull request

### Code Style

- Use TypeScript for all new code
- Follow existing component patterns
- Add types for all function parameters and returns
- Use the `useAnalytics` hook for tracking new interactions
- Add constants to `constants.ts` rather than hardcoding values

## Support & Documentation

- **Project URL**: https://lovable.dev/projects/c1e6eee2-a36f-4cd6-990b-e0d8741478dc
- **Live Site**: https://staging.pentacoop.com
- **GitHub**: [Repository URL]

## License

[Add license information]

## Credits

Website designed by [Jeff Oriecuia](https://www.jeffo.net)
