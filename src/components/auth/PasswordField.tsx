import React, { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import type { SxProps, Theme } from '@mui/material';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Box,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { strengthIndicator, strengthColor } from '../../utils/passwordStrength';

interface PasswordFieldProps {
  showPasswordStrength?: boolean;
  fieldName: string;
  currentValue: string;
  passwordTouched: boolean | undefined;
  passwordError: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleBlur: (e: React.FocusEvent<any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (e: React.ChangeEvent<any>) => void;
  label: string;
}

const PasswordField: React.VFC<PasswordFieldProps> = ({
  showPasswordStrength,
  fieldName,
  currentValue,
  passwordTouched,
  passwordError,
  handleChange,
  handleBlur,
  label,
}) => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState<{
    label: string;
    color: string;
    leftGrow: number;
    rightGrow: number;
  }>();

  const changePassword = (value: string): void => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  return (
    <>
      <FormControl
        fullWidth
        error={Boolean(passwordTouched && passwordError)}
        sx={theme.typography.customInput as SxProps<Theme>}
      >
        <InputLabel htmlFor="outlined-adornment-password-register">{label}</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-register"
          type={showPassword ? 'text' : 'password'}
          value={currentValue}
          name={fieldName}
          label={label}
          onBlur={handleBlur}
          onChange={(e): void => {
            handleChange(e);
            changePassword(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={(): void => setShowPassword(!showPassword)}
                edge="end"
                size="large"
                component="div"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          inputProps={{}}
        />
        {passwordTouched && passwordError && (
          <FormHelperText error id="standard-weight-helper-text-password-register">
            {passwordError}
          </FormHelperText>
        )}
      </FormControl>
      {showPasswordStrength && level && strength !== 0 && (
        <FormControl fullWidth>
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                columnGap: '15px',
              }}
            >
              <Box
                style={{ backgroundColor: level.color }}
                sx={{ height: 8, borderRadius: '7px', flexGrow: level.leftGrow }}
              />
              <Box sx={{ flexGrow: level.rightGrow }}>
                <Typography variant="subtitle1" fontSize="0.75rem">
                  {level.label}
                </Typography>
              </Box>
            </Box>
          </Box>
        </FormControl>
      )}
    </>
  );
};

export default PasswordField;
