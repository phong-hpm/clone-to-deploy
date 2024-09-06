import { useNavigate } from 'react-router-dom';


import LoginButton from './LoginButton';
import { useEffect } from 'react';
import falcoImg from 'assets/FalcoImg.png';
import { useAuth } from 'react-oidc-context';


const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return (
    <div className='flex flex-col justify-center gap-y-20 2xl:gap-y-48'>
      <div className='flex flex-row justify-center'>
        <img src={falcoImg} alt='FalcoLogo' className='h-10' />
      </div>
      <div>
        <div className='flex flex-col justify-center'>
          <div className='text-center pb-12 flex flex-col gap-6'>
            <h1 className='text-4xl'>Willkommen zurück</h1>
            <p className='max-w-[70%] mx-auto text-sm'>
              Geben Sie Ihre E-Mail-Adresse und Ihr Passwort ein, um auf Ihr
              Konto zuzugreifen
            </p>
          </div>
          <div className='flex justify-center items-center'>
            <div className='space-y-6'>
              <LoginButton onClick={() => auth.signinRedirect()}>Login</LoginButton>
            </div>
          </div>
        </div>
      </div>
      <div className='text-sm flex flex-col items-center space-y-1'>
        <div className='flex flex-row justify-center space-x-1'>
          <span>Haben Sie noch kein Konto?</span>
          <a className='text-[#07779E]' href='/forgotpassword'>
            Registrieren Sie sich
          </a>
        </div>
        <p>info@falco-linsen.com</p>
      </div>
    </div>
  );
};

export default Login;
