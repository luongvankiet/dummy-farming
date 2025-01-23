import FormProvider from '@/components/form/form-provider';
import RHFTextField from '@/components/form/rhf-text-field';
import { Iconify, SentIcon } from '@/components/icons';
import RouterLink from '@/components/router-link';
import { useBoolean } from '@/hooks/use-boolean';
import useRoute from '@/hooks/use-route';
import { AuthLayout } from '@/layouts';
import { routes } from '@/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import { Head, router, usePage } from '@inertiajs/react';
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export default function ResetPassword({ token, email }) {
  const page = usePage();

  const errors = page.props.errors;

  const route = useRoute();

  const password = useBoolean();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
    password_confirmation: Yup.string()
      .required('Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const defaultValues = {
    token,
    email,
    password: '',
    password_confirmation: '',
  };

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(data => {
    try {
      router.post(route(routes.auth.resetPassword), data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <AuthLayout>
      <Head title="Reset Password" />

      <Box sx={{ my: 'auto', width: 370 }}>
        <Stack spacing={3} alignItems="center" sx={{ mb: 5 }}>
          <SentIcon sx={{ height: 96 }} />

          <Typography variant="h3">Reset Password</Typography>
        </Stack>

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={2.5}>
            {!!errors.length &&
              errors.map((msg, key) => (
                <Alert severity="error" key={key}>
                  {msg}
                </Alert>
              ))}

            <RHFTextField name="email" label="Email Address" />

            <RHFTextField
              name="password"
              label="Password"
              type={password.value ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={password.onToggle} edge="end">
                      <Iconify
                        icon={
                          password.value
                            ? 'solar:eye-bold'
                            : 'solar:eye-closed-bold'
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <RHFTextField
              name="password_confirmation"
              label="Confirm Password"
              type={password.value ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={password.onToggle} edge="end">
                      <Iconify
                        icon={
                          password.value
                            ? 'solar:eye-bold'
                            : 'solar:eye-closed-bold'
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              color="inherit"
              size="large"
              fullWidth
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ mt: 2 }}
            >
              Reset Password
            </Button>

            <Button
              component={RouterLink}
              color="inherit"
              size="large"
              fullWidth
              variant="soft"
              href={route('login')}
            >
              Back to Login page
            </Button>
          </Stack>
        </FormProvider>
      </Box>
    </AuthLayout>
  );
}

ResetPassword.propTypes = {
  token: PropTypes.string,
  email: PropTypes.string,
};
