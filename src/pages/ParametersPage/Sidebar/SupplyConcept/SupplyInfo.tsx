import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';

const SupplyInfo: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className='flex flex-col shadow bg-white rounded-md w-[400px] h-[700px]'>
      <div className='flex felx-row text-xl w-full justify-between p-6 text-[#3d484e] '>
        <div>Versorgungskonzept</div>
        <div>
          <IconButton sx={{ borderRadius: 1.5 }} onClick={onClick}>
            <ClearIcon style={{ color: '#3d484e' }} />
          </IconButton>
        </div>
      </div>
      <div className='flex flex-col px-[36px] pt-2'>
        <p className='text-2xl'>STANDARD</p>
        <p className='text-sm mt-4'>
          Beim Versorgungskonzept «standard» wird Ihnen die Kontaktlinse zum
          Listenpreis «standard» verrechnet. Es besteht keine
          Gutschriftsmöglichkeit.
        </p>
        <p className='text-2xl mt-8'>FALCO PRO</p>
        <p className='text-sm mt-4'>
          Beim Versorgungskonzept «falco pro» wird Ihnen die Kontaktlinse zum
          Listenpreis «falco pro - mit Tausch» verrechnet. Sie können diese
          Kontaktlinse innerhalb drei Monaten ab Lieferdatum tauschen. Die
          Vorgängerlinse wird Ihnen bis auf den Selbstbehalt gutgeschrieben.
        </p>
        <p className='text-2xl mt-8'>FALCO FIX</p>
        <p className='text-sm mt-4'>
          Beim Versorgungskonzept «falco fix» gewähren wir Ihnen bei
          Folgebestellungen innerhalb 13 Monaten ab Lieferdatum über den
          Onlineshop 15% Preisnachlass (Onlinerabatt 8% plus falco fix - Rabatt
          7%). Dies gilt auch bei Änderungen der Linsenparameter (ausgeschlossen
          sind Änderungen des Linsentypes oder Linsenzusatzes).
        </p>
      </div>
    </div>
  );
};

export default SupplyInfo;
