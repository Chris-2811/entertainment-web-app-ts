import { useState } from 'react';
import AuthModal from '@/components/shared/auth/AuthModal';
import { Button } from '@/components/ui/Button';
import { auth } from '@/lib/firebase/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      sendPasswordResetEmail(auth, email);
      setEmail('');
      navigate('/log-in');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container px-6 lg:px-0">
      <AuthModal>
        <form onSubmit={handleSubmit}>
          <h1 className="heading-lg">Forgot you Password?</h1>
          <p className="mt-6 leading-snug">
            Enter the email address associated with your acccount and we'll send
            you a link to reset your password
          </p>
          <input
            type="email"
            className="my-6 py-2 px-4 w-full rounded-sm bg-greyish-blue outline-none"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <p className="text-xs leading-snug">
            If your email address exists in our database, and you haven't
            requested a password reset in the last 30minutes, you will receive a
            password recovery link at your email address in a a few minutes.
          </p>
          <div className="mt-8">
            <Button>Send code</Button>
          </div>
        </form>
      </AuthModal>
    </div>
  );
}

export default ForgotPassword;
