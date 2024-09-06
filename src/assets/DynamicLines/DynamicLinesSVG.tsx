type DynamicLinesSVGProps = {
  roundedAngle: number;
};

const DynamicLinesSVG: React.FC<DynamicLinesSVGProps> = ({ roundedAngle }) => (
  <>
    {!!roundedAngle && (
      <svg className='absolute top-0 left-0 w-full h-full'>
        <svg className='absolute top-0 left-0 w-full h-full'>
          <line
            x1='50%'
            y1='0'
            x2='50%'
            y2='100%'
            stroke='black'
            strokeWidth='2'
            opacity={roundedAngle === 90 || roundedAngle === 270 ? 1 : 0}
          />
          <line
            x1='0'
            y1='50%'
            x2='100%'
            y2='50%'
            stroke='black'
            strokeWidth='2'
            opacity={roundedAngle === 0 || roundedAngle === 180 ? 1 : 0}
          />
          <line
            x1='0'
            y1='63%'
            x2='100%'
            y2='37%'
            stroke='black'
            strokeWidth='2'
            opacity={roundedAngle === 15 || roundedAngle === 195 ? 1 : 0}
          />
          <line
            x1='6%'
            y1='75%'
            x2='93%'
            y2='25%'
            stroke='black'
            strokeWidth='2'
            opacity={roundedAngle === 30 || roundedAngle === 210 ? 1 : 0}
          />
          <line
            x1='15%'
            y1='85%'
            x2='85%'
            y2='15%'
            stroke='black'
            strokeWidth='2'
            opacity={roundedAngle === 45 || roundedAngle === 225 ? 1 : 0}
          />
          <line
            x1='25%'
            y1='95%'
            x2='75%'
            y2='5%'
            stroke='black'
            strokeWidth='2'
            opacity={roundedAngle === 60 || roundedAngle === 240 ? 1 : 0}
          />
          <line
            x1='35%'
            y1='105%'
            x2='65%'
            y2='-5%'
            stroke='black'
            strokeWidth='2'
            opacity={roundedAngle === 75 || roundedAngle === 255 ? 1 : 0}
          />
          <line
            x1='69%'
            y1='120%'
            x2='36%'
            y2='-5%'
            stroke='black'
            strokeWidth='2'
            opacity={roundedAngle === 105 || roundedAngle === 285 ? 1 : 0}
          />
          <line
            x1='75%'
            y1='93%'
            x2='25%'
            y2='6%'
            stroke='black'
            strokeWidth='2'
            opacity={roundedAngle === 120 || roundedAngle === 300 ? 1 : 0}
          />
          <line
            x1='84%'
            y1='85%'
            x2='16%'
            y2='15%'
            stroke='black'
            strokeWidth='2'
            opacity={roundedAngle === 135 || roundedAngle === 315 ? 1 : 0}
          />
          <line
            x1='94%'
            y1='75%'
            x2='6%'
            y2='25%'
            stroke='black'
            strokeWidth='2'
            opacity={roundedAngle === 150 || roundedAngle === 330 ? 1 : 0}
          />
          <line
            x1='105%'
            y1='65%'
            x2='-5%'
            y2='35%'
            stroke='black'
            strokeWidth='2'
            opacity={roundedAngle === 165 || roundedAngle === 345 ? 1 : 0}
          />
        </svg>
      </svg>
    )}
  </>
);

export default DynamicLinesSVG;
