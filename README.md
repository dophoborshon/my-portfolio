# Personal Portfolio Website

A clean, modern, and responsive portfolio website built with plain HTML, CSS, and JavaScript. Perfect for beginner web developers looking to showcase their work.

## Features

- Responsive design (mobile, tablet, desktop)
- Dark/Light mode toggle with system preference detection
- Smooth scroll navigation
- Mobile-friendly hamburger menu
- Project cards with hover effects
- Contact form with validation
- Back-to-top button
- Scroll animations
- Semantic HTML for accessibility
- Fast loading (no dependencies)

## Quick Start

1. **Clone or download** this repository

2. **Open `index.html`** in your browser - that's it! No build tools needed.

3. **Start customizing** by editing the files (see below)

## File Structure

```
portfolio/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles (well-organized with comments)
├── js/
│   └── main.js         # JavaScript functionality
└── README.md           # This file
```

## How to Customize

### 1. Change Your Name & Bio

Open `index.html` and find these sections:

```html
<!-- Your name -->
<h1 class="hero__name">John Doe</h1>

<!-- Your tagline -->
<p class="hero__tagline">
    Frontend Developer building clean, fast web experiences
</p>
```

Update the About section with your bio:

```html
<p class="about__description">
    I'm a passionate frontend developer...
</p>
```

### 2. Change Colors

Open `css/styles.css` and find the `:root` section at the top:

```css
:root {
    /* Primary accent color - CHANGE THIS */
    --color-primary: #3b82f6;        /* Main blue */
    --color-primary-light: #60a5fa;  /* Lighter blue */
    --color-primary-dark: #2563eb;   /* Darker blue */
}
```

**Popular color combinations:**

| Style | Primary | Light | Dark |
|-------|---------|-------|------|
| Blue | `#3b82f6` | `#60a5fa` | `#2563eb` |
| Purple | `#8b5cf6` | `#a78bfa` | `#7c3aed` |
| Green | `#10b981` | `#34d399` | `#059669` |
| Orange | `#f59e0b` | `#fbbf24` | `#d97706` |
| Pink | `#ec4899` | `#f472b6` | `#db2777` |

### 3. Add Your Projects

Find the Projects section in `index.html` and update each project card:

```html
<article class="project-card">
    <div class="project-card__image">
        <img 
            src="your-project-screenshot.jpg"  <!-- Add your image -->
            alt="Project name screenshot"
            loading="lazy"
        >
        <!-- ... -->
    </div>
    
    <div class="project-card__content">
        <h3 class="project-card__title">Your Project Name</h3>
        <p class="project-card__description">
            Your project description here
        </p>
        
        <div class="project-card__tags">
            <span class="tag">HTML</span>
            <span class="tag">CSS</span>
            <!-- Add your tech stack tags -->
        </div>
        
        <div class="project-card__links">
            <a href="https://your-live-demo.com" class="project-card__btn">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
            <a href="https://github.com/yourusername/project" class="project-card__btn">
                <i class="fab fa-github"></i> Code
            </a>
        </div>
    </div>
</article>
```

### 4. Update Social Links

Find the Contact section and update these links:

```html
<a href="mailto:your.email@example.com">your.email@example.com</a>

<a href="https://github.com/yourusername">GitHub</a>
<a href="https://linkedin.com/in/yourusername">LinkedIn</a>
```

### 5. Add Your Photo

Replace the placeholder image in the About section:

```html
<img 
    src="path/to/your-photo.jpg"  <!-- Add your photo -->
    alt="Your Name - Frontend Developer"
    class="about__img"
>
```

**Tip:** Use a square image (400x400px or larger) for best results.

### 6. Add More Skills

Find the Skills section and duplicate a skill card:

```html
<div class="skill-card">
    <i class="fab fa-YourIcon skill-card__icon"></i>
    <span class="skill-card__name">Skill Name</span>
</div>
```

**Available Font Awesome icons for tech:**
- `fa-html5` - HTML
- `fa-css3-alt` - CSS
- `fa-js` - JavaScript
- `fa-react` - React
- `fa-vuejs` - Vue.js
- `fa-angular` - Angular
- `fa-node-js` - Node.js
- `fa-python` - Python
- `fa-git-alt` - Git
- `fa-github` - GitHub
- `fa-npm` - npm
- `fa-figma` - Figma

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Learning Points

This codebase is designed to help you learn:

1. **CSS Custom Properties** - See how colors and spacing are defined in `:root`
2. **Flexbox & Grid** - Modern layout techniques used throughout
3. **Responsive Design** - Media queries at the bottom of `styles.css`
4. **Semantic HTML** - Proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`
5. **Accessibility** - `aria-labels`, `alt` text, focus styles, keyboard navigation
6. **JavaScript DOM Manipulation** - Event listeners and class toggling in `main.js`

## Going Further

Once you're comfortable, consider:

- [ ] Adding a blog section
- [ ] Integrating a contact form service (Formspree, Netlify Forms)
- [ ] Adding project filtering by technology
- [ ] Implementing page transitions
- [ ] Adding a loading animation

## License

Free to use for personal portfolios. No attribution required.

---

Built with ❤️ by a fellow developer. Good luck with your job hunt!
