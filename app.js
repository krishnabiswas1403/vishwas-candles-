/* ================================================================
   VISHWAS CANDLES – app.js
   Features:
     ✦ Add to Cart with quantity management
     ✦ Dynamic animated cart counter badge
     ✦ Category filtering (tabs + "All")
     ✦ Live search filter within category
     ✦ Sort by price (low/high) or default
     ✦ Cart drawer with +/− qty controls & remove
     ✦ LocalStorage persistence (cart + wishlist)
     ✦ Toast notifications
     ✦ Scroll-triggered fade-in animations
     ✦ Navbar scroll behaviour & mobile menu
================================================================ */

'use strict';

/* ─────────────────────────────────────────
   PRODUCT DATA
───────────────────────────────────────── */
const PRODUCTS = {
  scented: [
    {
      id: 'sc1',
      name: 'Lavender Dreams',
      desc: 'Calming lavender & chamomile blend, 40-hr burn time.',
      price: 549, original: 699,
      img: 'images/scented_lavender.png',
      badge: 'Bestseller', category: 'Scented'
    },
    {
      id: 'sc2',
      name: 'Vanilla Bloom',
      desc: 'Warm vanilla & sandalwood, hand-poured in ceramic jar.',
      price: 499, original: null,
      img: 'images/scented_vanilla.png',
      badge: null, category: 'Scented'
    },
    {
      id: 'sc3',
      name: 'Rose Petal Bliss',
      desc: 'Fresh rose & jasmine, frosted pink glass jar, 35-hr burn.',
      price: 579, original: 699,
      img: 'images/scented_rose.png',
      badge: 'New', category: 'Scented'
    },
    {
      id: 'sc4',
      name: 'Sandalwood Ritual',
      desc: 'Earthy sandalwood & cedar, dark amber jar, 50-hr burn.',
      price: 629, original: null,
      img: 'images/scented_sandalwood.png',
      badge: null, category: 'Scented'
    }
  ],
  decorative: [
    {
      id: 'dc1',
      name: 'Floral Pillar',
      desc: 'Ivory pillar with hand-pressed dried botanical embossing.',
      price: 749, original: 899,
      img: 'images/decorative_pillar.png',
      badge: 'Artisan', category: 'Decorative'
    },
    {
      id: 'dc2',
      name: 'Geo Facet',
      desc: 'Hexagonal faceted design in terracotta & cream wax.',
      price: 699, original: null,
      img: 'images/decorative_geometric.png',
      badge: null, category: 'Decorative'
    },
    {
      id: 'dc3',
      name: 'Spiral Tapers',
      desc: 'Twisted taper pair in blush & ivory on a brass holder.',
      price: 849, original: 999,
      img: 'images/decorative_taper.png',
      badge: 'Popular', category: 'Decorative'
    },
    {
      id: 'dc4',
      name: 'Seashell Votive',
      desc: 'Pearlescent shell-shaped votive, perfect coastal décor.',
      price: 599, original: null,
      img: 'images/decorative_shell.png',
      badge: 'New', category: 'Decorative'
    }
  ],
  seasonal: [
    {
      id: 'se1',
      name: 'Winter Spice',
      desc: 'Pine, cinnamon & clove — cosy festive warmth, 45-hr burn.',
      price: 649, original: 799,
      img: 'images/seasonal_winter.png',
      badge: 'Limited', category: 'Seasonal'
    },
    {
      id: 'se2',
      name: 'Spring Garden',
      desc: 'Fresh petrichor, lily & green florals in pastel ceramic.',
      price: 579, original: null,
      img: 'images/seasonal_spring.png',
      badge: 'New', category: 'Seasonal'
    },
    {
      id: 'se3',
      name: 'Diwali Diyas',
      desc: 'Festive diya set with marigold & oudh, gold-trimmed.',
      price: 799, original: 999,
      img: 'images/seasonal_diwali.png',
      badge: 'Festival', category: 'Seasonal'
    },
    {
      id: 'se4',
      name: 'Autumn Harvest',
      desc: 'Pumpkin spice & dried orange in a rustic amber jar.',
      price: 619, original: null,
      img: 'images/seasonal_autumn.png',
      badge: 'Popular', category: 'Seasonal'
    }
  ],
  giftsets: [
    {
      id: 'gs1',
      name: 'Luxury Hamper',
      desc: '3 signature candles in kraft gift box with dried botanicals.',
      price: 1799, original: 2199,
      img: 'images/gift_luxury.png',
      badge: 'Bestseller', category: 'Gift Sets'
    },
    {
      id: 'gs2',
      name: 'Wedding Glow',
      desc: 'Ivory pillar candles with gold wax seal in premium white box.',
      price: 2199, original: 2699,
      img: 'images/gift_wedding.png',
      badge: 'Premium', category: 'Gift Sets'
    },
    {
      id: 'gs3',
      name: 'Celebration Set',
      desc: 'Mix of 4 scented votives in a gold-foiled gift box.',
      price: 1499, original: null,
      img: 'images/scented_rose.png',
      badge: 'New', category: 'Gift Sets'
    },
    {
      id: 'gs4',
      name: 'Festive Trio',
      desc: 'Three seasonal candles curated in a ribbon-tied gift box.',
      price: 1699, original: 1999,
      img: 'images/seasonal_diwali.png',
      badge: 'Limited', category: 'Gift Sets'
    }
  ]
};

/* flat list of all products */
const ALL_PRODUCTS = Object.values(PRODUCTS).flat();

/* ─────────────────────────────────────────
   PRODUCT REVIEWS DATA
───────────────────────────────────────── */
const PRODUCT_REVIEWS = [
  { name: 'Priya Sharma', text: '"The fragrance is absolutely divine — fills my entire room. Burns for hours without fading!"' },
  { name: 'Rahul Verma', text: '"Beautiful packaging, perfect for gifting. My sister loved the Diwali gift set!"' },
  { name: 'Ananya Iyer', text: '"The burn time is incredible — lasted well over 50 hours. Pure quality."' },
  { name: 'Vikram Patel', text: '"Makes my home feel like a warm hug during cold evenings. Highly recommended!"' },
  { name: 'Meera Krishnan', text: '"Subtle yet long-lasting fragrance, and the eco-friendly packaging is a lovely touch."' },
  { name: 'Sneha Gupta', text: '"The scent throw is amazing even in a large room. Will be ordering again!"' },
  { name: 'Arjun Nair', text: '"Gorgeous candle — the handcrafted detail is visible. Great value for the price."' },
  { name: 'Kavita Reddy', text: '"I ordered three different scents and each one was better than the last!"' },
];

/* get 2–3 randomised reviews for a given product (seeded by product id) */
function getProductReviews(productId) {
  let hash = 0;
  for (let i = 0; i < productId.length; i++) hash = ((hash << 5) - hash) + productId.charCodeAt(i);
  hash = Math.abs(hash);
  const count = 2 + (hash % 2); // 2 or 3 reviews
  const start = hash % PRODUCT_REVIEWS.length;
  const picks = [];
  for (let i = 0; i < count; i++) {
    picks.push(PRODUCT_REVIEWS[(start + i) % PRODUCT_REVIEWS.length]);
  }
  return picks;
}

/* ─────────────────────────────────────────
   STATE
───────────────────────────────────────── */
let cart = JSON.parse(localStorage.getItem('vc_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('vc_wishlist') || '[]');
let activeCategory = 'all';
let activeSort = 'default';
let searchQuery = '';

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
const $ = id => document.getElementById(id);

function saveCart() { localStorage.setItem('vc_cart', JSON.stringify(cart)); }
function saveWishlist() { localStorage.setItem('vc_wishlist', JSON.stringify(wishlist)); }

function fmt(n) {
  return '₹' + n.toLocaleString('en-IN');
}

/* Bump animation on the cart badge */
function bumpBadge() {
  const badge = $('cartCount');
  badge.classList.remove('bump');
  void badge.offsetWidth; // reflow
  badge.classList.add('bump');
}

/* Show toast notification */
let toastTimer;
function showToast(msg, type = 'default') {
  const t = $('toast');
  t.textContent = msg;
  t.className = `toast show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ─────────────────────────────────────────
   NAVBAR — scroll behaviour
───────────────────────────────────────── */
const navbar = $('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ─────────────────────────────────────────
   MOBILE MENU
───────────────────────────────────────── */
const hamburger = $('hamburger');
const navLinks = $('navLinks');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

/* Close menu on outside click */
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

/* ─────────────────────────────────────────
   CART DRAWER — open / close
───────────────────────────────────────── */
const cartDrawer = $('cartDrawer');
const cartOverlay = $('cartOverlay');

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  cartDrawer.setAttribute('aria-hidden', 'false');
}
function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
  cartDrawer.setAttribute('aria-hidden', 'true');
}

$('cartBtn').addEventListener('click', openCart);
$('cartClose').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

/* Keyboard: Escape closes drawers/modals */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeCart();
    closeProductDetail();
  }
});

/* "Shop Now" inside empty cart */
const shopNowBtn = $('shopNowBtn');
if (shopNowBtn) {
  shopNowBtn.addEventListener('click', () => {
    closeCart();
    $('shop').scrollIntoView({ behavior: 'smooth' });
  });
}

/* ─────────────────────────────────────────
   RENDER CART DRAWER
───────────────────────────────────────── */
function renderCart() {
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  /* --- badge --- */
  const countEl = $('cartCount');
  if (totalQty > 0) {
    countEl.textContent = totalQty > 99 ? '99+' : totalQty;
    countEl.classList.add('visible');
  } else {
    countEl.classList.remove('visible');
  }

  /* --- cart header count --- */
  $('cartItemCount').textContent = totalQty > 0 ? `(${totalQty})` : '';

  /* --- empty vs filled --- */
  $('cartEmpty').style.display = cart.length === 0 ? 'flex' : 'none';
  $('cartFooter').style.display = cart.length === 0 ? 'none' : 'block';

  if (cart.length === 0) {
    $('cartItems').innerHTML = '';
    return;
  }

  $('cartTotal').textContent = fmt(totalPrice);

  /* --- line items --- */
  $('cartItems').innerHTML = cart.map(item => `
    <li class="cart-item" data-id="${item.id}">
      <img class="cart-item-img" src="${item.img}" alt="${item.name}" />
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${fmt(item.price)}</p>
        <div class="cart-qty-controls">
          <button class="qty-btn qty-dec" data-id="${item.id}" aria-label="Decrease quantity">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn qty-inc" data-id="${item.id}" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <p class="cart-item-subtotal">${fmt(item.price * item.qty)}</p>
        <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove ${item.name}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>
    </li>
  `).join('');

  /* qty decrease */
  $('cartItems').querySelectorAll('.qty-dec').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const item = cart.find(i => i.id === id);
      if (!item) return;
      if (item.qty > 1) {
        item.qty--;
      } else {
        cart = cart.filter(i => i.id !== id);
        showToast('Item removed from cart.', 'remove');
      }
      saveCart(); renderCart();
    });
  });

  /* qty increase */
  $('cartItems').querySelectorAll('.qty-inc').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const item = cart.find(i => i.id === id);
      if (!item) return;
      if (item.qty < 10) {
        item.qty++;
      } else {
        showToast('Maximum quantity is 10.', 'warn');
        return;
      }
      saveCart(); renderCart();
    });
  });

  /* remove */
  $('cartItems').querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const item = cart.find(i => i.id === id);
      if (!item) return;
      cart = cart.filter(i => i.id !== id);
      saveCart(); renderCart();
      showToast(`"${item.name}" removed.`, 'remove');
    });
  });
}

/* ─────────────────────────────────────────
   ADD TO CART
───────────────────────────────────────── */
function addToCart(productId) {
  const product = ALL_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    if (existing.qty >= 10) {
      showToast('Maximum quantity reached!', 'warn');
      return;
    }
    existing.qty++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      qty: 1
    });
  }

  saveCart();
  renderCart();
  bumpBadge();
  showToast(`🕯 "${product.name}" added to cart!`);
}

/* ─────────────────────────────────────────
   WISHLIST TOGGLE
───────────────────────────────────────── */
function toggleWishlist(productId, heartBtn) {
  const inList = wishlist.includes(productId);
  if (inList) {
    wishlist = wishlist.filter(id => id !== productId);
    heartBtn.textContent = '♡';
    heartBtn.style.color = '';
    heartBtn.title = 'Add to wishlist';
  } else {
    wishlist.push(productId);
    heartBtn.textContent = '♥';
    heartBtn.style.color = '#c84b6a';
    heartBtn.title = 'Remove from wishlist';
    showToast('💕 Added to wishlist!');
  }
  saveWishlist();
}

/* ─────────────────────────────────────────
   FILTER + SORT LOGIC
───────────────────────────────────────── */
function getFilteredProducts() {
  /* 1. category */
  let items = activeCategory === 'all'
    ? [...ALL_PRODUCTS]
    : [...(PRODUCTS[activeCategory] || [])];

  /* 2. search */
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    items = items.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  /* 3. sort */
  if (activeSort === 'low') items.sort((a, b) => a.price - b.price);
  if (activeSort === 'high') items.sort((a, b) => b.price - a.price);

  return items;
}

/* ─────────────────────────────────────────
   RENDER PRODUCTS
───────────────────────────────────────── */
function renderProducts() {
  const grid = $('productGrid');
  const countEl = $('productCount');
  const items = getFilteredProducts();

  /* update count label */
  countEl.textContent = items.length === 0
    ? 'No products found'
    : `Showing ${items.length} product${items.length !== 1 ? 's' : ''}`;

  /* empty state */
  if (items.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <span>🕯</span>
        <p>No candles match your search.<br>Try a different keyword or category.</p>
        <button class="btn btn-primary" id="clearSearch">Clear Filter</button>
      </div>`;
    const clearBtn = document.querySelector('#clearSearch');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchQuery = '';
        $('shopSearch').value = '';
        $('sortSelect').value = 'default';
        activeSort = 'default';
        renderProducts();
      });
    }
    return;
  }

  /* build cards */
  grid.innerHTML = items.map((p, i) => {
    const inWish = wishlist.includes(p.id);
    return `
    <article class="product-card" data-id="${p.id}" style="--delay:${i * 0.07}s; animation-delay:${i * 0.07}s">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <button class="product-wishlist ${inWish ? 'liked' : ''}"
          data-id="${p.id}"
          aria-label="${inWish ? 'Remove from wishlist' : 'Add to wishlist'}"
          title="${inWish ? 'Remove from wishlist' : 'Add to wishlist'}">
          ${inWish ? '♥' : '♡'}
        </button>
      </div>
      <div class="product-info">
        <p class="product-category">${p.category}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="product-price">
            ${p.original ? `<span class="original">${fmt(p.original)}</span>` : ''}
            ${fmt(p.price)}
          </span>
          <button class="add-to-cart" data-id="${p.id}" aria-label="Add ${p.name} to cart">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            Add
          </button>
        </div>
      </div>
    </article>`;
  }).join('');

  /* ── Add to Cart listeners ── */
  grid.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      addToCart(id);
      /* button feedback */
      btn.innerHTML = '✓ Added';
      btn.style.background = '#6b9e6b';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> Add`;
        btn.style.background = '';
        btn.disabled = false;
      }, 1600);
    });
  });

  /* ── Wishlist listeners ── */
  grid.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.style.color = wishlist.includes(btn.dataset.id) ? '#c84b6a' : '';
    btn.addEventListener('click', () => toggleWishlist(btn.dataset.id, btn));
  });
  /* ── Product card click → open detail (but not on buttons) ── */
  grid.querySelectorAll('.product-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      /* don't open if they clicked add-to-cart or wishlist */
      if (e.target.closest('.add-to-cart') || e.target.closest('.product-wishlist')) return;
      const product = ALL_PRODUCTS.find(p => p.id === card.dataset.id);
      if (product) openProductDetail(product);
    });
  });
}

/* ─────────────────────────────────────────
   CATEGORY TABS
───────────────────────────────────────── */
$('categoryTabs').querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $('categoryTabs').querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeCategory = tab.dataset.cat;
    searchQuery = '';
    if ($('shopSearch')) $('shopSearch').value = '';
    renderProducts();
  });
});

/* ─────────────────────────────────────────
   SEARCH BAR
───────────────────────────────────────── */
const shopSearch = $('shopSearch');
if (shopSearch) {
  let debounceTimer;
  shopSearch.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = shopSearch.value;
      renderProducts();
    }, 280);
  });
}

/* ─────────────────────────────────────────
   SORT SELECT
───────────────────────────────────────── */
const sortSelect = $('sortSelect');
if (sortSelect) {
  sortSelect.addEventListener('change', () => {
    activeSort = sortSelect.value;
    renderProducts();
  });
}

/* ─────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────── */
$('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const success = $('formSuccess');
  success.classList.add('show');
  this.reset();
  showToast("✓ Message sent! We'll be in touch soon.");
  setTimeout(() => success.classList.remove('show'), 5000);
});

/* ─────────────────────────────────────────
   SCROLL FADE-IN OBSERVER
───────────────────────────────────────── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function observeFadeEls() {
  document.querySelectorAll('.feature-item, .stat, .about-para, .contact-list li, .review-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    fadeObserver.observe(el);
  });
}

/* ─────────────────────────────────────────
   FOOTER CATEGORY LINKS — direct filter
───────────────────────────────────────── */
document.querySelectorAll('[data-filter]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const cat = link.dataset.filter;
    /* set tab active */
    $('categoryTabs').querySelectorAll('.tab').forEach(t => {
      t.classList.toggle('active', t.dataset.cat === cat);
    });
    activeCategory = cat;
    searchQuery = '';
    renderProducts();
    $('shop').scrollIntoView({ behavior: 'smooth' });
  });
});


/* ─────────────────────────────────────────
   CHECKOUT MODAL
───────────────────────────────────────── */
const checkoutModal = $('checkoutModal');
const checkoutOverlay = $('checkoutOverlay');
const checkoutBody = document.querySelector('.checkout-body');
const checkoutSuccess = $('checkoutSuccess');

/* ── State → City mapping ── */
const STATE_CITIES = {
  'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat'],
  'Bihar': ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur'],
  'Delhi': ['New Delhi', 'Dwarka', 'Saket', 'Rohini', 'Karol Bagh', 'Lajpat Nagar'],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
  'Haryana': ['Panipat', 'Karnal', 'Sonipat', 'Gurugram', 'Faridabad', 'Hisar', 'Rohtak', 'Ambala'],
  'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala', 'Solan'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubli', 'Belgaum'],
  'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri'],
  'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Ajmer', 'Kota', 'Bikaner'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
  'Uttar Pradesh': ['Lucknow', 'Noida', 'Agra', 'Varanasi', 'Kanpur', 'Ghaziabad', 'Meerut'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Rishikesh', 'Nainital'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri', 'Asansol'],
};

/* populate state dropdown */
const chkState = $('chkState');
const chkCity = $('chkCity');

Object.keys(STATE_CITIES).forEach(state => {
  const opt = document.createElement('option');
  opt.value = state;
  opt.textContent = state;
  chkState.appendChild(opt);
});

/* dynamic city population on state change */
chkState.addEventListener('change', () => {
  const cities = STATE_CITIES[chkState.value] || [];
  chkCity.innerHTML = '<option value="" disabled selected>Select City</option>';
  cities.forEach(city => {
    const opt = document.createElement('option');
    opt.value = city;
    opt.textContent = city;
    chkCity.appendChild(opt);
  });
});

function openCheckout() {
  /* close cart drawer first */
  closeCart();

  /* render order summary */
  const summaryEl = $('checkoutSummary');
  summaryEl.innerHTML = '<h3 class="checkout-section-title">Order Summary</h3>' +
    cart.map(item => `
      <div class="chk-item">
        <img class="chk-item-img" src="${item.img}" alt="${item.name}" />
        <span class="chk-item-name">${item.name}</span>
        <span class="chk-item-qty">×${item.qty}</span>
        <span class="chk-item-price">${fmt(item.price * item.qty)}</span>
      </div>
    `).join('');

  /* totals */
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 799 ? 0 : 49;
  const total = subtotal + shipping;

  $('chkSubtotal').textContent = fmt(subtotal);
  $('chkShipping').textContent = shipping === 0 ? 'Free' : fmt(shipping);
  $('chkTotal').textContent = fmt(total);

  /* reset views */
  checkoutBody.style.display = 'block';
  checkoutSuccess.style.display = 'none';
  $('checkoutForm').reset();

  /* reset city dropdown back to placeholder */
  chkCity.innerHTML = '<option value="" disabled selected>Select City</option>';

  /* clear any previous validation highlights */
  $('checkoutForm').querySelectorAll('[required]').forEach(f => {
    f.style.borderColor = '';
  });

  /* open */
  checkoutModal.classList.add('open');
  checkoutOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  checkoutModal.classList.remove('open');
  checkoutOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* Event Listeners */
$('checkoutBtn').addEventListener('click', openCheckout);
$('checkoutClose').addEventListener('click', closeCheckout);
checkoutOverlay.addEventListener('click', closeCheckout);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && checkoutModal.classList.contains('open')) closeCheckout();
});

/* Form submission */
$('checkoutForm').addEventListener('submit', function (e) {
  e.preventDefault();

  /* simple field validation */
  const required = this.querySelectorAll('[required]');
  let valid = true;
  required.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#c84b6a';
      valid = false;
    } else {
      field.style.borderColor = '';
    }
  });

  if (!valid) {
    showToast('Please fill in all required fields.', 'warn');
    return;
  }

  /* generate order id */
  const orderId = 'VC-' + Date.now().toString(36).toUpperCase();
  $('successOrderId').textContent = `Order ID: ${orderId}`;

  /* show success */
  checkoutBody.style.display = 'none';
  checkoutSuccess.style.display = 'block';

  /* clear cart */
  cart = [];
  saveCart();
  renderCart();
  showToast('🎉 Order placed successfully!');
});

/* Continue Shopping */
$('continueShopping').addEventListener('click', () => {
  closeCheckout();
  $('shop').scrollIntoView({ behavior: 'smooth' });
});

/* ─────────────────────────────────────────
   PRODUCT DETAIL MODAL
───────────────────────────────────────── */
const pdOverlay = $('pdOverlay');
const pdModal = $('pdModal');
let currentPdId = null;

function openProductDetail(product) {
  currentPdId = product.id;

  $('pdImage').src = product.img;
  $('pdImage').alt = product.name;
  $('pdCategory').textContent = product.category;
  $('pdName').textContent = product.name;
  $('pdDesc').textContent = product.desc;

  const badgeEl = $('pdBadge');
  if (product.badge) {
    badgeEl.textContent = product.badge;
    badgeEl.style.display = '';
  } else {
    badgeEl.style.display = 'none';
  }

  $('pdPrice').innerHTML = (product.original
    ? `<span class="original">${fmt(product.original)}</span>`
    : '') + fmt(product.price);

  /* render product-level reviews */
  const reviews = getProductReviews(product.id);
  $('pdReviews').innerHTML = reviews.map(r => `
    <div class="pd-review-item">
      <div class="pd-review-stars">★★★★★</div>
      <p class="pd-review-text">${r.text}</p>
      <p class="pd-review-author">— ${r.name}</p>
    </div>
  `).join('');

  /* open */
  pdOverlay.classList.add('active');
  pdModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductDetail() {
  pdOverlay.classList.remove('active');
  pdModal.classList.remove('active');
  document.body.style.overflow = '';
  currentPdId = null;
}

function initProductDetail() {
  $('pdClose').addEventListener('click', closeProductDetail);
  pdOverlay.addEventListener('click', closeProductDetail);

  /* Add to Cart from detail modal */
  $('pdAddCart').addEventListener('click', () => {
    if (!currentPdId) return;
    addToCart(currentPdId);
    const btn = $('pdAddCart');
    btn.innerHTML = '✓ Added to Cart';
    btn.style.background = '#6b9e6b';
    btn.style.borderColor = '#6b9e6b';
    setTimeout(() => {
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> Add to Cart`;
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 1600);
  });
}


/* ─────────────────────────────────────────
   INIT — must be AFTER all const declarations
 ───────────────────────────────────────── */
renderProducts();
renderCart();
observeFadeEls();
initProductDetail();

