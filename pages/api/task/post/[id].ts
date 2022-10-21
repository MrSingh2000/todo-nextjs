import Task from '../../../../models/Task';
import connectToMongo from '../../../../utils/dbConnect';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message?: string,
  error?: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {method} = req;
    const id = req.query.id;

    // connecting to db
    connectToMongo();

    if(method === "PUT"){
        try {
            const newTask = await Task.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).json({message: "Task updated"});
        } catch (error) {
            res.status(500).json({error: "Internal Server Error occurred"});
        }
    }
    else if(method === "DELETE"){
        try {
            const task = await Task.findByIdAndDelete(id);
            res.status(200).json({message: "task deleted"});
        } catch (error) {
            res.status(500).json({error: "Internal Server Error occurred"});
        }
    }
}
