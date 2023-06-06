// pages/api/auth/login.js

import clientPromise from "@/lib/mongodb";
import { compare } from "bcryptjs";
import { signIn } from "next-auth/react";

export default async function login(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { email, password } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection("users").findOne({ email });

    if (user) {
      const isMatch = await compare(password, user.password);

      if (isMatch) {
        const session = await signIn("credentials", {
          redirect: false,
          name: user.name,
          email: user.email,
          password: user.password,
        });

        return res.status(200).json({ session });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err });
  }
}
