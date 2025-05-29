# Countdown Timer Pro - Framer Plugin

A professional-grade countdown timer plugin for Framer with advanced features including internationalization, timezone support, accessibility, and comprehensive error handling.

## 🚀 Features

### Core Functionality
- **Two Countdown Modes**: Specific date/time or dynamic duration
- **Timezone Support**: Accurate countdown across different timezones
- **Persistent State**: Maintains countdown across page reloads (configurable)
- **Responsive Design**: Works perfectly on all device sizes

### Internationalization (i18n)
- **5 Languages Supported**: English, Spanish, French, German, Portuguese
- **Auto-translation**: Automatic label translation based on selected language
- **Custom Labels**: Override auto-translations with custom text
- **Localized Error Messages**: Error messages in the selected language

### Accessibility (A11y)
- **ARIA Labels**: Comprehensive screen reader support
- **Live Regions**: Real-time updates announced to assistive technologies
- **Keyboard Navigation**: Full keyboard accessibility
- **Semantic HTML**: Proper role and structure attributes

### Advanced Actions
- **Redirect**: Navigate to a specific URL when timer expires
- **Element Toggle**: Hide or show page elements by ID
- **Webhook Integration**: Execute HTTP requests to external services
- **Google Analytics**: Track timer completion events

### Error Handling & Validation
- **Input Validation**: Real-time validation of URLs, dates, and configurations
- **User-Friendly Errors**: Clear error messages in the user's language
- **Graceful Degradation**: Continues working even with configuration issues
- **Debug Mode**: Optional error display for troubleshooting

## 📋 Configuration Options

### Time Configuration
- **Mode**: Choose between specific date/time or dynamic duration
- **Target Date**: Set the countdown target (YYYY-MM-DDTHH:MM:SS format)
- **Timezone**: Select from major world timezones
- **Duration**: Set dynamic countdown duration in minutes (1-10080)
- **Reset Options**: Control persistence across sessions and cookies

### Display Settings
- **Show/Hide Elements**: Toggle days, hours, minutes, seconds
- **Layout**: Horizontal or vertical arrangement
- **Spacing**: Adjust gap between elements (0-16)

### Styling
- **Font Family**: Custom font selection
- **Font Size**: Adjustable from 16px to 120px
- **Colors**: Customizable text and background colors

### Localization
- **Language**: Select from 5 supported languages
- **Custom Labels**: Override auto-translations
- **Warning Text**: Customizable pre-timer message
- **Expired Text**: Customizable post-timer message

### Actions
- **Redirect**: Navigate to URL on completion
- **Element Control**: Hide/show elements by ID
- **Webhook**: Execute HTTP POST requests
- **Analytics**: Google Analytics event tracking

### Advanced
- **Error Display**: Toggle error message visibility
- **Accessibility**: Enable/disable accessibility features

## 🛠 Installation

1. Download the plugin file
2. Import into your Framer project
3. Drag the component onto your canvas
4. Configure using the properties panel

## 💡 Usage Examples

### Product Launch Countdown
\`\`\`
Mode: Specific Date/Time
Target Date: 2024-12-25T00:00:00
Timezone: America/New_York
Action: Redirect to launch page
\`\`\`

### Limited Time Offer
\`\`\`
Mode: Dynamic Duration
Duration: 30 minutes
Action: Hide offer element
Reset: On session (new visitors get fresh timer)
\`\`\`

### Event Registration
\`\`\`
Mode: Specific Date/Time
Target Date: 2024-06-15T18:00:00
Timezone: Europe/London
Action: Webhook to registration system
Analytics: Track completion events
\`\`\`

## 🌍 Supported Languages

- **English** (en) - Default
- **Spanish** (es) - Español
- **French** (fr) - Français
- **German** (de) - Deutsch
- **Portuguese** (pt) - Português

## 🕐 Supported Timezones

- UTC
- America/New_York (EST/EDT)
- America/Los_Angeles (PST/PDT)
- Europe/London (GMT/BST)
- Europe/Paris (CET/CEST)
- Asia/Tokyo (JST)
- Australia/Sydney (AEST/AEDT)

## 🔧 Technical Requirements

- Framer (latest version recommended)
- Modern web browser with JavaScript enabled
- For webhooks: HTTPS endpoint that accepts POST requests
- For analytics: Google Analytics (gtag) implementation

## 📞 Support

For technical support, feature requests, or bug reports:
- Email: p.a.a.n.v.inc@gmail.com

## 📄 License

Commercial license included with purchase. See LICENSE.md for full terms.

## 🔄 Version History

### v2.0.0 (Current)
- Added internationalization support
- Implemented timezone handling
- Enhanced accessibility features
- Improved error handling and validation
- Added comprehensive documentation

### v1.0.0
- Initial release
- Basic countdown functionality
- Simple styling options
