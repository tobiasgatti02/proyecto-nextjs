"use client"
import React from 'react';

interface PaginationSliderProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationSlider: React.FC<PaginationSliderProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <>
    <div className='mt-10 pb-10'>
      <div className="flex justify-center items-center space-x-4">
          <button
              className="px-4 py-2 rounded bg-white text-gray-600"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
          >
          Prev
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-white">Page</span>
          <input
            type="number"
            className="w-12 px-2 py-1 rounded border border-white text-center"
            value={currentPage}
            onChange={(e) => onPageChange(parseInt(e.target.value))}
            min={1}
            max={totalPages}
          />
          <span className="text-white">of {totalPages}</span>
        </div>
        <button
          className="px-4 py-2 rounded bg-white text-gray-600"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
    </>
    );
};

export default PaginationSlider;
