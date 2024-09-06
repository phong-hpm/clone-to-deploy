import { FC, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { SLIDER_CARD_CONFIGS } from 'constants/parameters';
import { useParametersStore } from 'stores/parameters';

import { ReactComponent as LargeLensIcon } from 'assets/SVG/LargeLensIcon.svg';

import { ReactComponent as MiniLensMaskIcon } from 'assets/SVG/MiniLensMaskIcon.svg';

import SklandTotalParams from './SklandTotalParams';
import SliderCard from './SliderCard/SliderCard';

import InputNumberField from 'fields/InputNumberField';
import R01 from './R01';

import { TFormData } from '..';
import classNames from 'classnames';

interface ParametersEditorProps {
  form: UseFormReturn<TFormData>;
  setLensType: (lensType: string) => void;
}

const ParametersEditor: FC<ParametersEditorProps> = ({ form, setLensType }) => {
  const { referenceLensData, rootCategory } = useParametersStore();

  const { watch, trigger } = form;

  const conditionalLens = watch('custom_parameters.contact_lens');

  const siderCardConfigs = useMemo(() => {
    if (!rootCategory) return [];
    return SLIDER_CARD_CONFIGS[rootCategory.name] || [];
  }, [rootCategory]);

  if (rootCategory?.name === 'SMT' || rootCategory?.name === 'SKV') {
    setLensType('large');
  } else {
    setLensType('small');
  }

  if (!referenceLensData) return null;

  return (
    <div className='max-h-full overflow-auto bg-[#F5F5F7] flex-grow rounded-md mb-4'>
      <div className='p-6 text-2xl font-semibold'>
        Parameteränderungen {rootCategory?.name}
      </div>

      <div className='flex flex-col justify-center items-center'>
        <div className='relative flex flex-col justify-center items-center'>
          <div
            className={classNames(
              'absolute top-[324px] text-xs text-[#6F797B]',
              rootCategory?.name === 'SMT' || rootCategory?.name === 'SKV'
                ? 'right-[675px]'
                : 'right-[712px]'
            )}
          >
            rskl
          </div>

          <div>
            <InputNumberField
              label='Überbrückungsänderung (µm)'
              name='custom_parameters.xs'
              control={form.control}
              style={{ width: 180 }}
              InputLabelProps={{ shrink: true }}
              uber={true}
            />
          </div>

          {rootCategory?.name === 'SMT' || rootCategory?.name === 'SKV' ? (
            <>
              <R01 form={form} />
              <div className='absolute left-[817px] top-[335px] text-[#3e484a]'>
                {conditionalLens === 'left' ? 'Temporal' : 'Nasal'}
              </div>
              <div className='absolute top-[335px] right-[805px] text-[#3e484a]'>
                {conditionalLens === 'left' ? 'Nasal' : 'Temporal'}
              </div>
              <LargeLensIcon />
            </>
          ) : (
            <>
              <R01 form={form} miniLens={true} />
              <div className='absolute left-[800px] top-[335px] text-[#3e484a]'>
                {conditionalLens === 'left' ? 'Temporal' : 'Nasal'}
              </div>
              <div className='absolute top-[335px] right-[820px] text-[#3e484a]'>
                {conditionalLens === 'left' ? 'Nasal' : 'Temporal'}
              </div>

              <MiniLensMaskIcon />
            </>
          )}
        </div>
        <div className='text-xs text-[#6F797B] flex flex-row justify-center items-center pb-2'>
          ioz
          <p className='text-sm text-black pl-1'>{referenceLensData.ioz}</p>
        </div>
        {/* Imput value abouve */}
        <SklandTotalParams form={form} trigger={trigger} />
      </div>

      <div className='max-w-6xl flex flex-col 2xl:flex-row items-stretch justify-center gap-4 mt-8 mx-auto px-4'>
        {siderCardConfigs.map((config, index) => (
          <SliderCard key={index} form={form} config={config} />
        ))}
      </div>
    </div>
  );
};

export default ParametersEditor;
