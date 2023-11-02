import axios from 'axios';
import Cors from 'cors';
import initMiddleware from '@/lib/init-middleware';

const cors = initMiddleware(
    Cors({
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define the HTTP methods your API should support
      origin: `https://${VERCEL_URL}`, // Replace with your frontend's domain
    })
  );

export default async function handler(req, res) {
  const referer = req.headers.referer || req.headers.referrer; // get the referer from the request headers

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method should be POST' });
  } else if (process.env.NODE_ENV !== "development") {
    if (!referer || referer !== `https://${VERCEL_URL}`) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
  else {
    try {
    await cors(req, res);
      const { body } = req;
      const url = 'https://api.openai.com/v1/chat/completions';
      const headers = {
        'Content-type': 'application/json',
        'Authorization':`Bearer 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`
      };

      const response = await axios.post(url, body, { headers: headers })

      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  
}