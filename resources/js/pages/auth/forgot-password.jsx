import FormProvider from '@/components/form/form-provider';
import RHFTextField from '@/components/form/rhf-text-field';
import { PasswordIcon } from '@/components/icons';
import RouterLink from '@/components/router-link';
import useRoute from '@/hooks/use-route';
import { AuthLayout } from '@/layouts';
import { routes } from '@/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import { Head, router } from '@inertiajs/react';
import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export default function ForgotPassword({ status }) {
  const route = useRoute();

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async data => {
    try {
      await router.post(route(routes.auth.forgotPassword), data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <AuthLayout>
      <Head title="Forgot Password" />

      <Box sx={{ my: 'auto' }}>
        <Stack spacing={3} alignItems="center" sx={{ mb: 3 }}>
          <PasswordIcon sx={{ height: 96 }} />

          <Typography variant="h3">Forgot your password?</Typography>

          <Typography variant="body1">
            Forgot your password? No problem. Just let us know your email
            address and we will email you a password reset link that will allow
            you to choose a new one.
          </Typography>

          {status && <Alert severity="success">{status}</Alert>}
        </Stack>

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={3}>
            <RHFTextField name="email" label="Email address" />

            <Stack direction="row" spacing={2}>
              <Button
                color="inherit"
                size="large"
                fullWidth
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ textWrap: 'nowrap', px: 10 }}
              >
                Email Password Reset Link
              </Button>

              <Button
                component={RouterLink}
                color="inherit"
                size="large"
                fullWidth
                variant="soft"
                href={route('login')}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </Box>
    </AuthLayout>
  );
}

ForgotPassword.propTypes = {
  status: PropTypes.string,
};
