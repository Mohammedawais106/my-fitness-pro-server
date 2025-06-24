// import express from "express"
// import { config } from "dotenv"
// import cors from "cors"
// import { sendEmail } from "./utils/sendMail.js"

// let app = express()
// let router = express.Router()

// config({ path: "./config.env" })

// let port = process.env.PORT
// console.log("helooo", port)

// app.use(cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["GET", "POST", "OPTIONS"],
//     credentials: true
// }))




// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// app.get("/check",(req,res)=>{
//     res.status(200).send("hello your server is a live")
// })
// router.post("/send/email", async (req, res, next) => {
//     let { name, email, message,mobile } = req.body
//     if (!name || !email || !message ||!mobile) {
//         return res.status(400).json({ success: false, message: "please provide all details" })
//     }

//     try {
//         await sendEmail({
//             email: "mohammedawais106@gmail.com",
//             subject: "GYM WEBSITE CONTACT",
//             message,
//             userEmail: email,name,mobile
//         })
//         res.status(200).json({ success: true, message: "Sent Successfully" })
//     } catch (error) {
//         res.status(500).json({ success: false, message: "server error" })
//     }
// })

// app.use(router)
// app.listen(port, () => {
//     console.log(`hello developer your port is starting at http://localhost:${port}`)
// })






import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendMail.js";

const app = express();
const router = express.Router();

config({ path: "./config.env" });

const port = process.env.PORT;
console.log("helooo", port);

// ✅ CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("/send/email", cors(corsOptions)); // ✅ Only add OPTIONS for the exact route

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Health check route
app.get("/check", (req, res) => {
  res.status(200).send("hello your server is a live");
});

// ✅ Main route
router.post("/send/email", async (req, res) => {
  const { name, email, message, mobile } = req.body;

  if (!name || !email || !message || !mobile) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all details" });
  }

  try {
    await sendEmail({
      email: "mohammedawais106@gmail.com",
      subject: "GYM WEBSITE CONTACT",
      message,
      userEmail: email,
      name,
      mobile,
    });
    res.status(200).json({ success: true, message: "Sent Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
});

app.use(router);

app.listen(port, () => {
  console.log(`hello developer your port is starting at http://localhost:${port}`);
});

