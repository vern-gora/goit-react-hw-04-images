import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageAPI from '../services/api';
import Loader from './Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

function App() {
  const [searchName, setSearchName] = useState('');
  const [gallery, setGallery] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [modalImage, setModalImage] = useState('');
  const [notFound, setNotFound] = useState(false);

  const handleSubmit = query => {
    setSearchName(query);
    setGallery([]);
    setPage(1);
  };

  const handleLoadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showModal = url => {
    setModalImage(url);
  };

  const closeModal = () => {
    setModalImage('');
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);

      try {
        const result = await ImageAPI.fetchImage(searchName, page);

        if (!result.ok) {
          setNotFound(true);
          return;
        }

        const galleryData = await result.json();

        if (galleryData.totalHits > 0) {
          if (notFound) {
            setNotFound(false);
          }

          setGallery(prevGallery => [...prevGallery, ...galleryData.hits]);
          setTotalImages(galleryData.totalHits);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoader(false);
      }
    };

    if (searchName && (page === 1 || searchName !== '')) {
      fetchData();
    }
  }, [searchName, page, notFound]);

  // useEffect(() => {
  //   setLoader(true);
  //   ImageAPI.fetchImage(searchName, page)
  //     .then(result => {
  //       if (result.ok) {
  //         return result.json();
  //       }
  //     })
  //     .then(gallery => {
  //       console.log(gallery);
  //       if (gallery.totalHits > 0) {
  //         setGallery(prevGallery => [...prevGallery, ...gallery.hits]);
  //         setTotalImages(gallery.totalHits);
  //       } else {
  //         return setNotFound(true);
  //       }
  //     })

  //     .catch(error => setError(error))
  //     .finally(() => setLoader(false));
  // }, [searchName, page]);

  return (
    <>
      <Searchbar handleSubmit={handleSubmit} />
      {gallery.length > 0 && (
        <ImageGallery gallery={gallery} showModal={showModal} />
      )}
      {error && <p>Something went wrong</p>}
      {notFound && (
        <p className={css.NoImages}>No images for "{searchName}" request</p>
      )}
      {!searchName && (
        <p className={css.UserHelp}>What image do you want to find?</p>
      )}
      {loader && <Loader />}
      {totalImages > gallery.length && !loader && !notFound && (
        <Button onClick={handleLoadMoreBtn} />
      )}
      {modalImage && <Modal image={modalImage} closeModal={closeModal} />}
      <ToastContainer autoClose={1000} />
    </>
  );
}

export default App;

// class App extends Component {
//   state = {
//     searchName: '',
//     gallery: [],
//     loader: false,
//     error: null,
//     page: 1,
//     totalImages: 0,
//     modalImage: '',
//     notFount: false,
//   };

//   handleSubmit = query => {
//     this.setState({
//       searchName: query,
//       gallery: [],
//       page: 1,
//     });
//   };

//   handleLoadMoreBtn = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   showModal = url => {
//     this.setState({ modalImage: url });
//   };

//   closeModal = () => {
//     this.setState({ modalImage: '' });
//   };

// componentDidUpdate(_, prevState) {
//   const nextName = this.state.searchName;
//   if (
//     prevState.searchName !== nextName ||
//     this.state.page !== prevState.page
//   ) {
//     this.setState({ loader: true });

//     ImageAPI.fetchImage(nextName, this.state.page)
//       .then(result => {
//         if (result.ok) {
//           return result.json();
//         }
//         this.setState({ notFount: true });
//       })
//       .then(gallery => {
//         if (gallery.totalHits > 0) {
//           if (this.state.notFount) {
//             this.setState({ notFount: false });
//           }

//           return this.setState(prevState => ({
//             gallery: [...prevState.gallery, ...gallery.hits],
//             totalImages: gallery.totalHits,
//           }));
//         } else {
//           return this.setState({ notFount: true });
//         }
//       })

//       .catch(error => this.setState({ error }))
//       .finally(() => this.setState({ loader: false }));
//   }
// }

//   render() {
//     const {
//       searchName,
//       gallery,
//       loader,
//       error,
//       totalImages,
//       modalImage,
//       notFount,
//     } = this.state;
//     return (
//       <>
//         <Searchbar handleSubmit={this.handleSubmit} />
//         {gallery.length > 0 && (
//           <ImageGallery gallery={gallery} showModal={this.showModal} />
//         )}
//         {error && <p>Something went wrong</p>}
//         {notFount && (
//           <p className={css.NoImages}>No images for "{searchName}" request</p>
//         )}
//         {!searchName && (
//           <p className={css.UserHelp}>What image do you want to find?</p>
//         )}
//         {loader && <Loader />}
//         {totalImages > gallery.length && !loader && !notFount && (
//           <Button onClick={this.handleLoadMoreBtn} />
//         )}
//         {modalImage && (
//           <Modal image={modalImage} closeModal={this.closeModal} />
//         )}
//         <ToastContainer autoClose={1000} />
//       </>
//     );
//   }
// }

// export default App;
