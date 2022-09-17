import { Container, Row, Col,Carousel } from 'react-bootstrap';
import { baseUrl, fetchApi } from '@/utils/fetchApi';
import Layout from '@/components/Layout';
import Image from 'next/image';
import About from './about';
import Features from './features';
import AgentInfo from './agent';
import styles from '@/styles/SingleProperty.module.css';
import {  getNameByCateID } from '@/utils/filterData';

const { PrismaClient } = require('@prisma/client')

export default async function handle({
  property: { id, room, bath, type, price, desc, wallet, img, ens },
}){
//   {
//     "name": "Thor's hammer",
//     "description": "Mjölnir, the legendary hammer of the Norse god of thunder.",
//     "image": "https://game.example/item-id-8u5h2m.png",
//     "strength": 20
// }
  return res.status(200).json({ name: "HOUSE#"+id, description: desc, image:img, price: price});
}

export async function getServerSideProps({ params: { id } }) {
  const prisma = new PrismaClient();
  const propertyForRent = await prisma.house.findUnique({
    where: { id: parseInt(id) }
  });
  return {
    props: {
      property: propertyForRent,
    }
  };
}
