# Portfolio - Customization Guide

This portfolio is inspired by [Ramy Baiche's portfolio](https://baicheramy.com) and built with Next.js 16, React 19, and Tailwind CSS v4.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the result.

3. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Customization

### Personal Information

Update `lib/data.ts` with your own information:

```typescript
export const personalData = {
  name: {
    first: "Your First Name",
    middle: "Your Middle Name", // optional
    last: "Your Last Name",
  },
  title: "Your Title",
  bio: "Your full bio...",
  shortBio: "Your short bio...",
  email: "your.email@example.com",
  location: "Your City, Country",
  avatar: "/your-avatar.jpg", // Add your image to public folder
};
```

### Projects

Add your projects in `projectsData` array. For each project, you can specify:

- `title`: Project name
- `description`: Brief description
- `link`: URL to the project
- `images`: Array of image paths (add images to public folder)
- `tags`: Technology stack
- `featured`: Whether to show prominently

### Experience

Add your work experience in `experienceData` array. Each entry includes:

- Company and role information
- Employment dates and location
- Achievement bullets

### Skills

Update `skillsData` with your top skills. Each skill has:

- A number (automatically displayed)
- Title and description

### Social Links

Update `socialLinks` with your social media profiles. Supported icons:

- GitHub
- LinkedIn
- Twitter
- Email (for contact)

### Styling

The portfolio uses CSS variables for theming. You can customize colors in `app/globals.css`:

```css
:root {
  --background: #0a0a0a;  /* Main background */
  --foreground: #ededed;  /* Main text color */
  --card-bg: #1a1a1a;     /* Card background */
  --border: rgba(255, 255, 255, 0.08); /* Border color */
  --text-dimmed: #a1a1a1; /* Dimmed text */
  --text-muted: #737373;  /* Muted text */
}
```

### Metadata

Update `app/layout.tsx` to change:

- Page title
- Description
- Open Graph images
- Twitter card settings

### Adding Images

Place your images in the `public/` folder:

- `avatar.jpg` - Your profile picture
- `project1-1.jpg`, `project1-2.jpg` - Project screenshots
- `company1.svg` - Company logos

## Components Structure

```
components/
├── navigation.tsx    - Top navigation bar
├── hero.tsx         - Hero section with banner
├── projects.tsx     - Projects grid
├── experience.tsx   - Experience timeline
├── skills.tsx       - Skills list
├── about.tsx        - About section
└── footer.tsx       - Footer with social links
```

## Features Included

- ✅ Dark theme (optimized for dark mode)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations on scroll
- ✅ Expandable experience entries
- ✅ Project cards with hover effects
- ✅ Clean, modern typography
- ✅ Semantic HTML structure
- ✅ Accessibility considerations

## Optional Enhancements

To add more features from the original design, consider:

1. **Light/Dark mode toggle** - Add theme switcher
2. **Starfield animation** - Canvas-based starfield in hero
3. **Project image carousels** - Swipeable project images
4. **3D animations** - Three.js powered visuals
5. **Custom cursor** - Custom cursor for desktop
6. **Floating dock navigation** - macOS-style dock nav

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Deploy automatically

### Other Platforms

Build your project and deploy the `.next` folder:

```bash
npm run build
```

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

---

Built with ❤️ using Next.js and Tailwind CSS
