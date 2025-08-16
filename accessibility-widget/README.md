# Accessibility Widget System

A complete accessibility widget system that can be easily integrated into any website with a single CDN link.

## Features

- **Text Size Toggle**: Increase/decrease text size
- **High Contrast Mode**: Multiple contrast options
- **Dyslexia-Friendly Font**: OpenDyslexic font support
- **Seizure Safe Mode**: Disables animations and transitions
- **Vision Impaired Mode**: Enhanced visibility features
- **ADHD Friendly Mode**: Focus assistance tools
- **Cognitive Disability Support**: Simplified reading experience
- **Keyboard Navigation**: Enhanced keyboard support
- **Screen Reader Profile**: Optimized for screen readers
- **Content Scaling**: Zoom functionality
- **Readable Font**: Arial font for better readability
- **Title/Link Highlighting**: Visual emphasis on important elements
- **Text Alignment**: Left, center, right alignment options
- **Line Height & Letter Spacing**: Typography adjustments
- **Focus Spotlight**: Highlight focused elements
- **Reduce Motion**: Disable animations
- **Color Adjustments**: Various color modes
- **Text Magnifier**: Hover to magnify text
- **Sound Controls**: Mute audio/video
- **Image Hiding**: Hide decorative images
- **Animation Control**: Stop all animations
- **Custom Cursors**: Large cursor options

## Quick Setup

### 1. Deploy Backend to Render

1. **Fork/Clone this repository**
2. **Create MongoDB Atlas Database**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free cluster
   - Get your connection string

3. **Deploy to Render**:
   - Go to [Render](https://render.com)
   - Create new Web Service
   - Connect your GitHub repository
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`
   - Add environment variable: `MONGO_URI` = your MongoDB connection string

### 2. Register Your Domain

1. Visit your deployed app: `https://your-app-name.onrender.com`
2. Enter your domain name (e.g., `example.com`)
3. Click "Register Domain"

### 3. Add Widget to Your Website

Add these two lines to your HTML `<head>` section:

```html
<script src="https://your-app-name.onrender.com/widget"></script>
<link rel="stylesheet" href="https://your-app-name.onrender.com/widget/style">
```

That's it! The widget will automatically appear on your website.

## API Endpoints

- `GET /` - Registration page
- `POST /api/register` - Register a domain
- `GET /api/domains` - Get all registered domains
- `GET /api/check/:domain` - Check if domain is registered
- `GET /widget` - Widget JavaScript file
- `GET /widget/style` - Widget CSS file

## Project Structure

```
accessibility-widget/
├── backend/
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   ├── models/
│   │   └── domain.js      # MongoDB schema
│   └── public/
│       └── register.html  # Registration page
├── widget/
│   ├── index.js           # Widget JavaScript
│   └── style.css          # Widget styles
└── demo-site/
    └── index.html         # Demo website
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=5000
```

## Local Development

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp env.example .env
   # Edit .env with your MongoDB URI
   ```

3. **Run the server**:
   ```bash
   npm run dev
   ```

4. **Test locally**:
   - Visit `http://localhost:5000` for registration
   - Add widget to any local website

## Customization

### Styling
Edit `widget/style.css` to customize the widget appearance.

### Features
Modify `widget/index.js` to add/remove accessibility features.

### Backend
Extend `backend/server.js` to add more API endpoints.

## Security Features

- Domain verification before widget loads
- CORS enabled for cross-origin requests
- Input validation and sanitization
- Error handling and logging

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT License - feel free to use and modify as needed.

## Support

For issues or questions, please open an issue on GitHub.
