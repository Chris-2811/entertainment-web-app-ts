import { ReactNode } from 'react';

interface AuthModalProps {
  children: ReactNode;
}

function AuthModal({ children }: AuthModalProps) {
  return (
    <div className="mx-auto mt-9 md:mt-[4.5rem] lg:mt-[5.125rem] max-w-[400px] bg-semi-dark-blue rounded-[10px] lg:min-w-[440px] pt-6 px-6 pb-8 md:p-8 md:rounded-[20px]">
      {children}
    </div>
  );
}

export default AuthModal;
