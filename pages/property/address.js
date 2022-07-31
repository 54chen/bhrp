import { GoLocation } from 'react-icons/go';

export default function AddressPage({
  baths,
  rooms,
  area,
  price,
  purpose,
  rentFrequency,
}) {
  return (
    <div className='bg-white pt-4 pb-2 ps-4 mt-5 shadow-sm'>
      <div className='d-flex'>
        <p className='bg-warning rounded p-2 me-2'>
          {price} $
          {rentFrequency && ` ${rentFrequency}`}
        </p>
        <p className='bg-success rounded p-2 me-2'>{rooms} Bedroom</p>
         
      </div>
    </div>
  );
}
