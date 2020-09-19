import { NextApiRequest, NextApiResponse } from "next";
import cors from "../helpers/cors";
import connect from "../helpers/connect";
import useBodyParser from "../helpers/useBodyParser";
import BookingSchema from "../models/booking-schema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  useBodyParser();
  await cors(req, res);
  await connect();

  if (req.method === "PUT") {
    try {
      const data = await BookingSchema.findOneAndUpdate(
        { _id: req.query.id },
        req.body,
        { new: true }
      );
      res.send({ data });
    } catch (error) {
      res.send({ error });
    }
  }
};
