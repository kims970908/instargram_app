import React from "react";

const LoadMoreBtn = ({result, page, load, handleLoadMore}) => {
  return (
    <>
      {
      result < 3 * (page - 1) ? '' : 
        
        !load && (
            <button
              className="btn btn-dark mx-auto d-block"
              onClick={handleLoadMore}
            >
              더보기
            </button>
          )}
    </>
  );
};

export default LoadMoreBtn;
