import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';

import PaginatedItems from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loading from './loading/Loading';
import ErrorView from './Error/ErrorView';
import fetchImages from '../API/ImagesAPI';
// import { GallerySceleton } from '../components/ImageGallery/GallerySceleton/GallarySceleton';

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [activeImgUrl, setActiveImgUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchValue) return;
    setLoading(true);
    const getImages = async () => {
      try {
        const imagesData = await fetchImages(searchValue, page);

        if (imagesData.hits.length === 0) {
          toast.error("We didn't find any images", {
            theme: 'dark',
          });

          return Promise.reject(new Error(`images not found `));
        }
        setImages(prevImages => [...prevImages, ...imagesData.hits]);
        // setImages([...images, ...imagesData.hits]);
        // тут помилка бо по сабміту я скидала images до []і пустий масив писала в стейт
        // також обнулати масив треба не по сабміту а коли змінилось searchValue
        // використовувати useEffect щоб відслідкувати
      } catch (Error) {
        setError(Error.message);
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, [page, searchValue]);

  const getActiveImg = id => {
    const activeImg = images.find(image => image.id === id);
    if (activeImg.id === id) {
      setActiveImgUrl(activeImg.largeImageURL);
    }
  };
  const toggleModal = () => {
    setModalActive(!modalActive);
  };

  const loadMore = () => {
    setPage(() => page + 1);
  };

  // Отримуєм значення фоми
  const handelSubmit = value => {
    // console.log(value);
    // console.log(searchValue);
    // console.log(value !== searchValue);
    if (value !== searchValue) {
      setSearchValue(value);
    } else {
      toast.error(`${value} already displayed`, {
        theme: 'dark',
      });
    }

    // setModalActive(false);
    // setImages([]);
    // setPage(1);
    // setActiveImgUrl('');
    // setLoading(false);
    // setError(null);
  };
  // скинути стейт коли міняється значення  searchValue
  useEffect(() => {
    setModalActive(false);
    setImages([]);
    setPage(1);
    setActiveImgUrl('');
    // setLoading(false);
    setError(null);
  }, [searchValue]);

  return (
    <div>
      <ToastContainer autoClose={2000} hideProgressBar={false} />
      <Searchbar handelSubmit={handelSubmit} />
      {loading && <Loading />}

      <div
        style={{
          justifyContent: ' center',
          flexDirection: 'column',
          display: 'flex',
          alignItems: ' center',
          gap: 30,
          padding: 20,
        }}
      >
        <PaginatedItems
          data={images}
          toggleModal={toggleModal}
          getActiveImg={getActiveImg}
        />
        {images.length > 0 && (
          <Button type="button" LoadMore onClick={loadMore}>
            Load more
          </Button>
        )}
      </div>
      {error && <ErrorView text={error} />}
      {modalActive && (
        <Modal toggleModal={toggleModal}>
          <img src={activeImgUrl} alt="" />
        </Modal>
      )}
    </div>
  );
}
