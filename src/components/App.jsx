import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';

import PaginatedItems from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loading from './loading/Loading';
import ErrorView from './Error/ErrorView';

const KEY = '32771968-7fd567c901afb84ab6320145c';

class App extends Component {
  state = {
    searchValue: '',
    modalActive: false,
    images: [],
    page: 1,
    activeImgUrl: '',
    loading: false,
    error: null,
  };
  componentDidUpdate(_, prevState) {
    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.page !== this.state.page
    ) {
      this.setState({
        loading: true,
      });
      fetch(
        ` https://pixabay.com/api/?q=${this.state.searchValue}&key=${KEY}&page=${this.state.page}&image_type=photo&orientation=horizontal&per_page=50`
      )
        .then(resp => {
          console.log(resp.status);
          if (resp.status !== 200) {
            return Promise.reject(
              new Error(`something went wrong :(`)
            );
          }

          return resp.json();
        })
        .then(imagesData => {
          if (imagesData.hits.length === 0) {
            toast.error("We didn't find any images", {
              theme: 'dark',
            });

            return Promise.reject(
              new Error(`images not found `)
            );
          }
          this.setState(prevState => ({
            images: [
              ...prevState.images,
              ...imagesData.hits,
            ],
          }));
        })
        .catch(Error =>
          this.setState({ error: Error.message })
        )
        .finally(() =>
          this.setState({ searchValue: '', loading: false })
        );
    }
  }
  //
  getActiveImg = id => {
    const activeImg = this.state.images.find(
      image => image.id === id
    );
    if (activeImg.id === id) {
      this.setState({
        activeImgUrl: activeImg.largeImageURL,
      });
    }
  };
  toggleModal = () => {
    this.setState({ modalActive: !this.state.modalActive });
  };

  loadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  // Отримуєм значення фоми
  handelSubmit = value =>
    this.setState({
      searchValue: value,
      modalActive: false,
      images: [],
      page: 1,
      activeImgUrl: '',
      loading: false,
      error: null,
    });

  render() {
    return (
      <div>
        <ToastContainer
          autoClose={2000}
          hideProgressBar={false}
        />
        <Searchbar handelSubmit={this.handelSubmit} />
        {this.state.loading && <Loading />}

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
            data={this.state.images}
            toggleModal={this.toggleModal}
            getActiveImg={this.getActiveImg}
          />
          {this.state.images.length > 0 && (
            <Button
              type="button"
              LoadMore
              onClick={this.loadMore}
            >
              Load more
            </Button>
          )}
        </div>

        {this.state.error && (
          <ErrorView errorText={this.state.error} />
        )}
        {this.state.modalActive && (
          <Modal toggleModal={this.toggleModal}>
            <img src={this.state.activeImgUrl} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export { App };
