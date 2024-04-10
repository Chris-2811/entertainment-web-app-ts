import React, { useContext } from 'react';
import AuthModal from '@/components/shared/auth/AuthModal';
import movieIcon from '@/assets/logo.svg';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { auth } from 'firebase/auth';
import AuthContext from '@/context/AuthContext';
import OAuth from '@/components/shared/auth/OAuth';

function SignUp() {
  interface FormData {
    email: string;
    password: string;
    password2: string;
  }

  interface Errors {
    email: string;
    password: string;
    password2: string;
  }

  interface NewErrors {
    email?: string;
    password?: string;
    password2?: string;
  }

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState<Errors>({
    email: '',
    password: '',
    password2: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const { signUp } = useContext(AuthContext);
  const { email, password } = formData;

  function validateForm() {
    let isValid: boolean = true;
    const newErrors: NewErrors = {};

    if (!formData.email) {
      isValid = false;
      newErrors.email = "can't be empty";
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)
    ) {
      isValid = false;
      newErrors.email = 'Invalid email format';
    } else {
      newErrors.email = '';
    }

    if (!formData.password) {
      isValid = false;
      newErrors.password = "can't be empty";
    } else {
      newErrors.password = '';
    }

    if (!formData.password2) {
      isValid = false;
      newErrors.password2 = "can't be empty";
    } else {
      newErrors.password2 = '';
    }

    setErrors(newErrors);
    return isValid;
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.id]: '',
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (validateForm()) {
      setFormData({ email: '', password: '', password2: '' });
      setSubmitted(true);
      const userCredential = await signUp(email, password);
      const user = userCredential.user;

      console.log(user);
    } else {
      console.log('form is not valid');
      return;
    }
  }

  return (
    <div className="container mt-12 md:mt-20 lg:mt-[4.875rem]">
      <Link to="/">
        <img src={movieIcon} alt="" className="mx-auto" />
      </Link>

      <AuthModal>
        <h1 className="text-[2rem] tracking-[-0.5px]">Sign Up</h1>
        <form onSubmit={handleSubmit} className="mt-10">
          <div className="input-control flex items-center pb-4 md:pb-[1.125rem] border-b border-b-greyish-blue">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              className="bg-transparent w-full  placeholder:text-white/50 outline-none caret-red caret-2 pl-4"
              onChange={handleInputChange}
              value={formData.email}
            />
            {errors.email && (
              <div className="flex-shrink-0">
                <small className="text-red pr-4">{errors.email}</small>
              </div>
            )}
          </div>
          <div className="input-control flex items-center pb-4 md:pb-[1.125rem] pt-6 border-b border-b-greyish-blue ">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="bg-transparent w-full
               placeholder:text-white/50 outline-none caret-red pl-4"
              onChange={handleInputChange}
              value={formData.password}
            />
            {errors.password && (
              <div className="flex-shrink-0">
                <small className="text-red pr-4">{errors.password}</small>
              </div>
            )}
          </div>
          <div className="input-control flex items-center pb-4 md:pb-[1.125rem] pt-6 border-b border-b-greyish-blue ">
            <input
              type="password"
              name="password2"
              id="password2"
              placeholder="Repeat password"
              className="bg-transparent w-full
               placeholder:text-white/50 outline-none caret-red pl-4"
              onChange={handleInputChange}
              value={formData.password2}
            />
            {errors.password2 && (
              <div className="flex-shrink-0">
                <small className="text-red pr-4">{errors.password2}</small>
              </div>
            )}
          </div>
          <div
            className="mt-10 md:mt-6
          "
          >
            <Button>Create an account</Button>
          </div>
          <div className="mt-5 md:mt-6">
            <OAuth />
          </div>
          <p className="text-[0.9375rem] text-center mt-6">
            Already have an account?
            <span className="text-red ml-2 ">
              <Link to="/log-in">Login</Link>
            </span>
          </p>
        </form>
      </AuthModal>
    </div>
  );
}

export default SignUp;
