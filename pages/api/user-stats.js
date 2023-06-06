import clientPromise from "@/lib/mongodb";
import { isValidURL } from "@/lib/utils";
import { customAlphabet, nanoid } from "nanoid";

export default async function handler(req, res) {
  // check if request method is POST or not if not return 400
  if (req.method !== "POST") {
    return res.status(400).json({
      ok: false,
      message: "Only POST requests allowed",
    });
  }

  // get userId from request body
  const { userId } = req.body;

  // connect to mongodb
  const client = await clientPromise;

  // get database and collection
  const db = client.db();
  const collection = db.collection("urls");

  //count total urls
  const totalURLs = await collection.countDocuments({ userId });

  // count total clicks
  const totalClicks = await collection
    .aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$clicks" } } },
    ])
    .toArray();

  //get active links
  const activeLinks = await collection.countDocuments({
    userId,
    isActive: true,
  });

  // get all urls from database for the user in ascending order of createdAt
  const userURLs = await collection
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();

  if (!userURLs || userURLs.length === 0) {
    return res.status(400).json({
      ok: false,
      message: "No URLs found",
    });
  }

  // return success response
  res.status(200).json({
    ok: true,
    totalURLs,
    totalClicks: totalClicks[0]?.total || 0,
    activeLinks,
    urls: userURLs,
    message: "Success",
  });
}
