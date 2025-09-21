document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalSpan = document.getElementById('cart-total');
  const checkoutForm = document.getElementById('checkoutForm');

  function renderCart() {
    let total = 0;
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
      cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
      cartTotalSpan.textContent = 'ksh 0';
      return;
    }

    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';
      itemDiv.innerHTML = `
        <p>${item.name} - ${item.price}</p>
        <button class="remove-item" data-index="${index}">Remove</button>
      `;
      cartItemsDiv.appendChild(itemDiv);

      const price = parseInt(item.price.replace('ksh', '').trim());
      total += price;
    });

    cartTotalSpan.textContent = `ksh ${total}`;
    attachRemoveListeners();
  }

  function attachRemoveListeners() {
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });
  }

  renderCart();

  // Handle checkout form submission
  checkoutForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('fullName').value.trim();
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || !address || !phone) {
      alert('Please fill in all delivery details.');
      return;
    }

    const orderSummary = cart.map(item => `${item.name} - ${item.price}`).join('\n');
    const total = cartTotalSpan.textContent;
    const message = `Hi Lip Fam! I'd like to order:\n${orderSummary}\nTotal: ${total}\n\nDeliver to:\n${name}\n${address}\nPhone: ${phone}`;

    const whatsappNumber = '254758724761';
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, '_blank');
  });

  // Optional: Clear Cart Button
  const clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear Cart';
  clearBtn.className = 'clear-cart';
  clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      cart = [];
      localStorage.removeItem('cart');
      renderCart();
    }
  });

  cartItemsDiv.insertAdjacentElement('beforebegin', clearBtn);
});