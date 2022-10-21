import Task from '../../../models/Task';
import connectToMongo from '../../../utils/dbConnect';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message?: string,
  error?: string,
  tasks?: any[],
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {method} = req;
    // connecting to db
    connectToMongo();

    if(method === "POST"){
        try {
            let data = {
                task: req.body.task,
                completed: req.body.completed,
            }
            const newTask = await Task.create(data);
            res.status(200).json({message: "New Task created"});
        } catch (error) {
            res.status(500).json({error: "Internal Server Error occurred"});
        }
    }
    else if(method === "GET"){
        try {
            const tasks = await Task.find();
            res.status(200).json({tasks});
        } catch (error) {
            res.status(500).json({error: "Internal Server Error occurred"});
        }
    }
}