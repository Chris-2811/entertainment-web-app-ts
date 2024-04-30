/// <reference types="vite-plugin-svgr/client" />
import { useState } from 'react';
import * as React from 'react';
import AuthModal from '@/components/shared/auth/AuthModal';
import movieIcon from '@/assets/logo.svg';
import { Button } from '@/components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '@/components/shared/auth/OAuth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuth from '@/hooks/useAuth';

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email: string;
  password: string;
  message?: string;
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
    message: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

    setErrors({
      ...errors,
      message: '',
    });

    if (validateForm()) {
      try {
        setIsLoading(true);
        setFormData({ email: '', password: '' });
        await logIn(email, password);
        navigate('/');
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const err = error as Error;
        setErrors({
          ...errors,
          message: err.message,
        });
      }
    }

    console.log('form is not valid');
  }

  return (
    <div className="container mt-6 mt-custom-auth xl:mt-[4.875rem] ">
      <Link to="/" className="">
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
          <div className="relative input-control flex items-center pb-4 md:pb-[1.125rem] pt-6 border-b border-b-greyish-blue ">
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
            {errors.message ===
              'Firebase: Error (auth/invalid-credential).' && (
              <div className="absolute -bottom-7 left-4">
                <small className="text-red pr-4">Email or Password wrong</small>
              </div>
            )}
          </div>
          <div
            className="mt-10
          "
          >
            <Button>
              {isLoading ? <>Processing...</> : 'Login to your account'}
            </Button>
          </div>
          <div className="mt-5 md:mt-6">
            <OAuth />
          </div>
          <div className=" text-center text-base mt-2">
            <Link to="/forgot-password" className="text-sm text-white">
              Forgot Password?
            </Link>
          </div>
          <p className="text-[0.9375rem] text-center mt-0.5">
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
