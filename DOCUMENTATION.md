# Countdown Timer Pro - Technical Documentation

## API Reference

### Props Interface

\`\`\`typescript
interface CountdownTimerProProps {
  // Time Configuration
  mode: "specific" | "dynamic"
  targetDate: string
  targetTimezone: string
  dynamicDurationMinutes: number
  resetOnSession: boolean
  resetOnCookie: boolean

  // Display Configuration
  showDays: boolean
  showHours: boolean
  showMinutes: boolean
  showSeconds: boolean
  layout: "horizontal" | "vertical"
  spacing: number

  // Styling
  fontFamily: string
  fontSize: number
  textColor: string
  backgroundColor: string

  // Localization
  language: "en" | "es" | "fr" | "de" | "pt"
  labelDays?: string
  labelHours?: string
  labelMinutes?: string
  labelSeconds?: string
  warningText?: string
  expiredText?: string

  // Actions
  actionOnZero: "none" | "redirect" | "hide" | "show" | "webhook"
  redirectUrl?: string
  elementToToggleId?: string
  webhookUrl?: string

  // Analytics
  sendGAEvent: boolean
  gaEventName?: string

  // Advanced
  showErrorMessages: boolean
  enableAccessibility: boolean
  id?: string
}
\`\`\`

### Webhook Payload

When a webhook is triggered, the following JSON payload is sent:

\`\`\`json
{
  "timerId": "countdown-abc123",
  "status": "completed",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "timezone": "America/New_York",
  "language": "en"
}
\`\`\`

### Google Analytics Events

The plugin sends the following event structure:

\`\`\`javascript
gtag('event', 'timer_completed', {
  'event_category': 'Countdown Timer',
  'event_label': 'countdown-abc123',
  'value': 1,
  'custom_parameter_language': 'en',
  'custom_parameter_timezone': 'UTC'
})
\`\`\`

## Error Handling

### Validation Errors

The plugin validates inputs and displays user-friendly error messages:

- **Invalid Date Format**: Shown when targetDate is not a valid date string
- **Invalid URL Format**: Shown for malformed redirect or webhook URLs
- **Element Not Found**: Shown when elementToToggleId doesn't exist in DOM
- **Webhook Error**: Shown when webhook execution fails
- **GA Not Found**: Shown when Google Analytics is not available

### Error Display

Errors are displayed in a red alert box above the timer when `showErrorMessages` is enabled. Each error includes:
- Localized error message
- Clear description of the issue
- Suggestions for resolution (where applicable)

## Accessibility Features

### ARIA Attributes

- `role="timer"` on main container
- `aria-live="polite"` for live updates
- `aria-atomic="true"` for complete announcements
- `aria-label` with full timer description
- `aria-hidden="true"` on decorative elements

### Screen Reader Support

- Complete timer state announced on changes
- Individual time units labeled clearly
- Status changes (expired) announced immediately
- Error messages announced as alerts

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Proper tab order maintained
- Focus indicators visible
- No keyboard traps

## Performance Considerations

### Memory Management

- Automatic cleanup of intervals on unmount
- Efficient re-rendering with React hooks
- Minimal DOM manipulation

### Storage Usage

- localStorage used only for dynamic mode persistence
- Automatic cleanup of expired storage keys
- Configurable storage behavior

### Network Requests

- Webhook requests include timeout handling
- Failed requests don't block timer operation
- Retry logic for critical operations

## Browser Compatibility

### Supported Browsers

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Required Features

- ES6+ JavaScript support
- localStorage API
- Fetch API
- CSS Grid and Flexbox

## Troubleshooting

### Common Issues

1. **Timer not starting**
   - Check date format (YYYY-MM-DDTHH:MM:SS)
   - Verify timezone setting
   - Ensure target date is in the future

2. **Webhook not executing**
   - Verify URL format (must be HTTPS)
   - Check CORS settings on target server
   - Ensure server accepts POST requests

3. **Element toggle not working**
   - Verify element ID exists in DOM
   - Check element is not in shadow DOM
   - Ensure ID is unique on page

4. **Analytics not tracking**
   - Verify Google Analytics is loaded
   - Check gtag function availability
   - Ensure tracking ID is configured

### Debug Mode

Enable `showErrorMessages` to see detailed error information during development.

## Best Practices

### Performance

- Use dynamic mode sparingly on high-traffic sites
- Implement proper caching for webhook endpoints
- Consider timezone impact on server load

### UX Design

- Always provide fallback content for expired timers
- Use appropriate urgency in messaging
- Test across different screen sizes
- Consider color contrast for accessibility

### SEO Considerations

- Timer content is not indexed by search engines
- Use static content for important information
- Implement proper meta tags for social sharing

## Integration Examples

### E-commerce Flash Sale

\`\`\`javascript
// Configuration for 24-hour flash sale
{
  mode: "specific",
  targetDate: "2024-12-25T23:59:59",
  targetTimezone: "America/New_York",
  actionOnZero: "hide",
  elementToToggleId: "flash-sale-banner",
  sendGAEvent: true,
  gaEventName: "flash_sale_ended"
}
\`\`\`

### Webinar Registration

\`\`\`javascript
// Configuration for webinar countdown
{
  mode: "specific", 
  targetDate: "2024-06-15T14:00:00",
  targetTimezone: "UTC",
  actionOnZero: "webhook",
  webhookUrl: "https://api.webinar.com/start-session",
  language: "en",
  warningText: "Webinar starts in:"
}
\`\`\`

### Limited Time Offer

\`\`\`javascript
// Configuration for 30-minute offer
{
  mode: "dynamic",
  dynamicDurationMinutes: 30,
  resetOnSession: false,
  actionOnZero: "redirect",
  redirectUrl: "https://site.com/offer-expired",
  sendGAEvent: true,
  gaEventName: "offer_expired"
}
