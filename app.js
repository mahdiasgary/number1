import { productsData } from "./products.js";

const backdrop = document.querySelector(".backdrop")
const cartModal =document.querySelector(".cart")
const cartBtn=document.querySelector(".cart-btn")
const productsDOM = document.querySelector(".products-center");
const cartBottens =document.querySelectorAll(".")
console.log(productsDOM);
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
              <span class="price">${product.price}</span>
            </div>
            <button class="btn add-to-cart" data-id=${product.id}>in cart</button>
          </div>`;
      productsDOM.innerHTML = result;
    });
  }
}

class Strange {
  static saveProducts(products){
    localStorage.setItem("products",JSON.stringify(products))
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const productsData = products.getproducts();
  //Produts.productsData()
  const ui = new Ul();
  ui.displayProducts(productsData);
  Strange.saveProducts(productsData)
});



backdrop.addEventListener("click",()=>{
cartModal.style.opacity="0"
cartModal.style.top ="-100%";
backdrop.style.display="none"
})
 
cartBtn.addEventListener("click",()=>{
  cartModal.style.opacity="1";
  cartModal.style.top="10px";
  backdrop.style.display ="block"
})