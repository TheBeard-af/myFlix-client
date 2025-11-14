# myFlix Client

A React-based movie application that allows users to browse, search, and manage their favorite movies. Built with modern web technologies and deployed on Netlify.

## 🎬 Live Demo

- **Frontend**: https://afaq-myflix.netlify.app/
- **API**: https://afaqmovies-50ba437af709.herokuapp.com/

## ✨ Features

- **User Authentication**: Secure signup and login functionality
- **Movie Browse**: View a collection of movies with details
- **Search Filter**: Real-time search to filter movies by title
- **Favorites**: Add/remove movies from your favorites list
- **User Profile**: View and manage your profile and favorite movies
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend

- **React** - UI library
- **React Router** - Client-side routing
- **React Bootstrap** - UI components
- **Parcel** - Build tool and bundler
- **SCSS** - Styling

### Backend

- **Node.js** & **Express** - Server framework
- **MongoDB Atlas** - Cloud database
- **JWT** - Authentication
- **Heroku** - API hosting

## 📁 Project Structure:

myFlix-client/
├── src/
│ ├── components/
│ │ ├── main-view/
│ │ ├── movie-card/
│ │ ├── movie-view/
│ │ ├── login-view/
│ │ ├── signup-view/
│ │ ├── profile-view/
│ │ └── navigation-bar/
│ ├── index.html
│ ├── index.jsx
│ └── index.scss
├── .gitignore
├── package.json
└── README.md

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/myflix-client.git
cd myflix-client

npm install
parcel src/index.html

🔌 API Endpoints
The app connects to a RESTful API with the following main endpoints:

GET /movies - Get all movies (requires auth)
GET /movies/:id - Get movie by ID
POST /users - Create new user
POST /login - User login
PUT /users/:username - Update user info
POST /users/:username/movies/:movieId - Add favorite
DELETE /users/:username/movies/:movieId - Remove favorite

📱 Key Components
MainView: Central component managing app state and routing
MovieCard: Displays individual movie information
MovieView: Detailed view of a selected movie
LoginView/SignupView: User authentication forms
ProfileView: User profile management
NavigationBar: App navigation with user info
🎯 Recent Updates
Added search functionality to filter movies by title
Implemented favorites system
Updated movie poster URLs
Improved responsive design
```
