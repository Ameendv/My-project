const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongodb');
const path = require('path')
const fs = require('fs');


module.exports = {
    userRegistration,
    userLogin,
    userUpdateProfile,
    deleteUser,
    getUserDetails
}

async function userRegistration(
  { name, password, address, role },
  fileDetails
) {
  console.log(fileDetails);
  const userExist = await User.findOne({ name });
  //assuming one user create profile with unique name
  if (userExist) {
    await deleteImage("temp", fileDetails);
    throw `User already registered,please login`;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  password = hashedPassword;

  try {
    const response = await User.create({
      name,
      password,
      address,
      role,
    });

    const Imagemoving = await moveImage(response.id, fileDetails)

    const updateImageData = await User.updateOne(
      { _id: new ObjectId(response.id) },
      { $set: { image: Imagemoving } }
    );


    return `User created succesfully`;
  } catch (error) {
    throw error;
  }
}

async function userLogin(datas){
  console.log(datas)
    try {
        const userExist = await User.findOne({ name: datas.name });
        if (userExist) {
          if (await bcrypt.compare(datas.password, userExist.password)) {
            const userData = { name: userExist.name, name: userExist.address };
            const token = jwt.sign({ sub: userData },process.env.SECRET, { expiresIn: '7d' });  
            console.log(token, userData);
            return { userExist, token: token };
          } else {
            throw "Incorrect Password";
          }
        } else {
          throw "User not registered";
        }
      } catch (error) {
        throw error;
      }
}

async function userUpdateProfile(datas, fileDetails){
    if (datas.password) {
      const hashedPassword = await bcrypt.hash(datas.password, 10);
      datas.password = hashedPassword;
    }
    
    try {
      const updateProfile = await User.updateOne(
        {
          _id: new ObjectId(datas.id),
        },
        {
          $set: {
            name: datas.name,
            address: datas.address,
            password: datas.password,
            role: datas.role,
          },
        }
      );

      if(fileDetails){
        console.log('dddddddddddd')
        await moveImage(datas.id, fileDetails)

      }
      return `User data updated`;
    } catch (error) {
      console.log(error);
      throw error;
    }
}

function deleteImage(imagename,fileDetails){
    console.log( fileDetails)
    const filePathToDelete = path.join(__dirname, '../uploads', `${imagename}${fileDetails.originalname.substring(fileDetails.originalname.lastIndexOf("."))}`);

fs.unlink(filePathToDelete, (error) => {
  if (error) {
    console.error('Error deleting file:', error);
  } else {
    console.log('File deleted successfully.');
  }
});
}

function moveImage(imagename, fileDetails){
    const currentPath = path.join(
        __dirname,
        "../uploads",
        `temp${fileDetails.originalname.substring(
          fileDetails.originalname.lastIndexOf(".")
        )}`
      );
      const destinationPath = path.join(
        __dirname,
        "../uploads/userImages",
        imagename +
          `${fileDetails.originalname.substring(
            fileDetails.originalname.lastIndexOf(".")
          )}`
      );
  
      fs.rename(currentPath, destinationPath, function (err) {
        if (err) {
          throw err;
        } else {
          console.log("Successfully moved the file!");
        }
      });

      return imagename +
      `${fileDetails.originalname.substring(
        fileDetails.originalname.lastIndexOf(".")
      )}`
}

async function deleteUser(userId) {
  try {
    const imageName = await User.findOne({ _id: new ObjectId(userId) });
    const filePathToDelete = path.join(
      __dirname,
      "../uploads/userImages",
      `${imageName.image}`
    );

    fs.unlink(filePathToDelete, (error) => {
      if (error) {
        console.error("Error deleting file:", error);
      } else {
        console.log("File deleted successfully.");
      }
    });
    const deleteUser = await User.deleteOne({ _id: new ObjectId(userId) });

    return `User deleted`;
  } catch (error) {
    console.log(error);
    throw `Something went wrong`;
  }
}

async function getUserDetails(userId){
  const userDetails = await User.findOne({_id: new ObjectId(userId)})
  return userDetails
}