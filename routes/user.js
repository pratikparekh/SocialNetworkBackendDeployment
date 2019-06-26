
const {userById, allUsers, getUser, updateUser, deleteUser, userPhoto, addFollowing, addFollower, removeFollowing,removeFollower,findPeople}= require('../controllers/user');
const {requireSignin}= require('../controllers/auth');
const express =require('express');
const router = express.Router();


router.put('/user/follow', requireSignin,addFollowing,addFollower)

router.put('/user/unfollow', requireSignin,removeFollowing,removeFollower)
router.get('/users',allUsers)
router.get('/user/:userId',requireSignin,getUser)
router.put('/user/:userId',updateUser)
router.delete('/user/:userId',requireSignin,deleteUser)
router.get('/user/photo/:userId',userPhoto)
// Any route containing userid ,app will first execute userById()

//who to follow

router.get('/user/findpeople/:userId',requireSignin,findPeople)
router.param("userId",userById)
module.exports =  router;
