const router = require("express").Router();
const userRoutes = require("../api/userRoutes");
const blogPostRoutes = require("../api/blogPostRoutes");
const commentRoutes = require("../api/commentRoutes");

router.use("/users", userRoutes);
router.use("/blogpost", blogPostRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
