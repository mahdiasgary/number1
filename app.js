import { productsData } from "./products.js";

const backdrop = document.querySelector(".backdrop");
const cartModal = document.querySelector(".cart");
const cartBtn = document.querySelector(".cart-btn");
const productsDOM = document.querySelector(".products-center");
const carttotal = document.querySelector(".cart-total");
const cartItems = document.querySelector(".cart-items");
const cartContact = document.querySelector(".cartshow");
const clearCartBtn =document.querySelector(".clear-cart")
let cart = [];
class Products {
  getproducts() {
    return productsData;
  }
  //static get product(){return productsData}
}

class Ul {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `<div class="product">
      <div class="img-container">
      <img src="${product.imageUrl}" alt="" class="product-image" />
      </div>
      <div class="product-desc">
      <span class="product-title">${product.title}</span>
      <span class="price">${product.price} $</span>
      </div>
      <button class="btn add-to-cart" data-id=${product.id}>Add to Cart</button>
      </div>`;
      productsDOM.innerHTML = result;
    });
  }

  getCartbtns() {
    const addtocartbtns = document.querySelectorAll(".add-to-cart");
    console.log(addtocartbtns);

    addtocartbtns.forEach((button) => {
      const id = button.dataset.id;
      const isinCart = cart.find(
        (item) => item.id === parseInt(button.dadaset.id)
      );
      if (isinCart) {
        button.innerText = "In Cart";
        button.disabled = "true";
      }
      button.addEventListener("click", (event) => {
        event.target.innerText = "In Cart";
        event.target.disabled = "true";

        const addedProduct = { ...Strange.getproducts(id), quantity: 1 };
        console.log(addedProduct);
        cart = [...cart, addedProduct];
        Strange.saveCart(cart);
        this.setCartValue(cart);
        this.addCartItem(addedProduct);
      });
    });
  }

  setCartValue(cart) {
    let tempCartItems = 0;
    const totalPrice = cart.reduce((acc, curr) => {
      tempCartItems += curr.quantity;
      return curr.quantity * curr.price + acc;
    }, 0);
    carttotal.innerText = `total price : ${parseFloat(totalPrice).toFixed(2)}$`;
    cartItems.innerText = tempCartItems;
  }

  addCartItem(cart) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `<img class="cart-item-img" src="${cart.imageUrl}" alt="">
    <div class="cart-item-desc">
      <h2>${cart.title}</h2>
      <h3>${cart.price}$</h3>
    </div>
    <div class="cart-item-conteoller">
      <i data-id=${cart.id}>up</i>
      <p>${cart.quantity}</p>
      <i data-id=${cart.id} class="remove-item">down</i>
    </div>
    <i data-id=${cart.id}>Trash</i>`;
    cartContact.appendChild(div);
  }
  setupApp() {
    cart = Strange.getcart();
    this.setCartValue(cart);
    this.populatecart(cart);
  }
  populatecart(cart) {
    cart.forEach((item) => this.setCartValue(item));
  }
  caerlogic(){
    clearCartBtn.addEventListener("click",()=>{
      this.clearCart()
    });
    cartContact.addEventListener("click",(event)=>{
      if(event.target.classList.contains("remove-item")){
        const removeItem =event.target;
        cartContact.removeChild(removeItem.parentElement)
      }
    })

  }
}

class Strange {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static getproducts(id) {
    const _products = JSON.parse(localStorage.getItem("products"));
    return _products.find((product) => product.id === parseInt(id));
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getcart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const productsData = products.getproducts();

  //Produts.productsData()
  const ui = new Ul();
  ui.displayProducts(productsData);
  Strange.saveProducts(productsData);
  ui.getCartbtns();
  ui.setupApp();
});

backdrop.addEventListener("click", () => {
  cartModal.style.opacity = "0";
  cartModal.style.top = "-100%";
  backdrop.style.display = "none";
});

cartBtn.addEventListener("click", () => {
  cartModal.style.opacity = "1";
  cartModal.style.top = "5%";
  backdrop.style.display = "block";
});
