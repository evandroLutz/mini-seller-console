import { JSX } from "react";
import Button from "../atoms/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps): JSX.Element {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <Button title={"Prev"} active={currentPage !== 1} onClick={() => onPageChange(Math.max(1, currentPage - 1))} /> 

      {pages.map(page => (
        <Button title={`${page}`} active={true} onClick={() => onPageChange(page)} />
      ))}

      <Button title={"Next"} active={currentPage !== totalPages} onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} /> 
    </div>
  );
}

export default Pagination;
