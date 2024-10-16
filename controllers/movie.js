const Movie = require("../models/Movie");

exports.addMovie = async (req, res) => {
    try {
        const { title, director, year, description, genre } = req.body;
        const newMovie = new Movie({
            title,
            director,
            year,
            description,
            genre
        });
        await newMovie.save();
        res.status(201).json({ message: "Movie added successfully!", movie: newMovie });
    } catch (err) {
        res.status(500).json({ message: "Error adding movie", error: err.message });
    }
};

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json({movies: movies});
    } catch (err) {
        res.status(500).json({ message: "Error fetching movies", error: err.message });
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json({ message: "Error fetching movie", error: err.message });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const updatedData = req.body;
        const movie = await Movie.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json({ message: "Movie updated successfully", movie });
    } catch (err) {
        res.status(500).json({ message: "Error updating movie", error: err.message });
    }
};


exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json({ message: "Movie deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting movie", error: err.message });
    }
};

exports.addMovieComment = async (req, res) => {
    try {
        const { comment } = req.body;
        const userId = req.user.id;

        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        movie.comments.push({
            userId,
            comment
        });

        await movie.save();
        res.status(201).json({ message: "Comment added successfully", movie });
    } catch (err) {
        res.status(500).json({ message: "Error adding comment", error: err.message });
    }
};

exports.getMovieComments = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).populate('comments.userId', 'name'); // Populates the user's name field if necessary

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        const formattedComments = movie.comments.map(comment => ({
            userId: comment.userId._id.toString(),
            comment: comment.comment,
            dateAdded: comment.dateAdded
        }));

        res.status(200).json({ comments: formattedComments });
    } catch (err) {
        res.status(500).json({ message: "Error fetching comments", error: err.message });
    }
};
