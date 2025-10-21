# Pawgrammers Design System
## Dropbox-Inspired Aesthetic

This document outlines the design system implemented for Pawgrammers, heavily influenced by Dropbox's clean, modern, and inviting aesthetic.

---

## 🎨 Color Palette

### Primary Colors
- **Primary Blue**: `#0061FF` - Main brand color (Dropbox blue)
- **Primary Light**: `#3D87FF` - Hover states and accents
- **Primary Dark**: `#0051D5` - Active states

### Secondary Colors
- **Purple**: `#7B61FF` - Secondary accent color
- **Success Green**: `#00C875` - Matte green for success states
- **Error Red**: `#E2445C` - Matte red for errors
- **Warning Orange**: `#FFB020` - Matte orange for warnings

### Neutral Colors
- **Text Primary**: `#1E1919` - Main text color (Dropbox dark)
- **Text Secondary**: `#637381` - Secondary text (matte gray)
- **Background**: `#F7F9FC` - Soft blue-gray background
- **Paper**: `#FFFFFF` - Card and dialog backgrounds
- **Divider**: `#E7EBF0` - Borders and dividers

---

## 📐 Spacing & Layout

### Border Radius
- **Cards**: `12px` - Gentle rounded corners
- **Buttons**: `8px` - Subtle rounded corners
- **Chips**: `6px` - Small rounded corners
- **Dialogs**: `12px` - Consistent with cards

### Shadows (Matte & Subtle)
```css
/* Card Default */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);

/* Card Hover */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);

/* Dialog */
box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08);

/* Button Hover */
box-shadow: 0 2px 8px rgba(0, 97, 255, 0.15);
```

---

## 🔤 Typography

### Font Family
```css
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", 
             "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", 
             "Helvetica Neue", sans-serif;
```

### Headings
- **H3**: 2.25rem, weight 600, letter-spacing -0.02em
- **H4**: 1.75rem, weight 600, letter-spacing -0.02em
- **H5**: 1.5rem, weight 600
- **H6**: 1.25rem, weight 600

### Body Text
- **Body1**: 1rem, line-height 1.6
- **Body2**: 0.875rem, line-height 1.5, color #637381

### Buttons
- **Text Transform**: none (Dropbox style - no uppercase)
- **Font Weight**: 500
- **Font Size**: 0.9375rem

---

## 🧩 Components

### Buttons

#### Contained Button
- **Background**: `#0061FF`
- **Shadow**: None (flat matte style)
- **Hover**: Subtle shadow `0 2px 8px rgba(0, 97, 255, 0.2)`
- **Padding**: 10px 20px
- **Border Radius**: 8px

#### Outlined Button
- **Border**: 1.5px solid
- **Hover**: Background `rgba(0, 97, 255, 0.04)`

### Cards

#### Default State
- **Border**: 1px solid #E7EBF0
- **Shadow**: Subtle matte shadow
- **Transition**: all 0.2s ease-in-out

#### Hover State
- **Shadow**: Elevated matte shadow
- **Transform**: translateY(-2px)

### Text Fields

#### Default
- **Background**: #FFFFFF
- **Border**: 1.5px solid #DFE3E8
- **Border Radius**: 8px

#### Focus
- **Border**: 1.5px solid #0061FF
- **No shadow** (clean Dropbox style)

### Chips
- **Border Radius**: 6px
- **Font Weight**: 500
- **Font Size**: 0.8125rem
- **No glossy effects** (matte style)

---

## 🎭 Visual Effects

### Transitions
```css
transition: all 0.2s ease-in-out;
```

### Hover Effects
- **Cards**: Slight lift with shadow increase
- **Buttons**: Subtle shadow appearance
- **Links**: Color change to primary blue
- **Icons**: Background color fade-in

### Gradients (Subtle)
```css
/* Pet of the Week Banner */
background: linear-gradient(135deg, #F0F7FF 0%, #E3F2FF 100%);

/* Adoptees Banner */
background: linear-gradient(135deg, #E8F8F5 0%, #D5F2EA 100%);

/* Map Banner */
background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
```

---

## 🧭 Navigation

### Top Navigation Bar
- **Background**: #FFFFFF
- **Border**: 1px solid #E7EBF0
- **Shadow**: Minimal (0 1px 3px rgba(0, 0, 0, 0.06))

### Active State
- **Background**: rgba(0, 97, 255, 0.08)
- **Text Color**: #0061FF
- **Font Weight**: 600

### Hover State
- **Background**: rgba(0, 97, 255, 0.04)

---

## 📱 Responsive Design

### Breakpoints
- **xs**: 0px
- **sm**: 600px
- **md**: 960px
- **lg**: 1280px
- **xl**: 1920px

### Grid System
- Uses Material-UI Grid with size prop (v7 syntax)
- **Container max-width**: lg (1280px)
- **Spacing**: Consistent 3-5 units (24-40px)

---

## 🎯 Design Principles

### 1. **Matte, Not Glossy**
- No gradients on buttons
- Flat color fills
- Subtle, not dramatic shadows

### 2. **Clean & Minimal**
- Generous white space
- Clear hierarchy
- Uncluttered layouts

### 3. **Soft & Approachable**
- Rounded corners
- Soft shadows
- Friendly color palette

### 4. **Professional**
- Consistent spacing
- Aligned elements
- Professional typography

### 5. **Inviting**
- Warm, not cold
- Accessible colors
- Clear call-to-actions

---

## 🔄 Interactive States

### Focus States
- **Outline**: 2px solid #0061FF
- **Offset**: 2px

### Disabled States
- **Opacity**: 0.5
- **Cursor**: not-allowed
- **No hover effects**

### Loading States
- **Spinner**: Primary blue
- **Background**: Transparent or subtle

---

## 📋 Component Examples

### Pet Card
```tsx
<Card sx={{
  borderRadius: 3,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
  border: '1px solid #E7EBF0',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
    transform: 'translateY(-2px)',
  }
}}>
```

### Primary Button
```tsx
<Button 
  variant="contained"
  sx={{
    py: 1.5,
    px: 3,
    fontSize: '1rem',
    fontWeight: 500,
  }}
>
```

### Hero Section
```tsx
<Box sx={{
  background: 'linear-gradient(135deg, #F0F7FF 0%, #E3F2FF 100%)',
  py: 6,
  mb: 4,
}}>
```

---

## 🎨 Color Usage Guidelines

### When to Use Each Color

#### Primary Blue (#0061FF)
- Main call-to-action buttons
- Links and interactive elements
- Icons for primary actions
- Active navigation states

#### Secondary Purple (#7B61FF)
- Secondary buttons
- Accent elements
- Alternative icons

#### Success Green (#00C875)
- Success messages
- "Adopted" badges
- Positive actions

#### Error Red (#E2445C)
- Error messages
- Delete actions
- "Pet of the Week" badge

#### Text Colors
- **Primary (#1E1919)**: Headings, important text
- **Secondary (#637381)**: Body text, descriptions

---

## ✅ Checklist for New Components

When creating new components, ensure:
- [ ] Matte colors (no glossy effects)
- [ ] Subtle box shadows
- [ ] 8-12px border radius
- [ ] Inter font family
- [ ] Proper hover states
- [ ] Consistent spacing (multiples of 8px)
- [ ] Accessible color contrast
- [ ] Mobile responsive
- [ ] Loading states included
- [ ] Error states handled

---

## 🚀 Implementation Notes

### Theme File
All design tokens are centralized in:
```
frontend/src/ExampleTheme.ts
```

### Key Features
1. **CSS Variables enabled** for dynamic theming
2. **Component overrides** at theme level
3. **Typography variants** predefined
4. **Shadow system** standardized
5. **Border radius** consistent

---

## 📚 References

### Inspiration
- Dropbox Design System
- Modern SaaS interfaces
- Clean, minimal aesthetics

### Best Practices
- Maintain consistency across all pages
- Use theme variables instead of hardcoded colors
- Test on multiple screen sizes
- Ensure accessibility (WCAG AA minimum)

---

**Last Updated**: October 2024  
**Design System Version**: 1.0  
**Maintained by**: Pawgrammers Team

