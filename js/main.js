// Toggle mobile menu
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav ul');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

// Contact form validation
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === "" || email === "" || message === "") {
      alert("Please fill out all fields!");
      return;
    }

    alert("Message sent successfully!");
    form.reset();
  });
}

// 🛒 Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

function addToCart(product) {
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Attach event listeners to "Add to Cart" buttons (only if they exist)
const addToCartButtons = document.querySelectorAll('.add-to-cart');
if (addToCartButtons.length > 0) {
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.product-card');
      const id = card.getAttribute('data-id');
      const name = card.querySelector('h3').textContent;
      const price = card.querySelector('p').textContent;

      const product = { id, name, price };
      addToCart(product);
    });
  });
  const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    alert("Thanks for subscribing!");
    newsletterForm.reset();
  });
}
const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
  reviewForm.addEventListener('submit', e => {
    e.preventDefault();
    alert("Thanks for your review!");
    reviewForm.reset();
  });
}
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);