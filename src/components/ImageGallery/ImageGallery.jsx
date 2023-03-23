import css from './ImageGallery.module.css';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default function PaginatedItems(props) {
  const { data, getActiveImg, toggleModal } = props;

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % data.length;

    setItemOffset(newOffset);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <ul className={css.ImageGallery}>
        {currentItems.map(({ id, webformatURL, tags }) => (
          <ImageGalleryItem
            id={id}
            webformatURL={webformatURL}
            tags={tags}
            key={id}
            getActiveImg={getActiveImg}
            toggleModal={toggleModal}
          />
        ))}
      </ul>
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName={css.pageItem}
        pageLinkClassName={css.pageLink}
        previousClassName
        previousLinkClassName
        nextClassName
        nextLinkClassName
        breakLabel="..."
        breakClassName
        breakLinkClassNam
        containerClassName={css.pagination}
        activeClassName={css.active}
        renderOnZeroPageCount={null}
      />
    </>
  );
}
