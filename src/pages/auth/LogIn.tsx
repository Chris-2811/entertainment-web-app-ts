/// <reference types="vite-plugin-svgr/client" />
import { useState } from 'react';
import * as React from 'react';
import AuthModal from '@/components/shared/auth/AuthModal';
import movieIcon from '@/assets/logo.svg';
import { Button } from '@/components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '@/components/shared/auth/OAuth';
import Spinner from '@/assets/spinner.svg?react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email: string;
  password: string;
}

interface NewErrors {
  email?: string;
  password?: string;
}

function LogIn() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Errors>({
    email: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { logIn } = useAuth();

  const { email, password } = formData;
  const navigate = useNavigate();

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

    setErrors(newErrors as Errors);
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
      setSubmitted(false);
      setFormData({ email: '', password: '' });
      await logIn(email, password);
      setSubmitted(true);
      navigate('/');
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
        <h1 className="text-[2rem] tracking-[-0.5px]">Login</h1>
        <form onSubmit={handleSubmit} className="mt-10">
          <div className="input-control flex items-center pb-4 md:pb-[1.125rem] border-b border-b-greyish-blue">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              className="bg-transparent w-full  placeholder:text-white/50 outline-none caret-red pl-4"
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
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="Password"
              className="bg-transparent w-full
               placeholder:text-white/50 outline-none caret-red pl-4"
              onChange={handleInputChange}
              value={formData.password}
            />
            {!errors.password &&
              (showPassword ? (
                <FaEyeSlash
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer text-white mr-4"
                />
              ) : (
                <FaEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer text-white mr-4"
                />
              ))}
            {errors.password && (
              <div className="flex-shrink-0">
                <small className="text-red pr-4">{errors.password}</small>
              </div>
            )}
          </div>
          <div
            className="mt-10
          "
          >
            <Button>
              {!submitted ? (
                <>
                  <Spinner className="animate-spin h-5 w-5 mr-3" />
                  Processing...
                </>
              ) : (
                'Login to your account'
              )}
            </Button>
          </div>
          <div className="mt-5 md:mt-6">
            <OAuth />
          </div>
          <p className="text-[0.9375rem] text-center mt-5 md:mt-6">
            Don't have an account?
            <span className="text-red ml-2 ">
              <Link to="/sign-up">Sign Up</Link>
            </span>
          </p>
        </form>
      </AuthModal>
    </div>
  );
}

export default LogIn;
