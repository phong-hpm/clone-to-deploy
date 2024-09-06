import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import cloneDeep from 'lodash/cloneDeep';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { CircularProgress } from '@mui/material';

import { TLens } from 'types/lens';
import { TReferenceLens } from 'types/reference-lens';
import { useParametersStore } from 'stores/parameters';
import { getReferenceLensByIdApi } from 'apis/reference-lens';
import { createLensApi, getLensByIdApi, updateLensApi } from 'apis/lens';
import { findCategories } from 'helpers/parameters';
import { convertStringToNumber } from 'helpers/converter';

import useLoadLensesData from 'hooks/useLoadLensesData';
import useLoadCategoriesData from 'hooks/useLoadCategoriesData';

import Sidebar from './Sidebar';
import ParametersEditor from './ParametersEditor';

export type TFormData = {
  reference_lens_id?: number;
  customer_reference?: string;
  remark?: string;
  supply_concept?: string;
  custom_parameters?: Partial<
    Omit<TReferenceLens, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>
  >;
};

//Keep for reference during develpment

// const schema = yup.object({
//   remark: yup.string().required('Required'),
//   customer_reference: yup.string().required('Required'),
//   custom_parameters: yup.object({
//     // contact_lens: yup.string().required('Required'),
//     // sphere: yup.string().required('Required'),
//     // cylinder: yup.string().required('Required'),
//     // axis: yup.string().required('Required'),
//     // ds: yup.string().required('Required'),
//     // hsa: yup.string().required('Required'),
//     // add: yup.string().required('Required'),

//     // single_multi_strengthen: yup.string().required('Required'),
//     // is_distant_center: yup.boolean().required('Required'),
//     // center_zone: yup.string().required('Required'),
//     // intermediate_zone: yup.string().required('Required'),

//     // material: yup.string().required('Required'),
//     // engraving_type: yup.string().required('Required'),
//     // engraving_angle_deg: yup.string().required('Required'),

//     // skleral_radius_flach: yup.string().required('Required'),
//     // limbal_flach: yup.string().required('Required'),
//     // skleral_radius_steil: yup.string().required('Required'),
//     // limbal_steil: yup.string().required('Required'),
//     // toricity: yup.string().required('Required'),

//     // r01: yup.string().required('Required'),
//     // xs: yup.string().required('Required'),
//     skl_diameter: yup
//       .number()
//       .min(13.5, 'Minimum value is 13.5')
//       .max(17, 'Maximum value is 17')
//       .required('KIKI'),

//     total_diameter: yup
//       .number()
//       .min(13.5, 'Minimum value is 13.5')
//       .max(17, 'Maximum value is 17')
//       .required('KIKI'),
//   }),
// });

const getValidationSchema = (lensType: string) => {
  return yup.object({
    remark: yup.string().required('Required'),
    customer_reference: yup.string().required('Required'),
    custom_parameters: yup.object({
      skl_diameter: yup.number().when([], (skl_diameter, schema) => {
        switch (lensType) {
          case 'large':
            return schema
              .min(12, 'Input range is from 12.00 to 14.50')
              .max(14.5, 'Input range is from 12.00 to 14.50')
              .required('Required');
          case 'small':
            return schema
              .min(12, 'Input range is from 12.00 to 13.50')
              .max(13.5, 'Input range is from 12.00 to 13.50')
              .required('Required');
          default:
            return schema
              .min(13.5, 'Minimum value is 13.5')
              .max(17, 'Maximum value is 17')
              .required('Required');
        }
      }),

      total_diameter: yup.number().when([], (totalDiameter, schema) => {
        switch (lensType) {
          case 'large':
            return schema
              .min(14, 'Input range is from 14.00 to 17.50')
              .max(17.5, 'Input range is from 14.00 to 17.50')
              .required('Required');
          case 'small':
            return schema
              .min(13.5, 'Input range is from 13.50 to 15.50')
              .max(15.5, 'Input range is from 13.50 to 15.50')
              .required('Required');
          default:
            return schema
              .min(13.5, 'Minimum value is 13.5')
              .max(17, 'Maximum value is 17')
              .required('Required');
        }
      }),
    }),
  });
};

const mapFormDefaulValues = (data?: {
  lensData?: Partial<TLens>;
  referenceLensData?: Partial<TReferenceLens>;
}): TFormData => {
  const customParameters = cloneDeep(data?.referenceLensData);
  if (customParameters) {
    delete customParameters.id;
    delete customParameters.created_at;
    delete customParameters.updated_at;
    delete customParameters.deleted_at;

    if (!data?.lensData) {
      customParameters.xs = undefined;
    }
  }

  return {
    customer_reference: data?.lensData?.customer_reference || '',
    remark: data?.lensData?.remark || '',
    supply_concept: data?.lensData?.supply_concept || 'standard',

    reference_lens_id: data?.referenceLensData?.id,
    custom_parameters: customParameters,
  };
};

const parseData = (data: TFormData): TFormData => {
  const { custom_parameters, ...rest } = data;

  return {
    ...rest,
    custom_parameters: {
      contact_lens: custom_parameters?.contact_lens,
      color: custom_parameters?.color,
      sphere: convertStringToNumber(custom_parameters?.sphere),
      cylinder: convertStringToNumber(custom_parameters?.cylinder),
      axis: convertStringToNumber(custom_parameters?.axis),
      ds: convertStringToNumber(custom_parameters?.ds),
      hsa: convertStringToNumber(custom_parameters?.hsa),
      add: convertStringToNumber(custom_parameters?.add),

      single_multi_strengthen:
        custom_parameters?.single_multi_strengthen || null,
      is_distant_center: custom_parameters?.is_distant_center,
      center_zone: convertStringToNumber(custom_parameters?.center_zone),
      intermediate_zone: convertStringToNumber(
        custom_parameters?.intermediate_zone
      ),

      material: custom_parameters?.material,
      engraving_type: custom_parameters?.engraving_type,
      engraving_angle_deg: convertStringToNumber(
        custom_parameters?.engraving_angle_deg
      ),

      skleral_radius_flach: convertStringToNumber(
        custom_parameters?.skleral_radius_flach
      ),
      limbal_flach: convertStringToNumber(custom_parameters?.limbal_flach),
      skleral_radius_steil: convertStringToNumber(
        custom_parameters?.skleral_radius_steil
      ),
      limbal_steil: convertStringToNumber(custom_parameters?.limbal_steil),
      toricity: custom_parameters?.toricity,

      r01: convertStringToNumber(custom_parameters?.r01),
      xs: convertStringToNumber(custom_parameters?.xs),
      skl_diameter: convertStringToNumber(custom_parameters?.skl_diameter),
      total_diameter: convertStringToNumber(custom_parameters?.total_diameter),
    },
  };
};

const ParametersPage = () => {
  const { id, mode } = useParams();
  const [lensType, setLensType] = useState('default');

  const {
    referenceLensData,
    setReferenceLensData,
    lensData,
    setLensData,
    setCategory,
    setRootCategory,
    resetAll,
  } = useParametersStore();

  const { loading: loadingCategories, categoryList } = useLoadCategoriesData();
  const { onFetch: reloadLens } = useLoadLensesData({ skip: true });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const form = useForm<TFormData>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resolver: yupResolver(getValidationSchema(lensType)),
    defaultValues: mapFormDefaulValues(),
  });

  const { reset, handleSubmit } = form;

  const onSubmit = handleSubmit(async (data) => {
    setSaving(true);
    try {
      if (mode === 'edit') {
        await updateLensApi(id || '', parseData(data));
        toast('Successfully updated');
      } else {
        await createLensApi(parseData(data));
        toast('Successfully added in cart');
      }
      await reloadLens();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  });

  useEffect(() => {
    reset(mapFormDefaulValues({ lensData, referenceLensData }));
  }, [lensData, referenceLensData, reset]);

  useEffect(() => {
    resetAll();

    if (!id) return;
    if (mode === 'edit') {
      getLensByIdApi(id)
        .then((res) => {
          if (res?.data) {
            setLensData(res.data?.lens);
            setReferenceLensData(res.data?.referenceLens);
          }
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    } else {
      getReferenceLensByIdApi(id)
        .then((res) => {
          if (res?.data) setReferenceLensData(res.data);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [id, mode, setReferenceLensData, setLensData, resetAll]);

  useEffect(() => {
    const { category, rootCategory } = findCategories(
      categoryList,
      referenceLensData?.category_id
    );

    setCategory(category);
    setRootCategory(rootCategory);
  }, [referenceLensData, categoryList, setCategory, setRootCategory]);

  if (loading || loadingCategories) {
    return (
      <div className='flex flex-row justify-center items-center pt-40'>
        <CircularProgress size={100} />
      </div>
    );
  }

  if (!referenceLensData) {
    return (
      <div className='flex flex-row justify-center items-center pt-40'>
        <p className='text-2xl text-red-500'>Data not found</p>
      </div>
    );
  }

  return (
    <form
      className='max-h-full flex flex-row overflow-hidden px-4 pt-4'
      onSubmit={onSubmit}
    >
      <Sidebar saving={saving} form={form} />
      <ParametersEditor form={form} setLensType={setLensType} />
    </form>
  );
};

export default ParametersPage;
