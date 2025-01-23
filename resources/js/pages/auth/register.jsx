import FormProvider from '@/components/form/form-provider';
import RHFTextField from '@/components/form/rhf-text-field';
import { routes } from '@/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  IconButton,
  InputAdornment,
  List,
  ListItemText,
  Stack,
  Typography,
  Link,
  Button,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Head, router } from '@inertiajs/react';
import useTypedPage from '@/hooks/use-typed-page';
import useRoute from '@/hooks/use-route';
import { useBoolean } from '@/hooks/use-boolean';
import RouterLink from '@/components/router-link';
import { Iconify } from '@/components/icons';
import { AuthLayout } from '@/layouts';

export default function Register() {
  const page = useTypedPage();
  const route = useRoute();

  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
    password_confirmation: Yup.string()
      .required('Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const defaultValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async data => {
    try {
      await router.post(route(routes.auth.register), {
        ...data,
        onFinish: () => reset('password', 'password_confirmation'),
      });
    } catch (error) {
      console.error(error);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }} alignItems="center">
      <Typography variant="h3">Create New Account</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body1">Already have an account?</Typography>

        <Link
          component={RouterLink}
          href={route(routes.auth.login)}
          variant="subtitle1"
        >
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        color: 'text.secondary',
        mt: 2.5,
        typography: 'caption',
        textAlign: 'center',
      }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!page.errors && (
          <Alert severity="error">
            <List component="div" disablePadding>
              {Object.values(page.errors).map((msg, key) => (
                <ListItemText key={key} primary={msg} />
              ))}
            </List>
          </Alert>
        )}

        <RHFTextField name="name" label="Name" />

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
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Create account
        </Button>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      <AuthLayout>
        <Head title="Register" />

        {renderHead}

        {renderForm}

        {page.props.jetstream.hasTermsAndPrivacyPolicyFeature && renderTerms}
      </AuthLayout>
    </>
  );
}
