import { NextApiRequest, NextApiResponse } from "next";

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export default async function handle(req, res){
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  
  try {
    let { room,bath,type,price,desc,wallet,img } = req.body;
 
    await prisma.house.create({
      data:{
       room: parseInt(room),
       bath: parseInt(bath),
       type: parseInt(type),
       price: parseInt(price),
       desc, wallet, img
      }
    })
  

    return res.status(200).json({ message: "add successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
}

handle()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // Set desired value here
    },
  },
};
