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
  console.log(page);

  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    setLoading(true);

    const getImages = async () => {
      try {
        const imagesData = await fetchImages(searchValue, page);
        console.log(page);
        if (imagesData.hits.length === 0) {
          toast.error("We didn't find any images", {
            theme: 'dark',
          });

          return Promise.reject(new Error(`images not found `));
        }
        setImages([...images, ...imagesData.hits]);
      } catch (Error) {
        setError(Error.message);
      } finally {
        setSearchValue('');
        setLoading(false);
      }
    };
    getImages();
  }, [images, page, searchValue]);

  //   if (
  //     prevState.searchValue !== this.state.searchValue ||
  //     prevState.page !== this.state.page
  //   ) {
  //     this.setState({
  //       loading: true,
  //     });
  //     fetch(
  //       ` https://pixabay.com/api/?q=${this.state.searchValue}&key=${KEY}&page=${this.state.page}&image_type=photo&orientation=horizontal&per_page=50`
  //     )
  //       .then(resp => {
  //         console.log(resp.status);
  //         if (resp.status !== 200) {
  //           return Promise.reject(new Error(`something went wrong :(`));
  //         }

  //         return resp.json();
  //       })
  //       .then(imagesData => {
  //         if (imagesData.hits.length === 0) {
  //           toast.error("We didn't find any images", {
  //             theme: 'dark',
  //           });

  //           return Promise.reject(new Error(`images not found `));
  //         }
  //         this.setState(prevState => ({
  //           images: [...prevState.images, ...imagesData.hits],
  //         }));
  //       })
  //       .catch(Error => this.setState({ error: Error.message }))
  //       .finally(() => this.setState({ searchValue: '', loading: false }));
  //   }
  // }
  //
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
    setSearchValue(value);
    setModalActive(false);
    setImages([]);
    setPage(1);
    setActiveImgUrl('');
    setLoading(false);
    setError(null);
  };

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
