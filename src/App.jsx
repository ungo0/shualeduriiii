import { useState } from 'react';
import './App.css';

function App() {
  const images = ["image-product-1.jpg", "image-product-2.jpg", "image-product-3.jpg", "image-product-4.jpg"];
  const [mainImg, setMainImg] = useState(images[0]);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [cont, setCont] = useState(1);
  const [cart, setCart] = useState([]);
  const [cartPopup, setCartPopup] = useState(false);

  const handleDelete = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  };

  const nextHandler = () => {
    if (count >= images.length - 1) {
      setCount(0);
      setMainImg(images[0]);
    } else {
      setCount(count + 1);
      setMainImg(images[count + 1]);
    }
  };

  const prevHandler = () => {
    if (count <= 0) {
      setCount(images.length - 1);
      setMainImg(images[images.length - 1]);
    } else {
      setCount(count - 1);
      setMainImg(images[count - 1]);
    }
  };

  const handleAddCart = () => {
    const cartInfo = {
      id: Date.now(),
      title: 'Fall Limited Edition Sneakers',
      desc: 'Low-profile sneakers',
      price: 125,
      total: 125 * cont,
    };
    setCart([cartInfo]);
    setCartPopup(true);
  };

  const toggleCartPopup = () => {
    setCartPopup(prev => !prev);
  };

  return (
    <>
      <div className="tavi">
        <h3>sneakers</h3>
        <nav>
          <ul>
            <li>Collections</li>
            <li>Men</li>
            <li>Women</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
        <div className="cart-container">
          <img
            src="icon-cart.svg"
            alt="Cart Icon"
            className="cart-icon"
            onClick={toggleCartPopup}
          />
          {cartPopup && (
            <div className="cart-popup">
              <h4>Cart</h4>
              {cart.length > 0 ? (
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img src="image-product-1-thumbnail.jpg" alt="Product" />
                      <div>
                        <p>{item.title}</p>
                        <p>
                          ${item.price} x {cont} <strong>${item.total}</strong>
                        </p>
                      </div>
                      <button onClick={() => handleDelete(item.id)}>
                        <img src="icon-delete.svg" alt="Delete" />
                      </button>
                    </div>
                  ))}
                  <button className="checkout-btn">Checkout</button>
                </div>
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
          )}
        </div>
        <img src="image-avatar.png" alt="Avatar" className="avatar" />
      </div>

      <div className="product-container">
        <div className="left-container">
          <img
            className="productImage__container"
            src={mainImg}
            alt="Product"
            onClick={() => setShow(true)}
          />
          <div className="arro">
            {images.map((el, index) => (
              <img
                key={index}
                src={el}
                className={`thumbnail ${mainImg === el ? "active" : ""}`}
                onClick={() => {
                  setMainImg(el);
                  setCount(index);
                }}
              />
            ))}
          </div>
        </div>

        <div className="right-container">
          <div className="details">
            <span className="company-name">Sneaker Company</span>
            <h1 className="product-title">Fall Limited Edition Sneakers</h1>
            <p className="product-description">
              These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.
            </p>
            <div className="price">
              <h2>$125.00</h2>
              <span className="discount">50%</span>
              <p className="original-price">$250.00</p>
            </div>
            <div className="quantity-container">
              <button onClick={() => setCont(cont > 1 ? cont - 1 : cont)}>
                <img src="icon-minus.svg" alt="Decrease" />
              </button>
              <span>{cont}</span>
              <button onClick={() => setCont(cont + 1)}>
                <img src="icon-plus.svg" alt="Increase" />
              </button>
            </div>
            <button className="add-to-cart-btn" onClick={handleAddCart}>
              <img src="icon-cart.svg" alt="cart" />
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {show && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="arrow" onClick={prevHandler}>
              <img src="icon-previous.svg" alt="Previous" />
            </button>
            <img src={mainImg} alt="Product" className="main-image" />
            <button className="arrow" onClick={nextHandler}>
              <img src="icon-next.svg" alt="Next" />
            </button>
          </div>
          <div className="thumbnail-gallery">
            {images.map((el, index) => (
              <img
                key={index}
                src={el}
                className={`thumbnail ${mainImg === el ? "active" : ""}`}
                onClick={() => setMainImg(el)}
                alt="Thumbnail"
              />
            ))}
          </div>
          <button className="close-modal" onClick={() => setShow(false)}>
            <img src="icon-close.svg" alt="Close" />
          </button>
        </div>
      )}
      
    </>
  );
}

export default App;
