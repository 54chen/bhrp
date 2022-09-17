
const { PrismaClient } = require('@prisma/client')

export default async function handle(req, res){
//   {
//     "name": "Thor's hammer",
//     "description": "Mjölnir, the legendary hammer of the Norse god of thunder.",
//     "image": "https://game.example/item-id-8u5h2m.png",
//     "strength": 20
// }
  const { id } = req.query;
  const prisma = new PrismaClient();
  const propertyForRent = await prisma.house.findUnique({
    where: { id: parseInt(id) }
  });
  const img = propertyForRent.img!="/images/property.jpg"?propertyForRent.img:"https://bhrp.vercel.app"+propertyForRent.img;
  return res.status(200).json({ name: "HOUSE#"+propertyForRent.id, description: propertyForRent.desc, image:img, price: propertyForRent.price});
}

