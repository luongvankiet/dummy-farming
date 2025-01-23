import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  alpha,
  InputBase,
  inputBaseClasses,
  Stack,
  Typography,
} from '@mui/material';

export default function InputRange({ max, type, value, onFilters }) {
  const minValue = value[0];
  const maxValue = value[1];

  const handleBlurInputRange = useCallback(() => {
    if (minValue < 0) {
      onFilters('priceRange', [0, maxValue]);
    }
    if (minValue > max) {
      onFilters('priceRange', [max, maxValue]);
    }
    if (maxValue < 0) {
      onFilters('priceRange', [minValue, 0]);
    }
    if (maxValue > max) {
      onFilters('priceRange', [minValue, max]);
    }
  }, [maxValue, minValue, onFilters]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ width: 1 }}
    >
      <Typography
        variant="caption"
        sx={{
          flexShrink: 0,
          color: 'text.disabled',
          textTransform: 'capitalize',
          fontWeight: 'fontWeightSemiBold',
        }}
      >
        {`${type} ($)`}
      </Typography>

      <InputBase
        fullWidth
        value={type === 'min' ? minValue : maxValue}
        onChange={event =>
          type === 'min'
            ? onFilters('priceRange', [Number(event.target.value), maxValue])
            : onFilters('priceRange', [minValue, Number(event.target.value)])
        }
        onBlur={handleBlurInputRange}
        inputProps={{
          step: 10,
          min: 0,
          max: 200,
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
        sx={{
          maxWidth: 48,
          borderRadius: 0.75,
          bgcolor: theme => alpha(theme.palette.grey[500], 0.08),
          [`& .${inputBaseClasses.input}`]: {
            pr: 1,
            py: 0.75,
            textAlign: 'right',
            typography: 'body2',
          },
        }}
      />
    </Stack>
  );
}

InputRange.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  onFilters: PropTypes.func,
  type: PropTypes.oneOf(['min', 'max']),
  value: PropTypes.arrayOf(PropTypes.number),
};
