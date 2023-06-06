import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ ok: false, message: "Only POST requests allowed" });
  }
  const { userId, name, email } = req.body;
  const obj_id = new ObjectId(userId);
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("users");
    let updated;
    if (name && email && name.length > 3 && email.length > 5) {
      updated = await collection.updateOne(
        { _id: userId },
        { $set: { name, email } }
      );
    } else if (name && name.length > 3 && !email) {
      updated = await collection.updateOne({ _id: userId }, { $set: { name } });
      console.log(updated);
    } else if (email && email.length > 5 && !name) {
      updated = await collection.updateOne(
        { _id: obj_id },
        { $set: { email } }
      );
    } else {
      return res.status(400).json({ ok: false, message: "Invalid data" });
    }
    if (updated) {
      return res.status(200).json({ ok: true, message: "User updated" });
    }
    return res.status(400).json({ ok: false, message: "Invalid data" });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
}
