import styles from '@/styles/RecentProperty.module.css';
import { getNameByCateID } from '@/utils/filterData';
import Image from 'next/image';
import Link from 'next/link';
import { Card, Col } from 'react-bootstrap';
import { BsFillHouseFill } from 'react-icons/bs';
import { FaBath, FaBed } from 'react-icons/fa';
import { GoPerson } from 'react-icons/go';



export default function RecentProperty({ property }) {
  // const {
  //   baths,
  //   coverPhoto,
  //   furnishingStatus,
  //   price,
  //   purpose,
  //   rentFrequency,
  //   externalID,
  //   rooms,
  //   title,
  // } 
  const { id, room, bath, type, price, desc, wallet, img } = property;
  return (
    <Col md={6} lg={4} className={styles.recent}>
      <Link href={`/property/${id}`} passHref>
        <Card className='mb-4'>
          <Image
            src={img}
            width={200}
            height={200}
            objectFit='cover'
          />
          <Card.Body>
            <div className='d-flex'>
              {/*<p className='bg-warning p-2 rounded me-2'>{purpose}</p>*/}
              <p className='bg-success p-2 rounded'><GoPerson className='text-success' /> &nbsp;
                {wallet ? wallet.substr(0, 4) + ".." + wallet.substr(-3) : 'anonymous'}
              </p>
              <NameByCateID type={type} />
            </div>
            <Card.Title className='fs-6'>
              {desc.length > 30 ? desc.substring(0, 50) + '...' : desc}
            </Card.Title>

            <Card.Text className={styles.textPro}>
              <FaBed className='me-1' /> {room} Bedroom
              <FaBath className='ms-4 ms-lg-5 me-1' /> {bath} Bathroom
            </Card.Text>
          </Card.Body>

          <Card.Footer>
            <div className={styles.cFooter}>
              <h6 className='mt-1'>
                {/* Add comma on price */}
                $ {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}

              </h6>
              <Link href={`/property/${id}`}>
                <a className='btn btn-primary btn-sm'>Details</a>
              </Link>
            </div>
          </Card.Footer>
        </Card>
      </Link>
    </Col>
  );
}


function NameByCateID(props) {
  const name = getNameByCateID(props.type);

  return (<p className='bg-success p-2 rounded'><BsFillHouseFill className='text-success' /> &nbsp;{name}</p>);
}

