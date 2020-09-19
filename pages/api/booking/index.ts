import { NextApiRequest, NextApiResponse } from "next";
import cors from "../helpers/cors";
import connect from "../helpers/connect";
import useBodyParser from "../helpers/useBodyParser";
import BookingSchema from "../models/booking-schema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  useBodyParser();
  await cors(req, res);
  await connect();

  if (req.method === "GET") {
    try {
      const books = await BookingSchema.find();
      res.status(200).send({ data: books });
    } catch (error) {
      res.send({ error });
    }
  }

  if (req.method === "POST") {
    try {
      const book = new BookingSchema(req.body);
      const newBooking = await book.save();
      res.status(200).send({ data: newBooking });
    } catch (ex) {
      res.status(400).send({ error: ex });
    }
  }
};
