
const express =require('express');
const {getPosts,createPost, postByUser,postById,isPoster,updatePost,deletePost, photo,singlePost,like,unlike,comment,uncomment }= require('../controllers/post');
const {requireSignin}= require('../controllers/auth');
const {userById}= require('../controllers/user');
const {createPostValidator} = require('../validator')

const router = express.Router();

router.get('/posts',getPosts)
router.put('/post/like',requireSignin,like)
router.put('/post/unlike',requireSignin,unlike)

router.put('/post/comment',requireSignin,comment)
router.put('/post/uncomment',requireSignin,uncomment)


router.post('/post/new/:userId',requireSignin,createPost,createPostValidator)
router.get('/posts/by/:userId', requireSignin,postByUser)
router.put('/post/:postId', requireSignin,isPoster,updatePost)
router.get('/post/:postId',singlePost)

router.delete('/post/:postId', requireSignin,isPoster,deletePost)

router.get('/post/photo/:postId',photo)

// Any route containing userid ,app will first execute userById()
router.param("userId",userById)


// Any route containing postid ,app will first execute postById()
router.param("postId",postById)




module.exports =  router;





// const express = require("express");
// const {
//     getPosts,
//     createPost,
//     postsByUser,
//     postById,
//     isPoster,
//     deletePost,
    
// } = require("../controllers/post");
// const { requireSignin } = require("../controllers/auth");
// const { userById } = require("../controllers/user");
// const { createPostValidator } = require("../validator");

// const router = express.Router();


// router.post(
//     "/post/new/:userId",
//     requireSignin,
//     createPost,
//     createPostValidator
// );

// router.get("/posts", getPosts);

// router.get("/posts/by/:userId", requireSignin, postsByUser);
// //router.get("/post/:postId", singlePost);

// router.delete("/post/:postId", requireSignin, isPoster, deletePost);

// // any route containing :userId, our app will first execute userById()
// router.param("userId", userById);
// // any route containing :postId, our app will first execute postById()
// router.param("postId", postById);

// module.exports = router;