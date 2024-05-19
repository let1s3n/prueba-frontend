import { KeyboardEvent } from 'react';
const useOnlyLetters = (e: KeyboardEvent<HTMLInputElement>) => {
  const value: string = e.key;

  if (isNaN(Number(value))) {
    return true;
  }
  return e.preventDefault();
};
export default useOnlyLetters;
