import { ReactNode, createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API_KEY, BASE_URL } from '@/constants';

interface SearchContextValues {
  searchAPIData: (props: SearchAPIDataProps) => Promise<void>;
  searchData: any;
  movieData: any;
  showData: any;
  queryTerm: string;
  setCurrentPage: any;
  currentPage: number;
}

interface SearchAPIDataProps {
  text: string;
  page?: number;
}

const SearchContext = createContext<SearchContextValues | undefined>(undefined);

interface SearchContextProps {
  children: ReactNode;
}

export const SearchContextProvider = ({ children }: SearchContextProps) => {
  const [searchData, setSearchData] = useState();
  const [movieData, setMovieData] = useState();
  const [showData, setShowData] = useState();
  const [queryTerm, setQueryTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const location = useLocation();
  const pathname = location.pathname;

  async function searchAPIData({
    text,
    page = currentPage,
  }: SearchAPIDataProps) {
    let endpoint;
    if (pathname === '/') {
      endpoint = 'multi';
    } else if (pathname === '/movies') {
      endpoint = 'movie';
    } else if (pathname === '/shows') {
      endpoint = 'tv';
    }

    const response = await fetch(
      `${BASE_URL}/search/${endpoint}?query=${text}&api_key=${API_KEY}&page=${page}`
    );

    const data = await response.json();
    setQueryTerm(text);

    if (endpoint === 'multi') {
      setSearchData(data);
    } else if (endpoint === 'movie') {
      setMovieData(data);
    } else if (endpoint === 'tv') {
      setShowData(data);
    }
  }

  useEffect(() => {
    if (queryTerm !== '') {
      searchAPIData({
        text: queryTerm,
        page: currentPage,
      });
    }

    window.scrollTo(0, 0);
  }, [currentPage, queryTerm]);

  return (
    <SearchContext.Provider
      value={{
        searchAPIData,
        searchData,
        movieData,
        showData,
        queryTerm,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;