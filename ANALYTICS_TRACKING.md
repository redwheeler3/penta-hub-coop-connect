# Google Analytics 4 Tracking Implementation

This document outlines all the analytics tracking events implemented across the Penta Housing Co-Op website.

## Custom Dimensions Setup Required

Before viewing custom data in GA4, you need to register these custom dimensions in Google Analytics:

### Navigation Events
- `destination` - Where the user navigated to
- `location` - Where the navigation originated (desktop/mobile/logo)

### CTA Click Events
- `button_name` - Name of the CTA button clicked
- `button_location` - Location of the button on the page

### Resource Link Events
- `resource_category` - Category of the resource (e.g., "File Repository")
- `link_name` - Specific link clicked within the resource

### Form Events
- `form_name` - Name of the form (e.g., "Email Signup")
- `error_type` - Type of error that occurred

### Link Events
- `link_name` - Name of the external link
- `link_url` - URL of the external link


### Accordion Events
- `accordion_name` - Name of the accordion expanded

## Tracking Events by Page

### All Pages
- **page_view**: Automatically tracked on every page load
  - `page_path`: Current URL path
  - `page_title`: Page title
  - `page_location`: Full URL
  - `page_referrer`: Referring URL
- **scroll_depth_25**, **scroll_depth_50**, **scroll_depth_75**, **scroll_depth_100**: Scroll milestone events
- **time_on_page_30s**, **time_on_page_60s**: Time engagement events

### Navigation Component (Global)
- **navigation_click**: Tracks all navigation menu clicks
  - `destination`: Target page (home/about/apply/members)
  - `location`: Origin (desktop/mobile/logo)

### Home Page (Index.tsx)
- **cta_click**: Call-to-action button clicks
  - "Learn More" → button_location: 'hero'
  - "Apply Now" → button_location: 'hero'
  - "Start Your Application" → button_location: 'bottom_cta'
- **external_link_click**: External link tracking
  - Designer website link → link_name: 'Designer Website'

### About Page (About.tsx)
- **cta_click**: Call-to-action button clicks
  - "Join Our Community" → button_location: 'About Penta Section'
- **external_link_click**: External resource links
  - Point Grey Guide
  - CHF BC
  - CHF Canada

### Apply Page (Apply.tsx)
- **cta_click**: Application form CTA
  - "Complete Application Form" → button_location: 'Application Form'
- **form_start**: When user focuses on email input
  - `form_name`: 'Email Signup'
- **form_submit**: When email signup form is submitted
  - `form_name`: 'Email Signup'
- **form_error**: When form validation or submission fails
  - `error_type`: 'Missing Information' or 'Submission Failed'
- **form_abandonment**: When user starts form but navigates away
  - Tracks if email entered but form not submitted
- **internal_navigation**: Internal page navigation
  - "Learn More About Our Community" → destination: 'About'

### Members Page (Members.tsx)
- **resource_link_click**: Resource button clicks
  - `resource_category`: Category name (File Repository, Community Forum, Maintenance)
  - `link_name`: Specific link clicked
- **accordion_click**: Accordion expansion tracking
  - "TELUS Email Help" accordion

## Event Implementation Details

### Scroll Depth Tracking
- Implemented via `useScrollDepth` hook
- Tracks milestones: 25%, 50%, 75%, 100%
- Each milestone tracked only once per page load
- Passive event listener for performance

### Time on Page Tracking
- Implemented via `useTimeOnPage` hook
- Tracks at 30 and 60 second intervals
- Uses interval-based checking (every 1 second)
- Each milestone tracked only once per page load

### Form Abandonment Tracking
- Tracks when user:
  1. Starts filling out the email form
  2. Enters an email address
  3. Navigates away without submitting
- Uses `beforeunload` event
- Only triggers if form was started and email entered

### Navigation Tracking
- Distinguishes between:
  - Desktop menu clicks
  - Mobile menu clicks
  - Logo clicks
- Tracks destination page for all navigation events

## Google Analytics 4 Configuration

### Steps to Configure Custom Dimensions:

1. Go to Google Analytics 4 Admin → Data display → Custom definitions
2. Click "Create custom dimension" for each parameter listed above
3. Set:
   - Dimension name: User-friendly name (e.g., "Button Location")
   - Scope: Event
   - Event parameter: Exact parameter name (e.g., `button_location`)
   - Description: Brief description of what it tracks

### Recommended Reports to Create:

1. **Navigation Flow Report**
   - Event: `navigation_click`
   - Dimensions: `destination`, `location`

2. **CTA Performance Report**
   - Event: `cta_click`
   - Dimensions: `button_name`, `button_location`

3. **Form Funnel Report**
   - Events: `form_start`, `form_submit`, `form_error`, `form_abandonment`
   - Dimension: `form_name`, `error_type`

4. **Resource Engagement Report**
   - Event: `resource_link_click`
   - Dimensions: `resource_category`, `link_name`

5. **Content Engagement Report**
   - Events: `scroll_depth_25`, `scroll_depth_50`, `scroll_depth_75`, `scroll_depth_100`, `time_on_page_30s`, `time_on_page_60s`

6. **External Links Report**
   - Event: `external_link_click`
   - Dimensions: `link_name`, `link_url`

## Data Collection Timeline

- Custom dimensions will appear in GA4 within 24-48 hours of first data collection
- Historical data before dimension registration won't be available
- All events are sent to GA4 immediately when triggered

## Testing Tracking Implementation

Use the GA4 DebugView to verify events:
1. Install Google Analytics Debugger Chrome extension
2. Navigate through the site
3. Check DebugView in GA4 to see events in real-time
4. Verify all custom parameters are being sent correctly
