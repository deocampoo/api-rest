const express = require('express');
const router = express.Router();
const userSchema = require('../models/favoriteMovie');
const tmdb = require('../config/tmdb');

// Add a movie to favorites
router.post('/:userId/add', async (req, res) => {
  const { userId } = req.params;
  const { movieId } = req.body;
  try {
    const movie = await tmdb.movie.info(movieId);
    const favoriteMovie = new FavoriteMovie({
      userId,
      movieId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      overview: movie.overview,
    });
    await favoriteMovie.save();
    res.status(201).json(favoriteMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove a movie from favorites
router.delete('/:userId/remove/:movieId', async (req, res) => {
  const { userId, movieId } = req.params;
  try {
    await FavoriteMovie.findOneAndDelete({ userId, movieId });
    res.status(200).json({ message: 'Movie removed from favorites' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all favorite movies for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const favoriteMovies = await FavoriteMovie.find({ userId });
    res.status(200).json(favoriteMovies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single favorite movie for a user
router.get('/:userId/:movieId', async (req, res) => {
  const { userId, movieId } = req.params;
  try {
    const favoriteMovie = await FavoriteMovie.findOne({ userId, movieId });
    if (favoriteMovie) {
      res.status(200).json(favoriteMovie);
    } else {
      res.status(404).json({ message: 'Movie not found in favorites' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;