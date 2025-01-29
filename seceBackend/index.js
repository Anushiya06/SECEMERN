// const express = require("express");
// const path = require("path");
// const mdb = require("mongoose");
// const dotenv = require("dotenv");
// const Signup = require("./models/signupSchema");
// const e = require("express");
// const app = express();
// dotenv.config();
// app.use(express.json());
// mdb
//   .connect(process.env.MONGODB_URL)
//   .then(() => {
//     console.log("MongoDB Connection Successful");
//   })
//   .catch((err) => {
//     console.log("MongoDB Connection Unsuccessful", err);
//   });
// app.get("/", (req, res) => {
//   res.send(
//     "Welcome to Backend my friend\nYour Roller coster starts from now on\nFasten your codebase so you can catchup of what is been taught"
//   );
// });
// app.get("/static", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });
// app.post("/signup", (req, res) => {
//   var { firstName, lastName, username, email, password } = req.body;
//   try {
//     const newSignup = new Signup({
//       firstName: firstName,
//       lastName: lastName,
//       username: username,
//       email: email,
//       password: password,
//     });
//     newSignup.save();
//     res.status(201).send("Signup Successful");
//   } catch (error) {
//     res.status(400).send("Signup Unsuccessful", error);
//   }
// });
// app.get('/getsignupdet',async(req,res)=>{
//   var signUpdet = await Signup.find()
//   res.status(200).json(signUpdet)
// })
// app.listen(3000, () => {
//   console.log("Server Started");
// });
const express = require("express");
const path = require("path");
const mdb = require("mongoose");
const dotenv = require("dotenv");
const Signup = require("./models/signupSchema");
const cors = require("cors");  // ✅ Import CORS

const app = express();
dotenv.config();

app.use(cors({ origin: "http://localhost:5173", credentials: true })); // ✅ Allow frontend access
app.use(express.json());

// MongoDB Connection
mdb.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Failed", err));

// Routes
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    
    const newSignup = new Signup({ firstName, lastName, username, email, password });
    await newSignup.save();
    
    res.status(201).json({ message: "Signup Successful!" });
  } catch (error) {
    res.status(400).json({ message: "Signup Failed", error });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in database
    const user = await User.findOne({ email, password });

    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    res.status(200).json({ message: "Login Successful", user });
  } catch (error) {
    res.status(500).json({ message: "Login Failed", error });
  }
});

// Start Server
app.listen(3000, () => console.log("Server running on port 3000"));
