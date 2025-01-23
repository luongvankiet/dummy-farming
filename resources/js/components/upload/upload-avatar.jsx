import React from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
//
import { Iconify } from '../icons';
import Image from '../image';
//
import RejectionFiles from './errors-rejection-files';
import { useLocales } from '@/locales';

// ----------------------------------------------------------------------

export default function UploadAvatar({
  error,
  file,
  disabled,
  helperText,
  onDelete,
  sx,
  ...other
}) {
  const { t } = useLocales();

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    disabled,
    accept: {
      'image/*': [],
    },
    ...other,
  });

  const hasFile = !!file;

  const hasError = isDragReject || !!error;

  const imgUrl = typeof file === 'string' ? file : file?.url;

  const renderPreview = hasFile && (
    <Image
      alt="avatar"
      src={imgUrl}
      sx={{
        width: 1,
        height: 1,
        borderRadius: '50%',
      }}
    />
  );

  const renderPlaceholder = (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={1}
      className="upload-placeholder"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        zIndex: 9,
        borderRadius: '50%',
        position: 'absolute',
        color: 'text.disabled',
        bgcolor: theme => alpha(theme.palette.grey[500], 0.08),
        transition: theme =>
          theme.transitions.create(['opacity'], {
            duration: theme.transitions.duration.shorter,
          }),
        '&:hover': {
          opacity: 0.72,
        },
        ...(hasError && {
          color: 'error.main',
          bgcolor: theme => alpha(theme.palette.error.main, 0.08),
        }),
        ...(hasFile && {
          zIndex: 9,
          opacity: 0,
          color: 'common.white',
          bgcolor: theme => alpha(theme.palette.grey[900], 0.64),
        }),
      }}
    >
      <Iconify icon="solar:camera-add-bold" width={32} />

      <Typography variant="caption">
        {file ? 'Update photo' : 'Upload photo'}
      </Typography>
    </Stack>
  );

  const renderContent = (
    <Box
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
        borderRadius: '50%',
        position: 'relative',
      }}
    >
      {renderPreview}
      {renderPlaceholder}
    </Box>
  );

  return (
    <>
      <Box
        {...getRootProps()}
        sx={{
          p: 1,
          m: 'auto',
          width: 144,
          height: 144,
          cursor: 'pointer',
          overflow: 'hidden',
          borderRadius: '50%',
          border: theme => `1px dashed ${alpha(theme.palette.grey[500], 0.2)}`,
          ...(isDragActive && {
            opacity: 0.72,
          }),
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: 'none',
          }),
          ...(hasError && {
            borderColor: 'error.main',
          }),
          ...(hasFile && {
            ...(hasError && {
              bgcolor: theme => alpha(theme.palette.error.main, 0.08),
            }),
            '&:hover .upload-placeholder': {
              opacity: 1,
            },
          }),
          ...sx,
        }}
      >
        <input {...getInputProps()} />

        {renderContent}
      </Box>

      {onDelete && hasFile && (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            mt: 1,
            mx: 'auto',
            cursor: 'pointer',
          }}
          spacing={0.4}
          onClick={onDelete}
        >
          <Iconify
            icon="solar:trash-bin-minimalistic-bold"
            sx={{ color: 'error.main', mb: 0.2 }}
            width={16}
          />
          <Typography
            variant="caption"
            sx={{
              color: 'error.main',
              fontWeight: 'bold',
            }}
          >
            {t('Remove Picture')}
          </Typography>
        </Stack>
      )}

      {onDelete && !hasFile && helperText && helperText}

      <RejectionFiles fileRejections={fileRejections} />
    </>
  );
}

UploadAvatar.propTypes = {
  disabled: PropTypes.object,
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  helperText: PropTypes.object,
  sx: PropTypes.object,
  onDelete: PropTypes.func,
};
