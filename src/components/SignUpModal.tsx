'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signUpSchema } from '@/validation/schemas';
import { authAPI } from '@/services/api';
import toast from 'react-hot-toast';
import { SignUpModalProps, SignUpFormValues } from '@/types';

const initialValues: SignUpFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: SignUpFormValues, { setSubmitting }: any) => {
    try {
      setIsLoading(true);
      setError(null);
      const user = await authAPI.signup({
        name:values.firstName+" "+values.lastName,
        email: values.email,
        password: values.password
      });
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to sign up. Please try again.');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Sign Up</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">
            {error}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={signUpSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className='text-left'>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`w-full px-4 py-2 border ${
                      touched.firstName && errors.firstName ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white/50 backdrop-blur-sm`}
                    placeholder="Enter your first name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="p"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                <div className='text-left'>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`w-full px-4 py-2 border ${
                      touched.lastName && errors.lastName ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white/50 backdrop-blur-sm`}
                    placeholder="Enter your last name"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="p"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
              </div>

              <div className='text-left'>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full px-4 py-2 border ${
                    touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white/50 backdrop-blur-sm`}
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className='text-left'>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className={`w-full px-4 py-2 border ${
                    touched.password && errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white/50 backdrop-blur-sm`}
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className='text-left'>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`w-full px-4 py-2 border ${
                    touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white/50 backdrop-blur-sm`}
                  placeholder="Confirm your password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onClose}
              className="text-violet-600 hover:text-violet-700 transition-colors"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
} 