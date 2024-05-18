import React from 'react';
import { Form } from 'react-bootstrap';
const SearchBar = ({ setSearchTerm }) => {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <Form.Label htmlFor="inputSearch">Busca un pokemon:</Form.Label>
      <Form.Control type="text" id="inputSearch" onChange={handleSearch} />
    </>
  );
};

export default SearchBar;
