import axios from "axios";

export default async function handler(req, res) {
  const referer = req.headers.referer || req.headers.referrer; // get the referer from the request headers

  if (req.method !== "POST") {
    res.status(405).json({ message: "Method should be POST" });
  } else if (process.env.NODE_ENV !== "development") {
    if (!referer || referer !== process.env.APP_URL) {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    try {
      const { body } = req;
      const url = "https://api.openai.com/v1/chat/completions";
      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer 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`,
      };

      const response = await axios.post(url, body, {
        headers: headers,
        timeout: 180000,
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
