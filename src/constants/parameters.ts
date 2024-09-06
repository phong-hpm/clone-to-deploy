import { TCategoryName } from 'types/category';
import { TReferenceLens } from 'types/reference-lens';

export type TOverrefractionInputOption = {
  field: 'sphere' | 'cylinder' | 'axis' | 'ds' | 'hsa' | 'add';
  label: string;
  step: number;
};

export const OVERREFRACTION_INPUTS: TOverrefractionInputOption[] = [
  { field: 'sphere', label: 'Sphäre (D)', step: 0.05 },
  { field: 'cylinder', label: 'Zylinder (D)', step: 0.05 },
  { field: 'axis', label: 'Axis°', step: 1 },
  { field: 'ds', label: 'ds°', step: 1 },
  { field: 'hsa', label: 'HSA (mm)', step: 1 },
  { field: 'add', label: 'ADD (Dpt)', step: 1 },
];

export const MATERIAL_OPTIONS = [
  { label: 'O-EXTREM WEISS', value: '1' },
  { label: 'O-INFINITE WEISS', value: '2' },
  { label: 'B-XO WEISS', value: '3' },
  { label: 'O-EXTREM ICE 18M', value: '4' },
  { label: 'B-XO ICE 17MM', value: '5' },
  { label: 'EQUA WEISS', value: '6' },
  { label: 'EQUA', value: '7' },
  { label: 'Silicone', value: '9' },
  { label: 'Other', value: '8' },
];

export type TSiderCardConfig = {
  header?: { iconType?: 'flachen' | 'steilen'; title: string };
  inputs: {
    label: string;
    field: keyof TReferenceLens;
    min?: number;
    max?: number;
    step?: number;
  }[];
};

export const SLIDER_CARD_CONFIGS: Record<TCategoryName, TSiderCardConfig[]> = {
  SKV: [
    {
      inputs: [
        {
          label: 'Skleralradius (mm)',
          field: 'skleral',
          min: 9.5,
          max: 14,
          step: 0.5,
        },
      ],
    },
    {
      inputs: [
        {
          label: 'Limbaldesign (Asphäre)',
          field: 'limbal_design',
          min: 0,
          max: 15,
        },
      ],
    },
  ],
  SMT: [
    {
      header: { iconType: 'flachen', title: 'Flachen Meridian' },
      inputs: [
        {
          label: 'Skleralradius (mm)',
          field: 'skleral_radius_flach',
          min: 9.5,
          max: 14,
          step: 0.5,
        },
        {
          label: 'Limbaldesign (Asphäre)',
          field: 'limbal_flach',
          min: 0,
          max: 15,
        },
      ],
    },
    {
      header: { iconType: 'steilen', title: 'Steilen Meridian' },
      inputs: [
        {
          label: 'Skleralradius (mm)',
          field: 'skleral_radius_steil',
          min: 9.5,
          max: 14,
          step: 0.5,
        },
        {
          label: 'Limbaldesign (Asphäre)',
          field: 'limbal_steil',
          min: 0,
          max: 15,
        },
        {
          label: 'Torizität',
          field: 'toricity',
          min: -5,
          max: 5,
        },
      ],
    },
  ],
  miniV: [
    {
      inputs: [
        {
          label: 'Skleralradius (mm)',
          field: 'skleral',
          min: 9.5,
          max: 14,
          step: 0.5,
        },
      ],
    },
    {
      inputs: [
        {
          label: 'Limbaldesign (Asphäre)',
          field: 'limbal_design',
          min: 0,
          max: 15,
        },
      ],
    },
  ],
  miniT: [
    {
      header: { iconType: 'flachen', title: 'Flachen Meridian' },
      inputs: [
        {
          label: 'Skleralradius (mm)',
          field: 'skleral_radius_flach',
          min: 9.5,
          max: 14,
          step: 0.5,
        },
        {
          label: 'Limbaldesign (Asphäre)',
          field: 'limbal_flach',
          min: 0,
          max: 15,
        },
      ],
    },
    {
      header: { iconType: 'steilen', title: 'Steilen Meridian' },
      inputs: [
        {
          label: 'Skleralradius (mm)',
          field: 'skleral_radius_steil',
          min: 9.5,
          max: 14,
          step: 0.5,
        },
        {
          label: 'Limbaldesign (Asphäre)',
          field: 'limbal_steil',
          min: 0,
          max: 15,
        },
        {
          label: 'Torizität',
          field: 'toricity',
          min: -5,
          max: 5,
        },
      ],
    },
  ],
};

//calibration circle
export const RADIUS = 58;
export const DIAMETER = RADIUS * 2;
export const CIRCUMFERENCE = DIAMETER * Math.PI;
export const SMALL_DIAMETER = 15;

//engraving type
export const ENGRAVING_TYPE_OPTIONS: {
  value: TReferenceLens['engraving_type'];
  label: string;
}[] = [
  { value: 'with_out_color_point', label: 'Eine Punktgravur ohne Farbpunkt' },
  { value: 'with_color_point', label: 'Eine Punktgravur mit Farbpunkt' },
  { value: 'colon_engraving', label: 'Doppelpunktgravur mit Farbpunkt' },
  { value: null, label: 'Doppelpunktgravur ohne Farbpunkt' },
];
