export type TReferenceLens = {
  id: number;
  lot_number: string | null;
  reference_name: string | null;
  category_id: number | null;
  total_diameter: number | null;
  skl_diameter: number | null;
  ioz: number | null;
  x: number | null;
  xs: number | null;
  center_radius: number | null;
  material: string | null;
  skleral: number | null;
  contact_lens: string | null;
  single_multi_strengthen: 'single' | 'multi' | 'multi_b2' | 'multi_d3' | null;
  limbal_flach: number | null;
  limbal_design: number | null;
  skleral_radius_flach: number | null;
  limbal_steil: number | null;
  skleral_radius_steil: number | null;
  engraving_type:
    | 'with_out_color_point'
    | 'with_color_point'
    | 'colon_engraving'
    | null;
  engraving_angle_deg: number | null;
  color: 'schwarz' | 'braun' | 'hellblau' | 'grün' | 'weiss' | null;
  // color: 'white' | 'brown' | 'lightblue' | 'green' | 'white' | null;
  adjustment_micron: number | null;
  intermediate_zone: number | null;
  center_zone: number | null;
  is_distant_center: boolean | null;
  dpt: number | null;
  sphere: number | null;
  cylinder: number | null;
  axis: number | null;
  ds: number | null;
  hsa: number | null;
  add: number | null;
  toricity: number | null;
  r01: number | null;
  prod_xs: number | null;

  creator_id: number | null;
  modifier_id: number | null;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;

  // Old data (not used)
  aussen: string | null;
  bemerkungen: string | null;
  prod_innen: string | null;
  endkontr: string | null;
  radius_11: number | null;
  radius_12: number | null;
  radius_21: number | null;
  radius_22: number | null;
  radius_31: number | null;
  radius_32: number | null;
  radius_41: number | null;
  radius_42: number | null;
  durchm_1: number | null;
  durchm_2: number | null;
  durchm_3: number | null;
  durchm_4: number | null;
};
