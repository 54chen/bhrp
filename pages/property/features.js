import { Row, Col } from 'react-bootstrap';
import { BsCheck2Square } from 'react-icons/bs';

export default function Features({ amenity }) {
  return (
    <Col lg={4} className='pt-2 pb-2 px-4'>
      <div className='d-flex'>
        <div className='d-flex me-2 mt-1 text-success'>
          <BsCheck2Square />
        </div>
        <p className='text-secondary'>{amenity}</p>
      </div>
    </Col>
  );
}
