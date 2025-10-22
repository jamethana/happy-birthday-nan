# Happy Birthday Nan! 🎉

A beautiful birthday celebration website with floating images, animations, and a countdown timer to Nan's birthday.

## Features

- 🎂 Dynamic age calculation based on Nan's actual birthday (November 23rd, 1995)
- 🎆 Floating images with smooth animations
- 🎇 Firework background animation
- ⏰ Countdown timer to next birthday
- 🎨 Pastel gradient background
- 📱 Responsive design

## Deployment

This website is automatically deployed to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Push to GitHub**: Push this repository to GitHub
2. **Enable GitHub Pages**: 
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"
3. **Automatic Deployment**: The workflow will automatically deploy on every push to the `main` branch

### Manual Deployment

You can also trigger deployment manually:
- Go to the "Actions" tab in your repository
- Select "Deploy to GitHub Pages" workflow
- Click "Run workflow"

## Local Development

To run locally, simply open `index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

## File Structure

```
├── index.html          # Main HTML file
├── style.css          # Styles and animations
├── script.js          # JavaScript logic
├── images/            # Birthday images
├── firework_gif/      # Firework animation
└── .github/workflows/ # CI/CD configuration
```

## Customization

- **Birthday Date**: Update `NAN_BIRTHDAY` in `script.js`
- **Images**: Add images to the `/images/` folder
- **Colors**: Modify the gradient in `style.css`
- **Timing**: Adjust animation timings in `script.js`

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

---

Made with ❤️ for Nan's birthday celebration!
