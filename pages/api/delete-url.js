import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { urlID, userID } = req.body;

  const objID = new ObjectId(urlID);
  const client = await clientPromise;
  const db = await client.db();
  const collection = await db.collection("urls");

  // delete the url
  const result = await collection.deleteOne({ _id: objID, userId: userID });

  // check if the url is deleted or not
  if (result.deletedCount === 0) {
    return res.status(400).json({
      ok: false,
      message: "URL not found",
    });
  }

  // return success response
  res.status(200).json({
    ok: true,
    message: "URL deleted successfully",
  });
}
