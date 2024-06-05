const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const FavoriteMovieSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: String, required: true },
    title: { type: String, required: true },
    posterPath: { type: String },
    overview: { type: String },
  }, { timestamps: true });
  
  module.exports = mongoose.model('FavoriteMovie', FavoriteMovieSchema);