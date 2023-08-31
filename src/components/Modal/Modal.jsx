import React, { useEffect } from 'react';
import css from 'components/Modal/Modal.module.css';
import PropTypes from 'prop-types';

function Modal({ image, closeModal }) {
  useEffect(() => {
    const handlePressOnESC = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handlePressOnESC);
    return () => {
      window.removeEventListener('keydown', handlePressOnESC);
    };
  }, [closeModal]);

  return (
    <div className={css.Overlay} onClick={closeModal}>
      <div className={css.Modal}>
        <img src={image} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;

// class Modal extends Component {
//   static propTypes = {
//     image: PropTypes.string.isRequired,
//     closeModal: PropTypes.func.isRequired,
//   };

//   componentDidMount() {
//     window.addEventListener('keydown', this.handlePressOnESC);
//   }

//   handlePressOnESC = e => {
//     if (e.code === 'Escape') {
//       this.props.closeModal();
//     }
//   };

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handlePressOnESC);
//   }

//   render() {
//     const { image, closeModal } = this.props;
//     return (
//       <div className={css.Overlay} onClick={closeModal}>
//         <div className={css.Modal}>
//           <img src={image} alt="" />
//         </div>
//       </div>
//     );
//   }
// }

// Modal.propTypes = {
//   image: PropTypes.string.isRequired,
//   closeModal: PropTypes.func.isRequired,
// };

// export default Modal;
