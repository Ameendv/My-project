const express = require('express');
const router = express.Router();
const userServices = require('../services/user.service')
const store = require('../middleware/multer')

router.post('/userRegistration', store.single('userImage'), userRegistration)
router.post('/userLogin', userLogin)
router.put('/userUpdateProfile',store.single('userImage'), userUpdateProfile)
router.delete('/deleteUser', deleteUser)

function userRegistration(req, res, next){
     console.log(req.file, "file details")
    userServices.userRegistration(req.body, req.file).then(response=>{
        res.json(response)
    }).catch(next)
}

function userLogin(req, res, next){ 
    userServices.userLogin(req.body).then(response=>{
        res.json(response)
    }).catch(next)
}

function userUpdateProfile(req, res, next){
    userServices.userUpdateProfile(req.body, req.file).then(response=>{
        res.json(response)
    }).catch(next)
}

function deleteUser(req, res, next){
    userServices.deleteUser(req.body.userId).then(response=>{
        res.json(response)
    }).catch(next)
}


module.exports = router