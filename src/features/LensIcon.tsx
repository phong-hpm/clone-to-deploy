import { FC } from 'react';

import { TCategoryName } from 'types/category';

import { ReactComponent as MiniTIcon } from 'assets/SVG/MINIT.svg';
import { ReactComponent as MiniIcon } from 'assets/SVG/Mini.svg';
import { ReactComponent as SKVIcon } from 'assets/SVG/SKV.svg';
import { ReactComponent as SMTIcon } from 'assets/SVG/SMT.svg';

interface LensIconProps {
  categoryName?: TCategoryName;
  width?: number;
  height?: number;
}

const LensIcon: FC<LensIconProps> = ({ categoryName, ...props }) => {
  if (categoryName === 'SKV') return <SKVIcon {...props} />;
  if (categoryName === 'SMT') return <SMTIcon {...props} />;
  if (categoryName === 'miniT') return <MiniTIcon {...props} />;
  if (categoryName === 'miniV') return <MiniIcon {...props} />;

  return null;
};

export default LensIcon;
