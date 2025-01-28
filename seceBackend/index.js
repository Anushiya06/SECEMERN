// const express = require("express");
// const path = require("path");
// const mdb = require("mongoose");
// const dotenv = require("dotenv");
// const Signup = require("./models/signupSchema");
// dotenv.config();
// const app = express();
// app.use(express.json());

// mdb
//   .connect("mongodb+srv://secemern:sece2025@mern2025.ur5cr.mongodb.net/")
//   .then(() => {
//     console.log("MongoDB Connection Sucessfull");
//   })
//   .catch((err) => {
//     console.log("MongoDB Connection Unsucessfull", err);
//   });

// app.get("/", (req, res) => {
//   res.send(
//     "Welcome to Backend my friend\n Your RollerCoster starts from now on\n Fasten your codabase so you can catchup of what is been taught"
//   );
// });
// app.get("/static", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// app.post("/signup", (req, res) => {
//   var { firstName, lastName, username, email, password } = req.body;
//   try {
// console.log("Inside try");
//       const newCustomer = new Signup({
//       firstName: firstName,
//       lastName: lastName,
//       username: username,
//       email: email,
//       password: password,
//     });
//     newCustomer.save()
//     res.status(201).send("signup successfull");
//   } catch (err) {
//     res.status(400).send("Signup Unsuccessfull",err);
//   }
// });
// app.listen(4000, () => {
//   console.log("Server Started");
// });
const express = require("express");
const path = require("path");
const mdb = require("mongoose");
const dotenv = require("dotenv");
const Signup = require("./models/signupSchema");
const signup_schema = require("./models/signupSchema");
dotenv.config();
const app = express();
app.use(express.json());

mdb
  .connect("mongodb+srv://secemern:sece2025@mern2025.ur5cr.mongodb.net/")
  .then(() => {
    console.log("MongoDB Connection Sucessfull");
  })
  .catch((err) => {
    console.log("MongoDB Connection Unsucessfull", err);
  });

app.get("/", (req, res) => {
  res.send(
    "Welcome to Backend my friend\n Your RollerCoster starts from now on\n Fasten your codabase so you can catchup of what is been taught"
  );
});
app.get("/static", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/signup", (req, res) => {
  var { firstName, lastName, username, email, password } = req.body;
  try {
console.log("Inside try");
      const newCustomer = new Signup({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
    });
    newCustomer.save()
    res.status(201).send("Signup Successfull");
  } catch (err) {
    res.status(400).send("Signup Unsuccessfull",err);
  }
});

app.get('/getsignupdet',async(req,res)=>{
  var signUpdet=await(Signup.find())
  res.status(200).json(signUpdet);
})

app.post('/updatedet',async(req,res)=>{
  var updateRec= await Signup.findOneAndUpdate(
    {username:"anto"},
    {$set:{username:"anto_29"}}
  )
  console.log(updateRec)
  updateRec.save()
  res.json("Record updated")
})

app.post('/deletedet', async (req, res) => {
  const { username } = req.body; 
  const deleteRec = await Signup.findOneAndDelete({ username: "Vijay-22" }); 
    if (deleteRec) {
      res.json("Record deleted successfully" );
    } else {
      res.json("Record not found");
    }
});

app.listen(4000, () => {
  console.log("Server Started");
});