export type TLens = {
  id: number;
  cart_id: number | null;
  remark: string | null;
  customer_reference: string | null;
  supply_concept: 'standard' | 'falco_pro' | 'falco_fix';
};
