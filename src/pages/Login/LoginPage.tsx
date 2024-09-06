import loginImg from 'assets/LoginPicture.png';
import LoginForm from './LoginForm';

const LoginPage = () => {
  return (
    <div className='container mx-auto flex justify-center items-center h-screen'>
      <div className='flex flex-col justify-center'>
        <div className='flex flex-row gap-12 justify-center overflow-hidden h-screen relative'>
          <div className='relative 2xl:w-[990px] w-[660px] h-[calc(100vh - 80px)] mt-20 mb-20 mx-auto rounded-5xl overflow-hidden'>
            <img
              src={loginImg}
              alt='Login'
              className='absolute inset-0 w-full h-full object-cover object-left transform scale-110'
            />
            <div className='absolute inset-0 bg-[#00486A] opacity-40'></div>
          </div>
          <div className='absolute -top-20 left-0 flex flex-col items-start gap-2 justify-end w-[600px] h-full px-10 pb-8'>
            <p className='text-white text-3xl w-[210px]'>
              Falco Linsen - Ihre Partnerschaft für individuelle Sehlösungen!
            </p>
            <p className='text-white w-[190px] text-2xs'>
              Wir verstehen uns als Team mit unseren Kunden und setzen modernste
              Produktionsverfahren ein, um hochwertige und maßgeschneiderte
              Lösungen zu schaffen. Unsere Kontaktlinsen erfüllen höchste
              Ansprüche und werden ausschließlich in der Schweiz hergestellt.
              Egal ob Standard- oder komplexe Speziallinsen – bei uns steht Ihre
              Zufriedenheit im Mittelpunkt.
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
