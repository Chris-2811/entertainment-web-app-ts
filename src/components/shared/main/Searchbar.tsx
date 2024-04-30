import searchIcon from '@/assets/icon-search.svg';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearch } from '@/hooks/useSearch';

function Searchbar() {
  const [text, setText] = useState<string>('');
  const { searchAPIData, setQueryTerm } = useSearch();
  const location = useLocation();
  const pathname = location.pathname;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (pathname !== '/bookmarked') {
      await searchAPIData({ text });
    } else {
      setQueryTerm(text);
    }
  }

  return (
    <div className="container mt-[1.625rem] md:mt-[2.125rem] lg:mt-8">
      <form onSubmit={handleSubmit}>
        <div className="form-control flex items-start gap-5 ">
          <img src={searchIcon} alt="search-icon" className="w-6 md:w-8" />
          <input
            type="text"
            className="placeholder:text-white/50 w-[440px]  text-white bg-transparent outline-none xl:text-2xl caret-red border-b pb-4 border-transparent focus:border-b-greyish-blue "
            placeholder={
              pathname === '/'
                ? 'Search for Movies or TV series'
                : pathname === '/movies'
                ? 'Search for Movies'
                : pathname === '/shows'
                ? 'Search for TV series'
                : 'Search for bookmarked Media'
            }
            onChange={handleChange}
            value={text}
          />
        </div>
      </form>
    </div>
  );
}

export default Searchbar;
