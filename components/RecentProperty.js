import { Col, Card, Text } from 'react-bootstrap';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { FaBed, FaBath } from 'react-icons/fa';
import styles from '@/styles/RecentProperty.module.css';

export default function RecentProperty({ property }) {
  const {
    baths,
    coverPhoto,
    furnishingStatus,
    price,
    purpose,
    rentFrequency,
    externalID,
    rooms,
    title,
  } = property;

  return (
    <Col md={6} lg={4} className={styles.recent}>
      <Link href={`/property/${externalID}`} passHref>
        <Card className='mb-4'>
          <Image
            src={coverPhoto.url}
            width={200}
            height={200}
            objectFit='cover'
          />
          <Card.Body>
            <div className='d-flex'>
              {/*<p className='bg-warning p-2 rounded me-2'>{purpose}</p>*/}
              <p className='bg-success p-2 rounded'>
                {furnishingStatus ? furnishingStatus : 'unfunished'}
              </p>
            </div>
            <Card.Title className='fs-6'>
              {title.length > 30 ? title.substring(0, 50) + '...' : title}
            </Card.Title>

            <Card.Text className={styles.textPro}>
              <FaBed className='me-1' /> {rooms} Bedroom
              <FaBath className='ms-4 ms-lg-5 me-1' /> {baths} Bathroom
            </Card.Text>
          </Card.Body>

          <Card.Footer>
            <div className={styles.cFooter}>
              <h6 className='mt-1'>
                {/* Add comma on price */}
                $ {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                {rentFrequency && ` ${rentFrequency}`}
              </h6>
              <Link href={`/property/${externalID}`}>
                <a className='btn btn-primary btn-sm'>Details</a>
              </Link>
            </div>
          </Card.Footer>
        </Card>
      </Link>
    </Col>
  );
}
