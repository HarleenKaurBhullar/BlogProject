const express = require('express');
const router = express.Router();
const multer = require('multer');
const { blogwrite } = require('../controller/blog.controller');
const { userregistraion, userlogin } = require('../controller/user.controller');
const {displayblog}=require('../controller/blogdisplay.controller')
const {displaymyblog}=require('../controller/blogdisplay.controller')
const {deleteblog}=require('../controller/blog.controller');
const {getlikecount,getlikestatus,liketoggle}=require('../controller/blog.controller');
const {addComment,showComments}=require('../controller/comment.controller');
const requireAuth = require("../middleware/authMiddleware");
// Multer setup only here
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Routes
router.post('/userreg', userregistraion);
router.post('/userlogin', userlogin);
router.post('/writeblog', upload.single('image'), blogwrite);
router.put('/editblog/:id', upload.single('image'), blogwrite);
router.get('/blogs',displayblog);
router.get('/myblogs/:username',requireAuth,displaymyblog);
router.delete('/deleteblog/:id',requireAuth,deleteblog);
router.get('/likes/:blogId/like-count',getlikecount);
router.get('/likes/:blogId/:username',requireAuth,getlikestatus);
router.post('/likes/toggle',requireAuth,liketoggle);
router.post('/comments/add',requireAuth,addComment);
router.get('/comments/:blogId',showComments);
module.exports = router;
