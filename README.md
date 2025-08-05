## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Radix UI + Custom Components
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/             # Reusable components
│   └── ui/                # Base UI components
│       └── button.tsx     # Button component
└── lib/                   # Utility functions
    ├── utils.ts           # Class name combination utility
    └── variants.ts        # Component variant definitions
```

## 🛠️ Development Environment Setup

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation and Running

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Run Development Server**

   ```bash
   npm run dev
   ```

3. **Check in Browser**
   - Access http://localhost:3000

## 🎨 Key Features

- **Responsive Design**: Support for all devices from mobile to desktop
- **Dark Mode**: Automatic dark mode support
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance Optimization**: Utilizing Next.js automatic optimization features
- **Type Safety**: Complete type checking with TypeScript

## 📝 Development Guidelines

### Component Writing Rules

- Follow single responsibility principle
- Design reusable components
- Define clear Props interfaces
- Consider accessibility

### Styling Rules

- Use TailwindCSS class names
- Combine class names with `cn()` utility
- Maintain consistent design system

### Code Quality

- Use TypeScript strict mode
- Follow ESLint rules
- Write Korean comments

## 🚀 Deployment

```bash
npm run build
npm run start
```
