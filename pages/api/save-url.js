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

  // get url and userId from request body
  let { url, userId, name } = req.body;

  // check if the url is an string or an object if object return 400
  if (typeof url !== "string") {
    return res.status(400).json({
      ok: false,
      message: "Invalid URL",
    });
  }

  // check if url is valid or not if not return 400
  const checkURL = isValidURL(url);
  console.log(checkURL, url.length);
  if (!checkURL || url.length > 2000 || url.length < 5 || !userId) {
    return res.status(400).json({
      ok: false,
      message: "Invalid URL",
    });
  }

  // connect to mongodb
  const client = await clientPromise;

  // get database and collection
  const db = await client.db();
  const collection = await db.collection("urls");

  // hash url with only 5-6 characters long
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const nanoId = customAlphabet(alphabet, 6)();

  // check if name is empty or not if empty set name to url
  if (name === undefined || name === null || name === "") {
    name = "untitled";
  } else {
    name = name;
  }

  // check if url already exists or not if exists return 400
  // check for multiple options like fisrt check if url exists for the same user or not then check nanoId exists or not

  const isUrlExist = await collection.findOne({
    $or: [{ url, userId }, { nanoId }],
  });

  if (isUrlExist) {
    return res.status(400).json({
      ok: false,
      message: "URL already exists",
    });
  }

  // insert url into database
  const data = await collection.insertOne({
    url,
    nanoId,
    userId,
    name,
    clicks: 0,
    isActive: true,
    lastClickedAt: null,
    createdAt: new Date(),
  });

  // check if data is inserted or not if not return 400
  if (!data) {
    return res.status(400).json({
      ok: false,
      message: "Something went wrong",
    });
  }

  // return success response
  res.status(200).json({
    ok: true,
    message: "URL saved successfully",
  });
}
