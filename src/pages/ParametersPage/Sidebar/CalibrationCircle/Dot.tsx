import classNames from 'classnames';
const colorClassMap = {
  schwarz: 'bg-[#001F26] border border-gray-500',
  braun: 'bg-[#CE6F00] border border-gray-500',
  hellblau: 'bg-[#00C2FF] border border-gray-500',
  grün: 'bg-[#299D00] border border-gray-500',
  weiss: 'bg-[#FFFFFF] border border-gray-500',
  primaryBlue: 'bg-primaryBlue border border-gray-500',
};

interface DotProps {
  onClick: () => void;
  color?: 'black' | 'brown' | 'lightblue' | 'green' | 'white' | 'primaryBlue';
  selected?: boolean;
}

const Dot: React.FC<DotProps> = ({
  selected,
  onClick,
  color = 'white',
}): JSX.Element => {
  const handleClick = () => {
    onClick();
  };
  return (
    <div
      onClick={handleClick}
      className='w-[18px] h-[18px] border border-black rounded-full cursor-pointer flex items-center justify-center'
    >
      <div
        className={classNames(
          selected
            ? colorClassMap[color as keyof typeof colorClassMap]
            : 'bg-white',
          'w-3 h-3 rounded-full'
        )}
      />
    </div>
  );
};

export default Dot;
