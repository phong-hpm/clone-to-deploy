const SliderCardInfo = () => {
  return (
    <div className='flex flex-row justify-start shadow bg-white rounded-md w-[228px] h-[331px] gap-1'>
      <div className='flex flex-col justify-center items-end w-full text-xs text-[#6F797B] gap-[12px] pr-4'>
        <p>Skleralzone</p>
        <p>-5</p>
        <p>-4</p>
        <p>-3</p>
        <p>-2</p>
        <p>-1</p>
        <p>0</p>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
      </div>
      <div className='flex flex-col justify-center items-start gap-[8px] w-full text-sm pr-2'>
        <p>Skleralradius(mm) </p>
        <p>9.50</p>
        <p>10.00</p>
        <p>10.50</p>
        <p>11.00</p>
        <p>11.50</p>
        <p>12.00</p>
        <p>12.50</p>
        <p>13.00</p>
        <p>13.50</p>
        <p>14.00</p>
      </div>
    </div>
  );
};

export default SliderCardInfo;
