const useOnlyLetters = (e) => {
  var ASCIICode = e.which ? e.which : e.keyCode;

  if (48 <= ASCIICode && ASCIICode <= 57) {
    return e.preventDefault();
  }
  return true;
};
export default useOnlyLetters;
