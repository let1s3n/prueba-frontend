import {
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { PokemonSelected, Pokemon } from '@/types/generalProps';
import { Form } from 'react-bootstrap';
import useOnlyLetters from '@/hooks/useOnlyLetters';
import styles from './SearchBar.module.scss';
const SearchBar = ({
  allPokemon,
  setSearchTerm,
  pokemonSelected,
}: {
  allPokemon: Pokemon[];
  setSearchTerm: Dispatch<SetStateAction<string>>;
  pokemonSelected: PokemonSelected | undefined;
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchInputValue, setSearchInputValue] = useState('');

  useEffect(() => {
    setSearchTerm(searchInputValue.toLowerCase());
    if (searchInputValue !== '') {
      let res = allPokemon.filter((item: Pokemon) =>
        item.name.startsWith(searchInputValue)
      );
      setSuggestions(res.map((item) => item.name));
    } else {
      setSuggestions([]);
    }
  }, [searchInputValue]);

  useEffect(() => {
    if (pokemonSelected) {
      setSuggestions([]);
    }
  }, [pokemonSelected]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value.toLowerCase());
  };

  const handleSelectSuggestion = (s: string) => {
    setSearchInputValue(s.toLowerCase());
    setSuggestions([]);
  };

  return (
    <div className={styles.searchBarContainer}>
      <Form.Label htmlFor="inputSearch" className="fw-bold">
        Busca un pokemon:
      </Form.Label>
      <Form.Control
        type="text"
        id="inputSearch"
        onChange={handleSearch}
        value={searchInputValue}
        placeholder="Ingresa el nombre del pokemon"
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => useOnlyLetters(e)}
      />

      {suggestions.length > 0 ? (
        <div className={styles.suggestionBox}>
          <div
            className={styles.botonCerrar}
            onClick={() => {
              setSuggestions([]);
            }}
          >
            x
          </div>
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
