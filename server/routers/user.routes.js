const express = require('express');
const router = express.Router();
const multer = require('multer');
const { blogwrite } = require('../controller/blog.controller');
const { userregistraion, userlogin } = require('../controller/user.controller');
const {displayblog}=require('../controller/blogdisplay.controller')
const {displaymyblog}=require('../controller/blogdisplay.controller')
const {deleteblog}=require('../controller/blog.controller');
const {getlikestatus,liketoggle}=require('../controller/blog.controller');
const {addComment,showComments}=require('../controller/comment.controller');
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
router.get('/myblogs/:username',displaymyblog);
router.delete('/deleteblog/:id',deleteblog);
router.get('/likes/:blogId/:username',getlikestatus);
router.post('/likes/toggle',liketoggle);
router.post('/comments/add',addComment);
router.get('/comments/:blogId',showComments);
module.exports = router;
