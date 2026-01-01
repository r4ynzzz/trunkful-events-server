import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { name, email, phone, date, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,       // Your Gmail
        pass: process.env.MAIL_PASS,       // App password
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.MAIL_USER,
      subject: "New Event Inquiry",
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Preferred Event Date: ${date}
        Message:
        ${message}
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Email failed to send" });
  }
});

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
