// import jwt from "jsonwebtoken";

// const token=jwt.sign(process.env.API_JWT_SECRET,{expiresIn:"7d"});
// require('dotenv').config();
import "dotenv/config"
import jwt from "jsonwebtoken";

// 1. Define your token payload object (cannot be empty)
const payload = { 
  purpose: "api_access" 
};

// 2. Fetch the secret and ensure it is not undefined
const secret = process.env.API_JWT_SECRET;
console.log(secret+" kjsnfkank");
// if (!secret) {
//   throw new Error("API_JWT_SECRET is not defined in environment variables");
// }

// 3. Sign the token with payload, secret, and options
const token = jwt.sign("072d6d14-d176-4628-afa1-ebee084018b6",secret);
console.log(token);
