import { PasswordIcon } from '@/components/icons';
import useRoute from '@/hooks/use-route';
import { AuthLayout } from '@/layouts';
import { routes } from '@/routes';
import { Head, useForm } from '@inertiajs/react';
import {
  Alert,
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';

export default function TwoFactorChallenge() {
  const route = useRoute();
  const [recovery, setRecovery] = useState(false);
  const form = useForm({
    code: '',
    recovery_code: '',
  });
  const recoveryCodeRef = useRef(null);
  const codeRef = useRef(null);

  function toggleRecovery(e) {
    e.preventDefault();
    const isRecovery = !recovery;
    setRecovery(isRecovery);

    setTimeout(() => {
      if (isRecovery) {
        recoveryCodeRef.current?.focus();
        form.setData('code', '');
      } else {
        codeRef.current?.focus();
        form.setData('recovery_code', '');
      }
    }, 100);
  }

  function onSubmit(e) {
    e.preventDefault();
    form.post(route(routes.auth.twoFactorLogin));
  }

  return (
    <AuthLayout>
      <Head title="Two-Factor Confirmation" />

      <Box sx={{ my: 'auto' }}>
        <Stack spacing={3} alignItems="center" sx={{ mb: 3 }}>
          <PasswordIcon sx={{ height: 96 }} />

          <Typography variant="h3">Two Factor Verification</Typography>

          <Typography variant="body1">
            {recovery
              ? 'Please confirm access to your account by entering one of your emergency recovery codes.'
              : 'Please confirm access to your account by entering the authentication code provided by your authenticator application.'}
          </Typography>

          {status && <Alert severity="success">{status}</Alert>}
        </Stack>
      </Box>

      <form onSubmit={onSubmit}>
        {recovery ? (
          <TextField
            fullWidth
            type="text"
            name="recovery_code"
            label="Recovery Code"
            value={form.data.recovery_code}
            ref={recoveryCodeRef}
            onChange={e => form.setData('recovery_code', e.currentTarget.value)}
            autoComplete="one-time-code"
            error={!!form.errors.recovery_code}
            helperText={form.errors.recovery_code}
          />
        ) : (
          <TextField
            fullWidth
            type="text"
            name="code"
            label="Code"
            value={form.data.code}
            onChange={e => form.setData('code', e.currentTarget.value)}
            autoComplete="one-time-code"
            autoFocus
            ref={codeRef}
            error={!!form.errors.code}
            helperText={form.errors.code}
          />
        )}

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 2 }}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Link
            onClick={toggleRecovery}
            variant="body2"
            color="inherit"
            underline="always"
            sx={{ flexWrap: 'nowrap' }}
          >
            {recovery ? 'Use an authentication code' : 'Use a recovery code'}
          </Link>

          <Button
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={form.processing}
            sx={{ px: 5 }}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </AuthLayout>
  );
}
