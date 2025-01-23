import { EmailInboxIcon } from '@/components/icons';
import RouterLink from '@/components/router-link';
import useRoute from '@/hooks/use-route';
import { AuthLayout } from '@/layouts';
import { routes } from '@/routes';
import { Head, useForm } from '@inertiajs/react';
import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function VerifyEmail({ status }) {
  const route = useRoute();
  const form = useForm({});
  const verificationLinkSent = status === 'verification-link-sent';

  function onSubmit(e) {
    e.preventDefault();
    form.post(route(routes.auth.sendVerification));
  }

  return (
    <AuthLayout>
      <Head title="Email Verification" />

      <Box sx={{ my: 'auto' }}>
        <Stack spacing={2} alignItems="center" sx={{ mb: 5 }}>
          <EmailInboxIcon sx={{ height: 96 }} />

          <Typography variant="h3">Verify Email</Typography>

          <Typography variant="body1">
            Before continuing, could you verify your email address by clicking
            on the link we just emailed to you? If you didn&apos;t receive the
            email, we will gladly send you another.
          </Typography>

          {!!verificationLinkSent && (
            <Alert severity="success">
              A new verification link has been sent to your email address.
            </Alert>
          )}
        </Stack>

        <form onSubmit={onSubmit}>
          <Stack direction="row" spacing={2}>
            <Button
              color="inherit"
              size="large"
              fullWidth
              type="submit"
              variant="contained"
              loading={form.processing}
              sx={{ textWrap: 'nowrap', px: 10 }}
            >
              Resend Verification Email
            </Button>

            <Button
              component={RouterLink}
              color="inherit"
              size="large"
              fullWidth
              type="submit"
              variant="soft"
              href={route('logout')}
              method="post"
            >
              Logout
            </Button>
          </Stack>
        </form>
      </Box>
    </AuthLayout>
  );
}

VerifyEmail.propTypes = {
  status: PropTypes.string,
};
