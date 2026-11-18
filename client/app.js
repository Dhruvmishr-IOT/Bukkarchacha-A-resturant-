// ================================
// INITIALIZE SWIPER
// ================================

var swiper = new Swiper('.mySwiper', {
    loop: true,

    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
    },
});


const carticon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const cartclose = document.querySelector(".close-btn");

const cardlist = document.querySelector(".card-list");
const cartlist = document.querySelector(".cart-list");

const cartTotal = document.querySelector(".cart-total");
const cartValue = document.querySelector(".cart-value");

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");


// ======================================================
// CART OPEN
// ======================================================

if (carticon && cartTab) {

    carticon.addEventListener("click", (e) => {

        e.preventDefault();

        cartTab.classList.add("cart-tab-active");

    });

}


// ======================================================
// CART CLOSE
// ======================================================

if (cartclose && cartTab) {

    cartclose.addEventListener("click", (e) => {

        e.preventDefault();

        cartTab.classList.remove("cart-tab-active");

    });

}


// ======================================================
// MOBILE MENU
// ======================================================

if (hamburger && mobileMenu) {

    hamburger.addEventListener("click", (e) => {

        e.preventDefault();

        mobileMenu.classList.toggle("mobile-menu-active");

        // Change hamburger icon
        const icon = hamburger.querySelector("i");

        if (icon) {

            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-xmark");

        }

    });

}


// ======================================================
// MOBILE MENU LINKS
// ======================================================

const mobileLinks =
    document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (mobileMenu) {

            mobileMenu.classList.remove(
                "mobile-menu-active"
            );

        }

        const icon =
            hamburger?.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

});


// ======================================================
// SINGLE PAGE NAVIGATION
// ======================================================

const navLinks =
    document.querySelectorAll(
        ".navlist a, .mobile-menu a"
    );

navLinks.forEach((link) => {

    link.addEventListener("click", (e) => {

        const targetId =
            link.getAttribute("href");

        // Only handle #section links
        if (
            targetId &&
            targetId.startsWith("#")
        ) {

            e.preventDefault();

            const targetSection =
                document.querySelector(targetId);

            if (targetSection) {

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }

    });

});


// ======================================================
// PRODUCT LIST
// ======================================================

let productlist = [];

let cartproduct = [];


// ======================================================
// FORMAT PRICE
// ======================================================

const getPrice = (price) => {

    // Handles:
    // "$9.67"
    // "₹149"
    // "9.67"

    return Number(
        String(price)
            .replace("$", "")
            .replace("₹", "")
            .replace(",", "")
            .trim()
    );

};


// ================================
// SHOW PRODUCTS
// ================================

const showcards = () => {

    cardlist.innerHTML = "";

    productlist.forEach(product => {

        const ordercard =
            document.createElement("div");

        ordercard.classList.add("order-card");


        ordercard.innerHTML = `
            
            <img 
                src="${product.image}" 
                alt="${product.name}"
            >

            <h3>
                ${product.name}
            </h3>

            <h4 class="price">
                ₹${Number(product.price).toFixed(2)}
            </h4>

            <button class="btn add-to-cart">

                Add to Cart

                <i class="fa-solid fa-cart-plus"></i>

            </button>

        `;


        cardlist.appendChild(ordercard);


        // Add To Cart Button

        const cardbtn =
            ordercard.querySelector(".add-to-cart");


        cardbtn.addEventListener("click", (e) => {

            e.preventDefault();

            addToCart(product);

        });

    });

};


// ================================
// ADD TO CART
// ================================

const addToCart = (product) => {

    // Check product already exists

    const existingProduct =
        cartproduct.find(item => item.id === product.id);


    if (existingProduct) {

        alert("Item already in your cart!");

        return;

    }


    // Create cart object

    const cartItem = {

        ...product,

        price: Number(product.price),

        quantity: 1

    };


    // Add product to cart array

    cartproduct.push(cartItem);


    // Create cart HTML

    const cartItms =
        document.createElement("div");

    cartItms.classList.add("items");


    cartItms.innerHTML = `

        <img 
            src="${product.image}" 
            alt="${product.name}"
        >

        <div class="item-info">

            <h4>
                ${product.name}
            </h4>


            <p>
                ₹${Number(product.price).toFixed(2)}
            </p>


            <div class="detail">

                <h4>
                    Item Total
                </h4>

                <h4 class="item-total">
                    ₹${Number(product.price).toFixed(2)}
                </h4>

            </div>


            <div class="quantity">

                <button 
                    class="quantity-btn minus"
                    type="button"
                >

                    <i class="fa-solid fa-minus"></i>

                </button>


                <span class="quantity-value">
                    1
                </span>


                <button 
                    class="quantity-btn plus"
                    type="button"
                >

                    <i class="fa-solid fa-plus"></i>

                </button>

            </div>

        </div>

    `;


    cartlist.appendChild(cartItms);


    // ================================
    // CART ELEMENTS
    // ================================

    const plusbtn =
        cartItms.querySelector(".plus");


    const minusbtn =
        cartItms.querySelector(".minus");


    const quantityvalue =
        cartItms.querySelector(".quantity-value");


    const itemTotal =
        cartItms.querySelector(".item-total");


    // ================================
    // PLUS BUTTON
    // ================================

    plusbtn.addEventListener("click", (e) => {

        e.preventDefault();


        cartItem.quantity++;


        quantityvalue.textContent =
            cartItem.quantity;


        itemTotal.textContent =
            `₹${(
                cartItem.price *
                cartItem.quantity
            ).toFixed(2)}`;


        updateCartTotal();

    });


    // ================================
    // MINUS BUTTON
    // ================================

    minusbtn.addEventListener("click", (e) => {

        e.preventDefault();


        if (cartItem.quantity > 1) {

            cartItem.quantity--;


            quantityvalue.textContent =
                cartItem.quantity;


            itemTotal.textContent =
                `₹${(
                    cartItem.price *
                    cartItem.quantity
                ).toFixed(2)}`;


            updateCartTotal();

        }

    });


    // Update total

    updateCartTotal();

};


// ================================
// UPDATE CART TOTAL
// ================================

const updateCartTotal = () => {

    let total = 0;


    cartproduct.forEach(product => {

        total +=
            product.price *
            product.quantity;

    });


    cartTotal.textContent =
        `₹${total.toFixed(2)}`;


    // Update cart item count

    if (cartValue) {

        let totalItems = 0;


        cartproduct.forEach(product => {

            totalItems +=
                product.quantity;

        });


        cartValue.textContent =
            totalItems;

    }

};



const initapp = () => {
  fetch('product.json')
    .then(response => response.json())
    .then(data => {
      productlist = data;
      showcards();
    })
    .catch(error => console.log(error));
}

initapp();
