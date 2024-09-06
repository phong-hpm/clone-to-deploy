import { UseFormReturn } from 'react-hook-form';

import InputNumberField from 'fields/InputNumberField';

import { ReactComponent as ArrowRightShortIcon } from 'assets/SVG/ArrowRightShort.svg';
import { ReactComponent as ArrowRightMediumIcon } from 'assets/SVG/ArrowRightMedium.svg';
import { ReactComponent as ArrowRightLargeIcon } from 'assets/SVG/ArrowRightLarge.svg';
import { ReactComponent as ArrowShortLeftIcon } from 'assets/SVG/ArrowShortLeft.svg';
import { ReactComponent as ArrowMediumLeftIcon } from 'assets/SVG/ArrowMediumLeft.svg';
import { ReactComponent as ArrowLargeLeftIcon } from 'assets/SVG/ArrowLargeLeft.svg';

import { TFormData } from '..';

type SklandTotalParamsProps = {
  form: UseFormReturn<TFormData>;
  trigger?: any;
};

const SklandTotalParams: React.FC<SklandTotalParamsProps> = ({
  form,
  trigger,
}) => {
  return (
    <div className='flex flex-row'>
      <div className='flex flex-col items-end gap-10 pr-8'>
        <ArrowShortLeftIcon style={{ maxWidth: '100%' }} />
        <ArrowMediumLeftIcon style={{ maxWidth: '100%' }} />
        <ArrowLargeLeftIcon style={{ maxWidth: '100%' }} />
      </div>

      <div className='flex flex-col'>
        <InputNumberField
          className='w-40'
          label='⌀ skl (mm)'
          name='custom_parameters.skl_diameter'
          control={form.control}
          step={0.1}
          trigger={trigger}
        />
        <InputNumberField
          className='w-40'
          label='⌀ Total (mm)'
          step={0.1}
          name='custom_parameters.total_diameter'
          control={form.control}
          trigger={trigger}
        />
      </div>

      <div className='flex flex-col gap-10 pl-8'>
        <ArrowRightShortIcon style={{ maxWidth: '100%' }} />
        <ArrowRightMediumIcon style={{ maxWidth: '100%' }} />
        <ArrowRightLargeIcon style={{ maxWidth: '100%' }} />
      </div>
    </div>
  );
};

export default SklandTotalParams;
