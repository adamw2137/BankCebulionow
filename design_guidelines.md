# Design Guidelines for Bank Cebulionów

## Design Approach
**System-Based Approach** using Material Design principles adapted for financial applications, emphasizing trust, clarity, and data organization. The playful name "Bank Cebulionów" suggests an educational or gamified banking experience, so we'll balance professionalism with approachability.

## Core Design Principles
1. **Trust & Security**: Clean, professional interface that conveys reliability
2. **Clarity First**: Clear visual hierarchy for forms, data, and actions
3. **Polish Language Excellence**: Proper typography for Polish diacritics (ą, ć, ę, ł, ń, ó, ś, ź, ż)
4. **Data Visibility**: Easy-to-scan account information and admin tables

## Color Palette

### Light Mode
- **Primary Brand**: 210 100% 45% (Deep blue - trust and stability)
- **Primary Hover**: 210 100% 35%
- **Secondary**: 160 70% 45% (Teal - financial growth)
- **Success**: 140 70% 45% (Account balance positive states)
- **Background**: 0 0% 98%
- **Surface**: 0 0% 100%
- **Text Primary**: 220 15% 20%
- **Text Secondary**: 220 10% 45%
- **Border**: 220 15% 85%

### Dark Mode
- **Primary Brand**: 210 90% 60%
- **Primary Hover**: 210 90% 70%
- **Secondary**: 160 60% 55%
- **Success**: 140 60% 55%
- **Background**: 220 20% 12%
- **Surface**: 220 18% 16%
- **Text Primary**: 0 0% 95%
- **Text Secondary**: 220 10% 70%
- **Border**: 220 15% 25%

## Typography
- **Primary Font**: Inter (Google Fonts) - excellent Polish character support
- **Headings**: 
  - H1: 2.5rem (40px), font-weight 700, letter-spacing -0.02em
  - H2: 1.875rem (30px), font-weight 600
  - H3: 1.5rem (24px), font-weight 600
- **Body Text**: 1rem (16px), font-weight 400, line-height 1.6
- **Labels/Small**: 0.875rem (14px), font-weight 500
- **Buttons**: 1rem (16px), font-weight 600, letter-spacing 0.01em

## Layout System
**Spacing Units**: Use Tailwind spacing primitives of 2, 4, 6, 8, 12, 16, 20, 24
- Compact spacing: p-4, gap-2, space-y-4
- Standard spacing: p-6, gap-4, space-y-6
- Generous spacing: p-8, gap-6, space-y-8
- Section spacing: py-16, py-20, py-24

## Component Library

### Authentication Pages (Login/Register)
- Centered card design with max-w-md
- Card elevation: shadow-2xl with rounded-2xl
- Background: Subtle gradient from primary/5 to secondary/5
- Logo/Title area: mb-8 with primary color accent
- Input fields: h-12 with rounded-lg, focus ring-2 ring-primary
- Buttons: h-12 w-full, rounded-lg
- "Admin login" button: Fixed top-4 right-4, size sm, variant outline

### Forms & Inputs
- **Text Inputs**: 
  - Height: h-12
  - Border: border-2, rounded-lg
  - Focus state: ring-2 ring-primary, border-primary
  - Labels: block mb-2, font-medium, text-sm
  - Dark mode: Proper background colors for inputs (bg-surface)
- **Buttons**:
  - Primary: bg-primary, text-white, h-12
  - Secondary: variant outline, border-2
  - Hover states: scale-[1.02] transition
- **Error States**: Red-500 border, text-red-600 message below input

### Dashboard Layout
- **Header Bar**: 
  - Fixed or sticky top, h-16
  - Shadow-md, bg-surface
  - Welcome text on left, logout button on right
  - px-6 horizontal padding
- **Main Content**:
  - Container max-w-7xl mx-auto px-6 py-8
  - Account balance card: Prominent display with large text (text-4xl font-bold)
  - Balance card styling: bg-gradient-to-br from-primary to-secondary, text-white, p-8, rounded-2xl

### Admin Dashboard
- **Account Table**:
  - Full-width responsive table with rounded-lg overflow-hidden
  - Striped rows: even:bg-surface/50
  - Editable cells: Click to edit with inline form styling
  - Column headers: bg-primary/10, font-semibold, py-4
  - Row padding: px-6 py-4
  - Action buttons: Small size, icon-only for edit/save
- **Edit Mode**:
  - Inline editing with input fields appearing in cells
  - Save/Cancel buttons appear on row hover
  - Highlight edited row: bg-secondary/10

### Navigation
- **User Navigation**: Minimal - just logout button in header
- **Admin Navigation**: Logo/title left, admin indicator center, logout right

## Interaction Patterns
- **Loading States**: Spinner or skeleton screens for data fetching
- **Success Messages**: Toast notifications, top-right, slide-in animation
- **Transitions**: All state changes with transition-all duration-200
- **Focus Management**: Clear focus indicators for keyboard navigation

## Accessibility
- WCAG AA compliant contrast ratios
- All interactive elements keyboard accessible
- Proper ARIA labels for Polish language screen readers
- Form validation with clear error messages
- Dark mode with proper input field contrast

## Responsive Behavior
- Mobile-first approach
- Login/Register cards: Full width on mobile (max-w-full px-4), centered on desktop
- Admin table: Horizontal scroll on mobile, card-based layout alternative
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

## Visual Enhancements
- Subtle animations: No excessive motion, focus on functional feedback
- Card shadows: Consistent elevation system (shadow-sm, shadow-md, shadow-2xl)
- Micro-interactions: Button press states, input focus, hover effects
- Border radius: Consistent use of rounded-lg (8px) and rounded-2xl (16px)

## Images
**No hero images required** - This is a utility application focused on forms and data. Background can use subtle gradients or geometric patterns if desired for visual interest on auth pages.