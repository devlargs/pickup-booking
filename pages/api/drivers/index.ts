import { NextApiRequest, NextApiResponse } from "next";
import cors from "../helpers/cors";
import connect from "../helpers/connect";
import useBodyParser from "../helpers/useBodyParser";
import DriverSchema from "../models/drivers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  useBodyParser();
  await cors(req, res);
  await connect();

  if (req.method === "GET") {
    try {
      const drivers = await DriverSchema.find();
      res.status(200).send({ data: drivers });
    } catch (error) {
      res.send({ error });
    }
  }

  if (req.method === "POST") {
    try {
      const driver = new DriverSchema(req.body);
      const newDriver = await driver.save();
      res.status(200).send({ data: newDriver });
    } catch (ex) {
      res.status(400).send({ error: ex });
    }
  }
};
