import css from './ImageGalleryItem.module.css';
const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  toggleModal,
  getActiveImg,
}) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        onClick={() => {
          getActiveImg(id);
          toggleModal();
        }}
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};

export default ImageGalleryItem;
