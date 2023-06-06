import clientPromise from "@/lib/mongodb";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, lastName, email, password, terms } = req.body;

  if (!firstName || !lastName || !email || !password || !terms) {
    return res.status(422).json({ error: "Invalid data" });
  }

  const client = await clientPromise;
  const db = await client.db();

  const isExist = await db.collection("users").findOne({ email });
  console.log(isExist + "isExist");
  if (isExist) {
    return res.json({ error: "User already exist" });
  }

  const hashedPassword = await hash(password, 12);

  const saveToDb = await db.collection("users").insertOne({
    name: `${firstName} ${lastName}`,
    email,
    password: hashedPassword,
    terms,
  });

  if (saveToDb) {
    return res.status(201).json({ message: "User created successfully" });
  }
  return res.status(500).json({ error: "Something went wrong" });
}
export const useCache = false;
