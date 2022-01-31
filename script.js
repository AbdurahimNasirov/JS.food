const products = {

  plainBurger: {

    name: "GAMBURGER",

    price: 10000,

    kcal: 150,

    amount: 0,

    get totalPrice() {

      return this.price * this.amount;
    },

    get totalKcal() {

      return this.kcal * this.amount;
    },
  },
  freshBurger: {

    name: "GAMBURGER FRESH",

    price: 20500,

    kcal: 250,

    amount: 0,

    get totalPrice() {

      return this.price * this.amount;
    },

    get totalKcal() {

      return this.kcal * this.amount;
    },
  },
  freshCombo: {
    name: "FRESH COMBO",

    price: 31900,

    kcal: 500,

    amount: 0,

    get totalPrice() {

      return this.price * this.amount;
    },

    get totalKcal() {

      return this.kcal * this.amount;
    },
  },
};

const productsBtn = document.querySelectorAll(".main__product-btn");

const changeProductAmount = (event) => {

  const parent = event.currentTarget.closest(".main__product"),

    parentId = parent.getAttribute("id"),

    productNumber = parent.querySelector(".main__product-num"),

    productTotalPrice = parent.querySelector(".main__product-price span"),

    productTotalKcal = parent.querySelector(".main__product-kcall span"),

    plusOrMinus = event.currentTarget.getAttribute("data-symbol");

  if (plusOrMinus === "+") products[parentId].amount++;

  else if (plusOrMinus === "-" && products[parentId].amount > 0)

    products[parentId].amount--;

  productNumber.innerText = products[parentId].amount;

  productTotalPrice.innerText = products[parentId].totalPrice;

  productTotalKcal.innerText = products[parentId].totalKcal;
};
const format = n => n.toLocaleString()
productsBtn.forEach((btn) => (btn.onclick = changeProductAmount));

const cartButton = document.querySelector(".addCart");

const receipt = document.querySelector(".receipt");

const receiptWindow = document.querySelector(".receipt__window");

const receiptOut = document.querySelector(".receipt__window-out");

const receiptBtn = document.querySelector(".receipt__window-btn");

receipt.onclick = () => {receipt.style.display = "none" , receiptWindow.style.top = "-100%"}

cartButton.onclick = () => {

  receipt.style.display = "flex";

  setTimeout(() => (receipt.style.opacity = "1"), 50);

  setTimeout(() => (receiptWindow.style.top = "20%"), 100);
  
  
  let totalPrice = 0;

  let totalKcal = 0;

  let text = `<h4 class="receipt__title">Purchased:</h4>`

  const cart = Object.values(products).filter(item=>item.amount)

  cart.forEach((product,index) =>{

    totalPrice += product.totalPrice

    totalKcal += product.totalKcal
    
    if(product.amount) text += `
        <div class="receipt__product">
          <span class="receipt__index">${index + 1}</span>
          <p class="receipt__name">${product.name}</p>
          <p class="receipt__amount">${format(product.price)} x ${product.amount}</p>
          <p class="receipt__price">${format(product.totalPrice)}</p>
        </div>
      `
  })

  text+=`
    <div class="recipe__total-info">
      <p class="recipe__total-kcal">Total Calories: <b>${format(totalKcal)}</b></p>
      <p class="recipe__total-price">Total Price: <b>${format(totalPrice)}</b> sum</p>
    </div>
  `
  receiptOut.innerHTML = text
};

receiptBtn.onclick = ()=>location.reload()