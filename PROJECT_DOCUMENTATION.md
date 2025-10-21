# Pawgrammers - Pet Adoption Platform

A comprehensive pet adoption shelter management system built with the MERN stack (MongoDB, Express, React, Node.js).

## 🐾 Features

### Core Functionality
- **Pet Dashboard**: Browse available pets with advanced filtering by species, location, sex, and search
- **Pet of the Week**: Featured pet showcase with prominent display
- **Pet Details**: Comprehensive pet profiles with photos, descriptions, and adoption status
- **Events Management**: Create, view, and manage shelter events and activities
- **Products Store**: Browse and manage pet products and supplies
- **Adoptee Gallery**: Success stories of previously adopted pets
- **Interactive Map**: View pet locations (placeholder for Google Maps/Mapbox integration)

### Technical Features
- Full CRUD operations for Pets, Events, and Products
- Advanced filtering and search capabilities
- Responsive Material-UI design
- RESTful API architecture
- MongoDB database integration
- Production-ready deployment setup

## 🛠 Tech Stack

### Frontend
- **React 19** with TypeScript
- **Material-UI (MUI) v7** for component library
- **React Router** for navigation
- **Axios** for API calls
- **Vite** for build tooling

### Backend
- **Node.js** with Express 5
- **MongoDB** with MongoDB Atlas
- **CORS** enabled for cross-origin requests
- **dotenv** for environment configuration

## 📁 Project Structure

```
bootcamp-boilerplate/
├── backend/
│   ├── ExampleServer.js          # Main server file
│   ├── ExampleConnect.js         # MongoDB connection
│   ├── ExampleRoutes.js          # Pet API routes
│   ├── EventRoutes.js            # Event API routes
│   ├── ProductRoutes.js          # Product API routes
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx     # Main pet dashboard
│   │   │   ├── PetDetail.tsx    # Pet detail page
│   │   │   ├── Events.tsx       # Events page
│   │   │   ├── EventDetail.tsx  # Event detail page
│   │   │   ├── Products.tsx     # Products page
│   │   │   ├── Adoptees.tsx     # Previous adoptees
│   │   │   └── Map.tsx          # Location map
│   │   ├── components/
│   │   │   ├── Navigation.tsx   # Top navigation bar
│   │   │   ├── Footer.tsx       # Footer component
│   │   │   ├── AddPetDialog.tsx
│   │   │   ├── EditPetDialog.tsx
│   │   │   ├── AddEventDialog.tsx
│   │   │   ├── EditEventDialog.tsx
│   │   │   ├── AddProductDialog.tsx
│   │   │   └── EditProductDialog.tsx
│   │   ├── ExampleApi.tsx       # API service layer
│   │   └── main.tsx             # App entry point
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- npm or yarn package manager

### Environment Setup

1. Create a `.env` file in the root directory:
```env
ATLAS_URI=mongodb+srv://tg123:tg123@bootcamp.qsdet76.mongodb.net/?retryWrites=true&w=majority&appName=Bootcamp
DATABASE_NAME=Bootcamp
NODE_ENV=development
```

### Installation

1. **Install root dependencies:**
```bash
npm install
```

2. **Install backend dependencies:**
```bash
cd backend
npm install
```

3. **Install frontend dependencies:**
```bash
cd frontend
npm install
```

### Running the Application

#### Development Mode

1. **Start the backend server:**
```bash
cd backend
npm start
# Server runs on http://localhost:3000
```

2. **Start the frontend (in a new terminal):**
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

#### Production Mode

1. **Build the frontend:**
```bash
cd frontend
npm run build
```

2. **Set environment to production:**
```bash
export NODE_ENV=production
```

3. **Start the server:**
```bash
cd backend
npm start
```

The production server will serve both API and frontend from `http://localhost:3000`

## 📊 Data Models

### Pet Model
```javascript
{
  name: String,           // Pet's name
  breed: String,          // Breed
  age: String,            // Age in years
  species: String,        // Dog, Cat, Bird, Rabbit, Other
  url: String,            // Photo URL
  description: String,    // Detailed description
  location: String,       // Location (e.g., "Boston")
  sex: String,            // "M" or "F"
  adopted: Boolean,       // Adoption status
  featuredPetOfWeek: Boolean  // Featured status
}
```

### Event Model
```javascript
{
  name: String,           // Event name
  organizer: String,      // Organizer name
  location: String,       // Event location
  url: String,            // Event image URL
  description: String,    // Event description
  time: String,           // Event time
  date: String            // Event date
}
```

### Product Model
```javascript
{
  name: String,           // Product name
  category: String,       // Toys, Food, Accessories, etc.
  price: String,          // Price
  url: String,            // Product image URL
  description: String,    // Product description
  inStock: Boolean        // Availability status
}
```

## 🎯 API Endpoints

### Pets
- `GET /pets` - Get all pets
- `GET /pets/:id` - Get pet by ID
- `POST /pets` - Create new pet
- `PUT /pets/:id` - Update pet
- `DELETE /pets/:id` - Delete pet

### Events
- `GET /events` - Get all events
- `GET /events/:id` - Get event by ID
- `POST /events` - Create new event
- `PUT /events/:id` - Update event
- `DELETE /events/:id` - Delete event

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

## 🎨 Key Features Implementation

### Advanced Filtering
The dashboard includes filters for:
- **Species**: Dog, Cat, Bird, Rabbit, Other
- **Location**: All available locations
- **Sex**: Male, Female
- **Search**: Name, breed, or description

### Pet of the Week
- Automatically displays on dashboard
- Highlighted with special banner
- Can be set via the "Edit Pet" dialog
- Only shows non-adopted pets

### Responsive Design
- Mobile-first approach
- Grid layouts adapt to screen size
- Touch-friendly interface
- Material-UI theme consistency

## 🔒 Security Notes

**Important**: The current `.env` contains development credentials. For production:
1. Create new MongoDB database credentials
2. Update `ATLAS_URI` with secure credentials
3. Never commit `.env` file to version control
4. Use environment variables in deployment platform

## 🚢 Deployment

### Vercel Deployment (Recommended for Frontend)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy frontend:
```bash
cd frontend
vercel
```

### Backend Deployment Options
- **Heroku**
- **Railway**
- **Render**
- **AWS EC2**

Ensure `NODE_ENV=production` is set in your deployment environment.

## 📝 Future Enhancements

- [ ] Integrate Google Maps API for interactive location map
- [ ] Implement user authentication and authorization
- [ ] Add email notifications for adoption inquiries
- [ ] Create admin panel with analytics
- [ ] Add image upload functionality
- [ ] Implement payment processing for products
- [ ] Add social media sharing features
- [ ] Create mobile app with React Native

## 👥 Contact Information

**Pawgrammers Shelter**
- Address: 123 Pet Street, Boston, MA 02101
- Phone: (617) 555-PETS
- Email: info@pawgrammers.org
- Hours: Mon-Fri 9AM-6PM, Sat 10AM-4PM

## 📄 License

This project is created for educational purposes as part of the F25 Bootcamp.

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Material-UI for the component library
- React Router for navigation
- Vite for blazing-fast development

---

**Built with ❤️ by Tianyi, Lorenzo, and Laasya**

