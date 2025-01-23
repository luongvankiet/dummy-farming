import FormProvider from '@/components/form/form-provider';
import RHFTextField from '@/components/form/rhf-text-field';
import { Iconify, PasswordIcon } from '@/components/icons';
import { useBoolean } from '@/hooks/use-boolean';
import useRoute from '@/hooks/use-route';
import useTypedPage from '@/hooks/use-typed-page';
import { AuthLayout } from '@/layouts';
import { routes } from '@/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import { Head, router } from '@inertiajs/react';
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export default function ConfirmPassword() {
  const page = useTypedPage();

  const errors = page.props.errors;

  const route = useRoute();

  const password = useBoolean();

  const ConfirmPasswordSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
  });

  const methods = useForm({
    resolver: yupResolver(ConfirmPasswordSchema),
    defaultValues: { password: '' },
  });

  const onSubmit = methods.handleSubmit(data => {
    router.post(route(routes.auth.confirmPassword), data);
  });

  return (
    <AuthLayout>
      <Head title="Secure Area" />

      <Box sx={{ my: 'auto' }}>
        <Stack spacing={3} alignItems="center" sx={{ mb: 3 }}>
          <PasswordIcon sx={{ height: 96 }} />

          <Typography variant="h3">Confirm password</Typography>

          <Typography variant="body1">
            This is a secure area of the application. Please confirm your
            password before continuing.
          </Typography>
        </Stack>

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={3}>
            {!!errors.length &&
              errors.map((msg, key) => (
                <Alert severity="error" key={key}>
                  {msg}
                </Alert>
              ))}

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

            <Button
              fullWidth
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
            >
              Confirm
            </Button>
          </Stack>
        </FormProvider>
      </Box>
    </AuthLayout>
  );
}

ConfirmPassword.propTypes = {};
