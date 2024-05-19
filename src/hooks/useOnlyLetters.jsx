const useOnlyLetters = (e) => {
  var ASCIICode = e.which ? e.which : e.keyCode;
  console.log('ASCIICode: ', ASCIICode);

  if (48 <= ASCIICode && ASCIICode <= 57) {
    console.log('ACAAA');
    return e.preventDefault();
  }
  return true;
};
export default useOnlyLetters;
