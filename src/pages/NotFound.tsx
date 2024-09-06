const NotFound: React.FC = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 pt-40'>
      <p className='font-bold text-red-500 text-8xl'>404</p>
      <h1 className='font-bold text-2xl'>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
