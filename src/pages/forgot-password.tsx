import { Box, Grid } from '@mui/material';
import React from 'react';
import type { NextPage } from 'next';
import { FormLayout } from '../components/FormLayout';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';

const ForgotPassword: NextPage = () => {
  return (
    <FormLayout title="Minerva: Forgot Password">
      <ForgotPasswordForm />
    </FormLayout>
  );
};

export default ForgotPassword;
