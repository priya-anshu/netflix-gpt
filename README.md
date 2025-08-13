# Netflix GPT - Browse Page Clone

A complete Netflix browse page clone built with React, featuring real movie data from TMDB API.

## Features

### 🎬 Netflix-Style Browse Page
- **Hero Banner**: Featured movie with backdrop image, title, description, and action buttons
- **Movie Categories**: Multiple rows of movies organized by categories (Trending, Popular, Top Rated, etc.)
- **Hover Effects**: Netflix-style hover overlays with movie details and action buttons
- **Responsive Design**: Works on desktop and mobile devices

### 🎨 UI Components
- **Header**: Netflix-style header with logo, navigation, search, and profile dropdown
- **Main Container**: Hero banner with featured content
- **Secondary Container**: Multiple movie rows with different categories
- **Movie List**: Horizontal scrolling movie lists with hover effects

### 📱 Key Features
- Real movie data from TMDB API
- Netflix-style hover animations
- Responsive design
- Smooth scrolling
- Loading states
- Error handling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd netflix-gpt
```

2. Install dependencies:
```bash
npm install
```

3. Set up TMDB API key (optional):
Create a `.env` file in the root directory and add your TMDB API key:
```
REACT_APP_TMDB_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. Navigate to `/browse` to see the Netflix-style browse page
2. Hover over movies to see details and action buttons
3. Scroll through different movie categories
4. Use the header navigation to explore different sections

## Project Structure

```
src/
├── components/
│   ├── Browse.js          # Main browse page component
│   ├── Header.js          # Netflix-style header
│   ├── MainContainer.js   # Hero banner component
│   ├── SecondaryContainer.js # Movie categories container
│   └── MovieList.js       # Movie list with hover effects
├── hooks/
│   └── useTMDB.js         # Custom hook for TMDB API
├── utils/
│   ├── constants.js       # Netflix-style constants
│   └── tmdb.js           # TMDB API configuration
└── index.css             # Custom styles and animations
```

## Technologies Used

- **React**: Frontend framework
- **Tailwind CSS**: Styling and responsive design
- **TMDB API**: Movie data source
- **React Router**: Navigation

## Customization

### Adding New Categories
Edit `src/utils/constants.js` to add new movie categories:

```javascript
export const NETFLIX_CATEGORIES = [
  { id: 'trending', title: 'Trending Now', type: 'all' },
  { id: 'newCategory', title: 'New Category', type: 'movie' },
  // ... more categories
];
```

### Styling
Customize the Netflix-style appearance by modifying:
- `src/index.css` for global styles
- Component-specific Tailwind classes
- Color scheme and animations

## API Configuration

The app uses TMDB API for movie data. To get your own API key:

1. Visit [TMDB](https://www.themoviedb.org/)
2. Create an account and request an API key
3. Add the key to your `.env` file

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is for educational purposes only.

## Acknowledgments

- Netflix for the design inspiration
- TMDB for providing the movie data API
- React and Tailwind CSS communities