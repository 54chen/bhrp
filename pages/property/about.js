export default function AboutPropertyPage({ description }) {
  return (
    <div className='bg-white mt-4 shadow-sm'>
      <h2 className='fs-5 fw-bold pt-4 pb-4 border-bottom px-4'>
        About Property
      </h2>
      <p className='text-secondary p-3 lh-lg'>{description}</p>
    </div>
  );
}
