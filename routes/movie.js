const express = require("express");
const movieController = require("../controllers/movie");
const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

router.post("/addMovie", verify, verifyAdmin, movieController.addMovie);

//Used getAllMovies instead of getMovies as it is indicated on the json
router.get("/getAllMovies", verify, movieController.getAllMovies);
router.get("/getMovie/:id", verify, movieController.getMovieById);
router.put("/updateMovie/:id", verify, verifyAdmin, movieController.updateMovie);
router.delete("/deleteMovie/:id", verify, verifyAdmin, movieController.deleteMovie);
router.post("/addComment/:id", verify, movieController.addMovieComment);
router.get("/getComments/:id", verify, movieController.getMovieComments);

module.exports = router;