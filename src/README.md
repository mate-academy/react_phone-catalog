📱 Phone Catalog - Advanced Implementation

**Note**: This project goes beyond the original requirements a bit to demonstrate enterprise-level architecture and best practices.

## What's Different from Requirements

- ✅ **Feature-Sliced Design (FSD)** architecture (cuz I have notices 'shared' folder in 'advanced architecture' in original README.MD)
- ✅ **Mock Backend** with API layer, server-side filtering, pagination

**Mock Backend:**
- TypeScript-based API simulation
- Server-side filtering, sorting, pagination
- Request/response validation
- Error handling
- Debounced responses for UX testing


## Project Structure
-src: main folder
  -app: header+oultet+footer in App.tsx and positioning style & fonts in App.scss
  -entities:
  -features:
  -pages:
  -serverMock:
  -shared:
  -widgets:

### Advanced State Management
- URL as single source of truth
- Automatic synchronization
- Type-safe parameter handling

## 🚀 Quick Start

```bash
npm install
npm run dev

📖 Additional Documentation
Architecture Overview
API Documentation
Development Guide
💭 Why This Approach?
This implementation demonstrates:
Scalability: Easy to add new features
Maintainability: Clear separation of concerns
Type Safety: Reduced runtime errors
Real-world readiness: Production-like patterns

Original requirements were intentionally exceeded for learning purposes.

## 📚 Дополнительные файлы:

### **`docs/ARCHITECTURE.md`:**
```markdown
# Architecture Overview

## Feature-Sliced Design

Explanation of FSD layers...

## Mock Backend

How the server simulation works...

## State Management

URL-driven state approach...

docs/API.md:
# API Documentation

## Backend Contracts

### Request Objects
### Response Objects
### Error Handling

🎯 Для менторов добавь секцию:
## 👨‍🏫 For Reviewers

### Original vs Enhanced Implementation

**Original Requirements:**
- Simple React app with JSON data
- Basic filtering and pagination
- localStorage for cart/favorites

**This Implementation:**
- Enterprise architecture (FSD)
- Mock backend with API layer
- Server-side data processing
- Type-safe validation layer

### Why Over-Engineering?

This project serves as a learning exercise in:
- System design principles
- Scalable architecture patterns
- TypeScript best practices
- Real-world development workflows

### Simple Version Available

A simplified version matching original requirements exactly is available in the `simple-version` branch.

