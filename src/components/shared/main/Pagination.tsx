import React, { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { useSearch } from '@/hooks/useSearch';

function Pagination({ item }) {
  const { currentPage, setCurrentPage } = useSearch();
  const [inputValue, setInputValue] = useState(currentPage);

  console.log(inputValue);

  function handlePrevClick() {
    setCurrentPage(currentPage - 1);
    setInputValue(Number(inputValue) - 1);
  }

  function handleNextClick() {
    setCurrentPage(currentPage + 1);
    setInputValue(Number(inputValue) + 1);
  }

  function handleChange(e) {
    const numValue = Number(e.target.value);
    if (numValue > item.total_pages) {
      e.target.value = item.total_pages;
    }

    setInputValue(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      setCurrentPage(Number(inputValue));
    }
  }

  console.log(item.total_pages);

  return (
    <div className="container flex items-center gap-6 pb-12">
      <Button
        onClick={handlePrevClick}
        className="w-20"
        disabled={currentPage === 1}
      >
        Prev
      </Button>
      <div className="flex items-center ">
        <input
          type="number"
          placeholder={item.page}
          className="w-6 h-6 text-center outline-none text-greyish-blue  placeholder:text-red rounded-md "
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={inputValue}
        />
        <p className="text-white ml-2">
          of <span className="ml-1 text-white">{item.total_pages}</span>
        </p>
      </div>
      <Button
        onClick={handleNextClick}
        className="w-20"
        disabled={currentPage === Number(item.total_pages)}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
