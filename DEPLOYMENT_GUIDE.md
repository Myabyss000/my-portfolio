# Static Site Deployment Guide

Your portfolio website is now ready for static deployment! Here's how to deploy it for FREE using GitHub Pages.

## 🚀 Quick Setup (5 minutes)

### Step 1: Set up Formspree (Contact Form)
1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for a free account (allows 50 submissions/month)
3. Create a new form and copy your form ID (e.g., `mqazwxyz`)
4. In `index.html`, replace `YOUR_FORM_ID` with your actual form ID:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Step 2: Deploy to GitHub Pages
1. Create a new GitHub repository (make it public)
2. Upload all your files to the repository
3. Go to repository Settings → Pages
4. Select "Deploy from a branch" → "main" branch
5. Your site will be live at: `https://yourusername.github.io/repository-name`

### Step 3: Update Resume (Optional)
- Replace `assets/Arghya_Adhikary_Resume.pdf` with your actual resume
- Keep the same filename or update the HTML link

## 📂 Files Ready for Deployment

✅ **index.html** - Main website file
✅ **style.css** - Custom styling
✅ **script.js** - Interactive functionality with form handling
✅ **assets/profile.jpg** - Your profile image
✅ **assets/Arghya_Adhikary_Resume.pdf** - Sample resume (replace with yours)

## 🎯 Features Included

### ✨ Contact Form
- **Service**: Formspree (free tier: 50 submissions/month)
- **Features**: 
  - Email notifications to your inbox
  - Spam protection
  - Loading states and success/error messages
  - Fallback to email client if service fails

### 📄 Resume Download
- Direct PDF download
- Proper file naming
- Download tracking (via hosting provider analytics)

### 🌐 Static Hosting Benefits
- **Zero Maintenance**: No server-side code to maintain
- **Free Hosting**: GitHub Pages is completely free
- **SSL Certificate**: Automatic HTTPS
- **Global CDN**: Fast loading worldwide
- **Custom Domain**: Add your own domain later (optional)

## 🛠️ Alternative Deployment Options

### Option 1: Netlify (Recommended)
1. Drag and drop your folder to [netlify.com](https://netlify.com)
2. Automatic form handling (100 submissions/month free)
3. Custom domain support
4. Automatic deployments from GitHub

### Option 2: Vercel
1. Import from GitHub at [vercel.com](https://vercel.com)
2. Automatic deployments
3. Custom domains included

### Option 3: GitHub Pages (Simplest)
1. Upload to GitHub repository
2. Enable Pages in settings
3. Zero configuration needed

## 🔧 Customization

### Update Contact Information
- Email: Change `arghyaa771@gmail.com` in both HTML and JavaScript
- Social links: Update GitHub, LinkedIn, Instagram URLs
- Phone/Location: Update in the contact section

### Styling
- Colors: Modify Tailwind classes or add custom CSS
- Fonts: Update Google Fonts link in HTML head
- Animations: Customize in `style.css`

### Content
- About section: Update your bio and skills
- Experience: Add/modify work experience
- Projects: Add your project showcase

## 📊 Analytics (Optional)

Add Google Analytics to track visitors:
```html
<!-- Add before closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🚦 Testing Before Deployment

1. Open `index.html` in your browser
2. Test all links and navigation
3. Test the contact form (after setting up Formspree)
4. Check resume download
5. Test on mobile devices

## 🌟 You're All Set!

Your portfolio is now a modern, professional static website with:
- ✅ Responsive design
- ✅ Dark/light theme toggle
- ✅ Contact form that actually works
- ✅ Resume download
- ✅ Professional styling
- ✅ SEO optimized
- ✅ Fast loading
- ✅ Zero maintenance

**Total Cost: $0** (using free tiers)
**Maintenance: Minimal** (just update content as needed)

Need help? The code is clean, well-commented, and easy to modify!
