const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postCtrl = require("../controllers/post");
const likeCtrl = require("../controllers/like");

router.get("/", auth, postCtrl.getAllPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);

router.patch("/:id/like", auth, likeCtrl.likePost);
router.patch("/:id/unlike", auth, likeCtrl.unlikePost);

module.exports = router;
