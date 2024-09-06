import { FC, useEffect, useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import isNil from 'lodash/isNil';

import CalculateIcon from '@mui/icons-material/Calculate';

import { useParametersStore } from 'stores/parameters';

import { TFormData } from '..';
import { calculationR01LensApi } from 'apis/lens-calculations';
import { CircularProgress, IconButton } from '@mui/material';
import classNames from 'classnames';
import FieldErrorMessage from 'features/FieldErrorMessage';

interface R01Props {
  form: UseFormReturn<TFormData>;
  miniLens?: boolean;
}

const R01: FC<R01Props> = ({ form, miniLens }) => {
  const { referenceLensData, rootCategory } = useParametersStore();

  const { watch, setValue, setError } = form;

  const [calculating, setCalculating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const r01 = watch('custom_parameters.r01');

  const xs = watch('custom_parameters.xs');
  const skl_diameter = watch('custom_parameters.skl_diameter');
  const total_diameter = watch('custom_parameters.total_diameter');
  const skleral = watch('custom_parameters.skleral');
  const limbal_design = watch('custom_parameters.limbal_design');

  const skleral_radius_flach = watch('custom_parameters.skleral_radius_flach');
  const limbal_flach = watch('custom_parameters.limbal_flach');
  const skleral_radius_steil = watch('custom_parameters.skleral_radius_steil');
  const limbal_steil = watch('custom_parameters.limbal_steil');
  const toricityValue = watch('custom_parameters.toricity');

  const toricity = useMemo(() => {
    if (['---', '+++'].includes(String(toricityValue))) return 0;
    else return toricityValue;
  }, [toricityValue]);

  const categoryKey = useMemo<'mini-t' | 'mini-v' | 'skv' | 'smt' | ''>(() => {
    if (rootCategory?.name === 'SMT') return 'smt';
    if (rootCategory?.name === 'SKV') return 'skv';
    if (rootCategory?.name === 'miniV') return 'mini-v';
    if (rootCategory?.name === 'miniT') return 'mini-t';
    return '';
  }, [rootCategory?.name]);

  const dataForCalculate = useMemo(() => {
    if (!categoryKey || !referenceLensData) return;

    if (categoryKey === 'smt') {
      return {
        reference_lens_id: referenceLensData.id,
        delta_xs: xs,
        d_skl: skl_diameter,
        d_t: total_diameter,
        l1: limbal_flach,
        l2: limbal_steil,
        t: toricity,
        rskl1: skleral_radius_flach,
        rskl2: skleral_radius_steil,
      };
    }

    if (categoryKey === 'skv') {
      return {
        reference_lens_id: referenceLensData.id,
        delta_xs: xs,
        d_skl: skl_diameter,
        d_t: total_diameter,
        l: limbal_design,
        rskl: skleral,
      };
    }

    if (categoryKey === 'mini-v') {
      return {
        reference_lens_id: referenceLensData.id,
        delta_xs: xs,
        d_skl: skl_diameter,
        d_t: total_diameter,
        l: limbal_design,
        rskl: skleral,
      };
    }

    if (categoryKey === 'mini-t') {
      return {
        reference_lens_id: referenceLensData.id,
        delta_xs: xs,
        d_skl: skl_diameter,
        d_t: total_diameter,
        l1: limbal_flach,
        l2: limbal_steil,
        t: toricity,
        rskl1: skleral_radius_flach,
        rskl2: skleral_radius_steil,
      };
    }

    return null;
  }, [
    categoryKey,
    xs,
    limbal_flach,
    limbal_steil,
    referenceLensData,
    skl_diameter,
    skleral_radius_flach,
    skleral_radius_steil,
    toricity,
    total_diameter,
    skleral,
    limbal_design,
  ]);

  const hasNilValue = useMemo(() => {
    if (!dataForCalculate) return true;
    return Object.values(dataForCalculate || {}).some((value) => isNil(value));
  }, [dataForCalculate]);

  // reference_lens_id: 383 -> work
  const handleCalculateR01 = async () => {
    if (hasNilValue || !categoryKey || !referenceLensData) return;

    try {
      setCalculating(true);
      const res = await calculationR01LensApi(categoryKey, dataForCalculate);
      if (res?.[0] && !isNaN(Number(res[0]))) {
        setValue('custom_parameters.r01', Number(res[0]));
      }
    } catch (error) {
      console.error(error);
      setError('custom_parameters.r01', {
        type: 'manual',
        message: 'Calculation Error',
      });
      setErrorMessage('Calculation Error');
    } finally {
      setCalculating(false);
    }
  };

  useEffect(() => {
    const handleClick = () => {
      setErrorMessage('');
      form.clearErrors('custom_parameters.r01');
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [form]);

  if (!referenceLensData) return null;

  return (
    <div
      className={classNames(
        'flex flex-row h-10 text-sm justify-center text-[#3F484B] items-center bg-white absolute z-10 pl-4 pr-2 py-3 rounded-md bottom-20',
        { 'right-[255px]': !miniLens, 'right-[245px]': miniLens }
      )}
    >
      <span>r0.1 (mm)</span>
      <p className='text-xl semibold px-2 text-black'>{r01}</p>
      <IconButton
        disabled={hasNilValue || calculating}
        size='small'
        color='primary'
        onClick={handleCalculateR01}
      >
        {calculating ? <CircularProgress size={24} /> : <CalculateIcon />}
      </IconButton>

      <FieldErrorMessage message={errorMessage} />
    </div>
  );
};

export default R01;
