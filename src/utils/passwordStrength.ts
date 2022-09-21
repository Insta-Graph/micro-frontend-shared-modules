/* eslint-disable prefer-regex-literals */
import { variables as colors } from '../themes';
// has number
const hasNumber = (number: string): boolean => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
const hasMixed = (number: string): boolean =>
  new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial = (number: string): boolean => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

// set color based on password strength
export const strengthColor = (
  count: number
): {
  label: string;
  color: string;
  leftGrow: number;
  rightGrow: number;
} => {
  if (count < 2) return { label: 'Poor', color: colors.errorMain, leftGrow: 1, rightGrow: 2 };
  if (count < 3) return { label: 'Weak', color: colors.orangeMain, leftGrow: 1, rightGrow: 2 };
  if (count < 4) return { label: 'Normal', color: colors.warningDark, leftGrow: 2, rightGrow: 2 };
  if (count < 5) return { label: 'Good', color: colors.successMain, leftGrow: 5, rightGrow: 2 };
  if (count < 6) return { label: 'Strong', color: colors.successDark, leftGrow: 2, rightGrow: 0 };
  return { label: 'Poor', color: colors.errorMain, leftGrow: 1, rightGrow: 2 };
};

// password strength indicator
export const strengthIndicator = (number: string): number => {
  let strengths = 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasMixed(number)) strengths += 1;
  return strengths;
};
