export default function Title({ title, info }) {
  return (
    <div>
      <h2 className='fw-bold text-center mt-5'>{title}</h2>
      <p className='text-center fs-5 mb-5 fw-bold text-secondary'>{info}</p>
    </div>
  );
}
