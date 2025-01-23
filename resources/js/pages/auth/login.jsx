import FormProvider from '@/components/form/form-provider';
import RHFTextField from '@/components/form/rhf-text-field';
import { routes } from '@/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import { Head, router, usePage } from '@inertiajs/react';
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import useRoute from '@/hooks/use-route';
import { useBoolean } from '@/hooks/use-boolean';
import RouterLink from '@/components/router-link';
import { Iconify } from '@/components/icons';
import { AuthLayout } from '@/layouts';

export default function Login({ canResetPassword, status }) {
  const route = useRoute();

  const password = useBoolean();

  const page = usePage();

  const errors = page.props.errors;

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: false,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async data => {
    try {
      await router.post(route(routes.auth.login), {
        ...data,
      });
    } catch (error) {
      console.log(error);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }} alignItems="center">
      <Typography variant="h3">Sign In</Typography>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <Typography variant="body1">Not a member?</Typography>

        <Link
          component={RouterLink}
          href={route(routes.auth.register)}
          variant="subtitle1"
        >
          Create an account
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errors.length &&
        errors.map((msg, key) => (
          <Alert severity="error" key={key}>
            {msg}
          </Alert>
        ))}

      <RHFTextField name="email" label="Email address" />

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
                    password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'
                  }
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {canResetPassword && (
        <Link
          component={RouterLink}
          href={route(routes.auth.forgotPassword)}
          variant="body2"
          color="inherit"
          underline="always"
          sx={{ alignSelf: 'flex-end' }}
        >
          Forgot password?
        </Link>
      )}

      <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </Button>
    </Stack>
  );

  return (
    <AuthLayout>
      <Head title="Login" />

      <Box sx={{ my: 'auto', width: 350 }}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          {renderHead}

          {!!status && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {status}
            </Alert>
          )}

          <Alert severity="info" sx={{ mb: 3 }}>
            Use email : <strong>admin@example.com</strong> / password :
            <strong> password</strong>
          </Alert>

          {renderForm}
        </FormProvider>
      </Box>
    </AuthLayout>
  );
}

Login.propTypes = {
  canResetPassword: PropTypes.bool,
  status: PropTypes.string,
};
