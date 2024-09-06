import { useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from 'assets/SVG/Search.svg';

type SearchBarProps = {
  onSearch: (value: string) => void;
  searchParams: URLSearchParams | string;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchParams }) => {
  const params = new URLSearchParams(searchParams);
  const searchValue = params.get('search') || ''; // Get the value of the 'search' parameter
  const isValidUriComponent = (str: string) => {
    try {
      decodeURIComponent(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  let decodedSearchValue = isValidUriComponent(searchValue)
    ? decodeURIComponent(searchValue)
    : '';

  const [inputValue, setInputValue] = useState(decodedSearchValue);

  useEffect(() => {
    if (isValidUriComponent(searchValue)) {
      setInputValue(decodeURIComponent(searchValue));
    }
  }, [searchValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.includes('%')) {
      return;
    }
    setInputValue(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let content = inputValue.replace(/%/g, '%25');
    content = encodeURI(content);
    onSearch(content);
  };

  return (
    <form action='/search' className='w-full px-4' onSubmit={handleSubmit}>
      <div className='relative w-[620px] h-[56px] mx-auto'>
        <input
          type='text'
          name='q'
          maxLength={40}
          className='appearance-none w-full h-[56px] p-4 font-thin text-base rounded-lg bg-[#E4E9EB] pr-10 custom-placeholder'
          placeholder='Hinted search text'
          onChange={handleInputChange}
          value={inputValue}
        />
        <button
          type='submit'
          className='absolute right-4 top-1/2 transform -translate-y-1/2'
        >
          <SearchIcon className='h-8' />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
