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
  let { url, user_id, custom_name, custom_link, expiration } = req.body;

  // return res.status(200).json({
  //   ok: true,
  //   message: ` ${url} ${user_id} ${custom_name} ${custom_link} ${expiration}`,
  // });

  // check if the url is an string or an object if object return 400
  const checkURL = isValidURL(url);
  if (
    typeof url !== "string" ||
    !checkURL ||
    url.length > 2000 ||
    url.length < 5 ||
    !user_id
  ) {
    return res.status(400).json({
      ok: false,
      message: "Invalid URL",
    });
  }

  // connect to mongodb
  const client = await clientPromise;

  // get database and collection
  const db = client.db();
  const collection = db.collection("urls");

  // check if custom_name is empty or not if empty set name to url
  if (custom_name === undefined || custom_name === null || custom_name === "") {
    custom_name = "untitled";
  } else {
    custom_name = custom_name;
  }

  // check if custom_link is empty or not if empty set name to url
  if (custom_link === undefined || custom_link === null || custom_link === "") {
    const alphabet =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const nanoId = customAlphabet(alphabet, 6)();
    custom_link = nanoId;
  } else {
    if (custom_link.length > 20 || custom_link.length < 4) {
      return res.status(400).json({
        ok: false,
        message: "Custom link must be between 4 and 20 characters",
      });
    }
  }

  // check if expiration is empty or not if empty set name to url
  if (expiration === undefined || expiration === null || expiration === "") {
    expiration = "none";
  } else {
    expiration = expiration;
  }
  const isLinkExist = await collection.findOne({
    //user and operation
    $and: [{ userId: user_id }, { nanoId: custom_link }],
  });

  if (isLinkExist) {
    return res.status(400).json({
      ok: false,
      message: "Link already exists",
    });
  }

  // check if url already exists or not if exists return 400
  // check for multiple options like fisrt check if url exists for the same user or not then check nanoId exists or not

  // insert url into database
  const data = await collection.insertOne({
    url,
    userId: user_id,
    name: custom_name,
    nanoId: custom_link,
    expiration,
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
