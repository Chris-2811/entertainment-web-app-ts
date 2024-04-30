import { ReactNode } from 'react';

interface AuthModalProps {
  children: ReactNode;
}

function AuthModal({ children }: AuthModalProps) {
  return (
    <div className="mx-auto mt-8 md:mt-[2.5rem] xl:mt-[3.5rem] max-w-[400px] bg-semi-dark-blue rounded-[10px] lg:min-w-[440px] pt-5 px-6 pb-7 md:p-8 md:rounded-[20px]">
      {children}
    </div>
  );
}

export default AuthModal;
