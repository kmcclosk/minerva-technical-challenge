import React from 'react';
import type { NextPage } from 'next';
import { FormLayout } from '../components/FormLayout';
import { LoginForm } from '../components/LoginForm';

const Login: NextPage = () => {
  return (
    <FormLayout title="Minerva: Login">
      <LoginForm />
    </FormLayout>
  );
};

export default Login;
