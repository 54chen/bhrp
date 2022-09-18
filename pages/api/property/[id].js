const { PrismaClient } = require('@prisma/client')
var cache = require('memory-cache');

export default async function handle(req, res) {
  //   {
  //     "name": "Thor's hammer",
  //     "description": "Mjölnir, the legendary hammer of the Norse god of thunder.",
  //     "image": "https://game.example/item-id-8u5h2m.png",
  //     "strength": 20
  // }
  const { id } = req.query;
  const value = cache.get(id);
  if (value) {
    return res.status(200).json(value);
  } else {
    const prisma = new PrismaClient();
    const propertyForRent = await prisma.house.findUnique({
      where: { id: parseInt(id) }
    });
    const img = propertyForRent.img != "/images/property.jpg" ? propertyForRent.img : "https://bhrp.vercel.app" + propertyForRent.img;
    const hours = 24;
    const data = { name: "HOUSE#" + propertyForRent.id, description: propertyForRent.desc, image: img, price: propertyForRent.price };
    cache.put(id, data, hours * 1000 * 60 * 60);
    return res.status(200).json(data);
  }

}

