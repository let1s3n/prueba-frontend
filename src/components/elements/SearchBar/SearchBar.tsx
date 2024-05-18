import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Pokemon } from '@/types/generalProps';
import { Form } from 'react-bootstrap';
import styles from './SearchBar.module.scss';
const SearchBar = ({
  newDataSet,
  setSearchTerm,
}: {
  newDataSet: Pokemon[];
  setSearchTerm: Dispatch<SetStateAction<string>>;
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchInputValue, setSearchInputValue] = useState('');

  useEffect(() => {
    setSearchTerm(searchInputValue.toLowerCase());

    if (searchInputValue !== '' && newDataSet.length > 0) {
      console.log('searchInputValue: ', searchInputValue);
      console.log('newDataSet:', newDataSet);
      let res = newDataSet.filter((item: Pokemon) =>
        item.name.startsWith(searchInputValue)
      );

      setSuggestions(res.map((item) => item.name));
    } else {
      console.log('searchInputValue2: ', searchInputValue);
      console.log('newDataSet2:', newDataSet);
      setSuggestions([]);
    }
  }, [searchInputValue]);

  useEffect(() => {
    console.log('suggestions: ', suggestions);
  }, [suggestions]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value.toLowerCase());
  };

  const handleSelectSuggestion = (s: string) => {
    setSearchInputValue(s.toLowerCase());
    setSuggestions([]);
  };
  return (
    <div className="position-relative">
      <Form.Label htmlFor="inputSearch" className="fw-bold">
        Busca un pokemon:
      </Form.Label>
      <Form.Control
        type="text"
        id="inputSearch"
        onChange={handleSearch}
        value={searchInputValue}
      />

      {suggestions.length > 0 ? (
        <div className={styles.suggestionBox}>
          <p className="fw-bold">Sugerencias: </p>
          {suggestions.map((suggestion, idx) => (
            <p
              key={idx}
              className={styles.suggestion}
              onClick={() => {
                handleSelectSuggestion(suggestion);
              }}
            >
              {suggestion}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
