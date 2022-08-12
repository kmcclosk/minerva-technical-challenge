import React from 'react';
import type { NextPage } from 'next';
import { FormLayout } from '../components/FormLayout';
import { SignupForm } from '../components/SignupForm';

const Signup: NextPage = () => {
  return (
    <FormLayout title="Minerva: Signup">
      <SignupForm />
    </FormLayout>
  );
};

export default Signup;
