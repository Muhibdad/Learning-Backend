const express=require('express');
const userController=require('./../controllers/userController');
// const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))


// //Routes
const router=express.Router();

router.route('/')
.get(userController.getAllUsers)
.post(userController.createUser);

router.route('/:id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports=router;