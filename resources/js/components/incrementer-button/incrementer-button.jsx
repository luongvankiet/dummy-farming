import React from 'react';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
// components
import { Iconify } from '@/components/icons';
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

const IncrementerButton = forwardRef(function IncrementerButton(
  {
    quantity,
    onIncrease,
    onDecrease,
    onChange,
    disabledIncrease,
    disabledDecrease,
    sx,
    ...other
  },
  ref,
) {
  return (
    <Stack
      ref={ref}
      flexShrink={0}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        p: 0.5,
        width: 120,
        borderRadius: 1,
        typography: 'subtitle2',
        border: theme => `solid 1px ${alpha(theme.palette.grey[500], 0.2)}`,
        ...sx,
      }}
      {...other}
    >
      <IconButton
        size="small"
        onClick={onDecrease}
        disabled={disabledDecrease}
        sx={{ borderRadius: 0.75 }}
      >
        <Iconify icon="eva:minus-fill" width={16} />
      </IconButton>

      <TextField
        value={quantity}
        onChange={onChange}
        variant="standard"
        inputProps={{ style: { textAlign: 'center' } }}
        InputProps={{
          disableUnderline: true,
        }}
        sx={{ mx: 1 }}
      />

      <IconButton
        size="small"
        onClick={onIncrease}
        disabled={disabledIncrease}
        sx={{ borderRadius: 0.75 }}
      >
        <Iconify icon="mingcute:add-line" width={16} />
      </IconButton>
    </Stack>
  );
});

IncrementerButton.propTypes = {
  disabledDecrease: PropTypes.bool,
  disabledIncrease: PropTypes.bool,
  onDecrease: PropTypes.func,
  onIncrease: PropTypes.func,
  onChange: PropTypes.func,
  quantity: PropTypes.number,
  sx: PropTypes.object,
};

export default IncrementerButton;
