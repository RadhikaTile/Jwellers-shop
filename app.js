/**
 * AURA & ARTISAN - Luxury Jewellery Interactive Controller
 * Benchmark references: Arika, Raviva, Chhail, Sawwaisa, Swashaa, Chahana,
 * Jewellery Khazana, Vijay Bangles
 */

// -----------------------------------------------------------------------------
// 1. GLOBAL STATE & DATA REGISTRY
// -----------------------------------------------------------------------------
const state = {
  wireframeMode: false,
  appliedCoupon: null,
  currency: 'INR',
  currencyRate: 1.0,
  currencySymbol: '₹',
  wishlist: [1, 2, 3], // Default 3 saved items
  cart: [
    {
      id: 1,
      name: 'The Meera Royal Meenakari Kadas (Pair)',
      price: 2850,
      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=300&q=80',
      variant: '2.6 Size / Peacock Blue',
      quantity: 1
    },
    {
      id: 2,
      name: 'Aura 18K Anti-Tarnish Clover Bracelet',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=300&q=80',
      variant: 'Standard 17cm / Onyx Black',
      quantity: 1
    }
  ]
};

// Full Product Database for Quick-View & Interactive Showcase
const productDatabase = {
  1: {
    id: 1,
    title: 'The Meera Royal Meenakari Kadas (Pair)',
    brand: 'Jaipur Artisanal • Vijay Bangles Specialist',
    price: 2850,
    origPrice: 3999,
    discount: '29% OFF',
    rating: 5.0,
    reviewsCount: 142,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    description: 'Directly inspired by the legendary Meera Meenakari bangles of Tripolia Bazaar, Jaipur. Hand-enameled in high-fire kiln at 800°C with vivid peacock feather motifs. Crafted with a premium brass core and precision screw-locking mechanism for effortless wearing.',
    specs: {
      'Craft Style': 'Authentic Jaipuri Meenakari (Hand-enameled)',
      'Core Metal': 'Pure Jewellers Brass with 24K Micro Gold Plating',
      'Locking System': 'Hidden Screw-pin locking for broad/slim hands',
      'Water Resistance': 'Splash-proof enamel (avoid harsh solvent immersion)',
      'Available Sizes': '2.2, 2.4, 2.6, 2.8, 2.10 (See Sizing Tool below)'
    }
  },
  2: {
    id: 2,
    title: 'Aura 18K Anti-Tarnish Clover Bracelet',
    brand: 'Demi-Fine Luxury • Chahana & Raviva Style',
    price: 1299,
    origPrice: 1899,
    discount: '31% OFF',
    rating: 4.8,
    reviewsCount: 318,
    badge: '100% Waterproof',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80',
    description: 'An enduring icon of grace and luck. Features symmetrical four-leaf clover motifs set with polished black onyx / mother-of-pearl. Bonded with 18K titanium PVD gold that guarantees zero tarnishing through showers, workouts, and ocean swims.',
    specs: {
      'Core Material': 'Surgical Grade 316L Stainless Steel',
      'Plating': '18K Physical Vapor Deposition (PVD) Gold',
      'Tarnish Resistance': 'Lifetime Color Guarantee (100% Waterproof)',
      'Hypoallergenic': 'Zero Nickel, Zero Lead (Safe for sensitive skin)',
      'Length': '16.5 cm + 3.5 cm extender chain'
    }
  },
  3: {
    id: 3,
    title: 'Padmavati Pachi Kundan & Emerald Choker Set',
    brand: 'Royal Heritage • Sawwaisa & Khazana Style',
    price: 4950,
    origPrice: 7200,
    discount: '31% OFF',
    rating: 5.0,
    reviewsCount: 95,
    badge: 'Bridal Choice',
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80',
    description: 'Heirloom Rajputana bridal choker set featuring open-back Pachi Kundan foil setting, natural hydro-emerald tumblers, and hand-strung cultured Basra pearl clusters. Complete with matching statement earrings and maang tikka.',
    specs: {
      'Setting': 'Pachi Kundan with 24K pure gold leaf foil lining',
      'Stones': 'Lab-certified uncut Polki stones & Hydro Emeralds',
      'Package Includes': '1 Royal Choker + 2 Matching Chandbalis + 1 Maang Tikka',
      'Attachment': 'Adjustable royal zari dori rope with tassel pull',
      'Artisan Heritage': 'Handcrafted by 4th generation Jaipur karigars'
    }
  },
  4: {
    id: 4,
    title: 'Feeling Chhail Mirror-Work Ghungroo Chandbalis',
    brand: 'Tribal Bohemian • Chhail Style',
    price: 1450,
    origPrice: 1999,
    discount: '27% OFF',
    rating: 4.7,
    reviewsCount: 87,
    badge: 'Handcrafted',
    image: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?auto=format&fit=crop&w=800&q=80',
    description: 'Inspired by the vibrant festival spirit of Rajasthan. Featuring intricate floral stampings, hand-set micro mirrors, and delicate ghungroos that produce a subtle melodious chime.',
    specs: {
      'Material': 'Hallmarked 925 German Silver with Antique Patina',
      'Weight': '24 grams per pair (Feather-balanced hollow core)',
      'Closure': 'Hypoallergenic push-back with comfort cushion',
      'Styling': 'Pairs effortlessly with both festive lehengas and linen shirts'
    }
  },
  5: {
    id: 5,
    title: 'Parisian Croissant Dome Ring (Tarnish Free)',
    brand: 'Everyday Minimalist • Arika & Raviva Style',
    price: 899,
    origPrice: 1299,
    discount: '30% OFF',
    rating: 4.9,
    reviewsCount: 215,
    badge: 'Sweatproof',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80',
    description: 'Sculptural ribbed dome ring reminiscent of French bakery croissants. Lightweight interior comfort-fit band designed to be stacked or worn as a solo statement piece.',
    specs: {
      'Plating': '10x Thick Vacuum 18K Gold PVD',
      'Core': 'Recycled Stainless Steel (Hypoallergenic)',
      'Waterproof Rating': 'Shower, lotion, and perfume resistant',
      'Sizing': 'Available in US Sizes 5, 6, 7, 8, 9'
    }
  },
  6: {
    id: 6,
    title: 'Sovereign 6mm Cuban Chain & Kada Set',
    brand: 'Modern Men’s Luxe • Swashaa Style',
    price: 1699,
    origPrice: 2499,
    discount: '32% OFF',
    rating: 4.8,
    reviewsCount: 110,
    badge: 'Men’s Classic',
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80',
    description: 'Engineered for the discerning modern gentleman. Precision diamond-cut beveled Cuban links paired with an open-ended brushed steel wrist kada. Resists gym sweat, chlorine, and daily wear.',
    specs: {
      'Chain Spec': '6mm width, 22 inches length with lobster clasp',
      'Kada Spec': 'Flexible open-cuff ergonomic fit (fits wrists 6.5" to 8")',
      'Finish': 'Dual finish: Brushed matte with polished beveled edges',
      'Durability': 'Guaranteed never to rust, turn black, or fade'
    }
  }
};

// -----------------------------------------------------------------------------
// 2. DOM INITIALIZATION
// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initHeaderButtons();
  initHeroSlider();
  initCollectionsSlider();
  initSearch();
  initProductFilter();
  initHotspots();
  renderCart();
  renderWishlist();
  updateHeaderBadges();
  initCurrencySelector();
  initScrollReveal();
  initScrollHeader();
});

// -----------------------------------------------------------------------------
// 3. HEADER BUTTONS WIRING (SEARCH, WISHLIST, CART)
// -----------------------------------------------------------------------------
function initHeaderButtons() {
  // Cart triggers
  document.querySelectorAll('#cartTriggerBtn, .cart-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  });

  // Wishlist triggers
  document.querySelectorAll('#wishlistBtn, .wishlist-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openWishlist();
    });
  });

  // Search triggers
  document.querySelectorAll('#searchTriggerBtn, .search-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openSearch();
    });
  });

  // Mobile & Tablet Drawer Navigation Controller
  initMobileDrawer();
}

function initMobileDrawer() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const desktopNav = document.getElementById('desktopNav');
  if (!desktopNav) return;

  // Clean up any previously injected drawer elements if present
  const existingHeader = desktopNav.querySelector('.drawer-header');
  if (existingHeader) existingHeader.remove();
  const existingFooter = desktopNav.querySelector('.drawer-footer');
  if (existingFooter) existingFooter.remove();

  // Ensure backdrop element exists
  let backdrop = document.getElementById('mobileNavBackdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'mobileNavBackdrop';
    backdrop.className = 'mobile-nav-backdrop';
    document.body.appendChild(backdrop);
  }

  function openMobileNav() {
    desktopNav.classList.add('mobile-open');
    if (backdrop) backdrop.classList.add('active');
    document.body.classList.add('drawer-open');
  }

  function closeMobileNav() {
    desktopNav.classList.remove('mobile-open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.classList.remove('drawer-open');
  }

  if (mobileBtn) {
    mobileBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (desktopNav.classList.contains('mobile-open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  backdrop.addEventListener('click', closeMobileNav);

  // Close on dedicated drawer close button
  const drawerCloseBtn = document.getElementById('mobileDrawerClose');
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileNav();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && desktopNav.classList.contains('mobile-open')) {
      closeMobileNav();
    }
  });

  // Close drawer when any nav-link is clicked
  desktopNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1400) {
        closeMobileNav();
      }
    });
  });
}

// -----------------------------------------------------------------------------
// 4. LUXURY SEARCH MODAL OVERLAY
// -----------------------------------------------------------------------------
function openSearch() {
  const modal = document.getElementById('luxurySearchModal');
  const backdrop = document.getElementById('searchModalBackdrop');
  const input = document.getElementById('luxurySearchInput');
  if (modal && backdrop) {
    modal.classList.add('active');
    backdrop.classList.add('active');
    setTimeout(() => { if (input) input.focus(); }, 120);
  }
}

function closeSearch() {
  const modal = document.getElementById('luxurySearchModal');
  const backdrop = document.getElementById('searchModalBackdrop');
  if (modal && backdrop) {
    modal.classList.remove('active');
    backdrop.classList.remove('active');
  }
}

function initSearch() {
  const searchInput = document.getElementById('luxurySearchInput');
  const resultsContainer = document.getElementById('searchResultsContainer');

  if (searchInput && resultsContainer) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        resultsContainer.innerHTML = `
          <div class="search-empty-prompt">
            <span>Type to search our Jaipur heritage & demi-fine collections...</span>
          </div>
        `;
        return;
      }

      const matches = Object.values(productDatabase).filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        resultsContainer.innerHTML = `
          <div class="search-empty-prompt">
            <i class="ri-search-eye-line" style="font-size: 2rem; color: #c5a880; display: block; margin-bottom: 8px;"></i>
            <span>No pieces found matching "<strong>${q}</strong>". Try searching for <em>Meenakari</em>, <em>Clover</em>, or <em>Kundan</em>.</span>
          </div>
        `;
        return;
      }

      resultsContainer.innerHTML = matches.map(p => `
        <div class="search-result-row">
          <img src="${p.image}" alt="${p.title}">
          <div class="sr-info">
            <span class="sr-brand">${p.brand}</span>
            <h4 class="sr-title"><a href="product-detail.html">${p.title}</a></h4>
            <div class="sr-price">₹${p.price.toLocaleString()} <span class="sr-orig">₹${p.origPrice.toLocaleString()}</span></div>
          </div>
          <button class="btn btn-gold btn-sm" onclick="addToCart(${p.id}, '${p.title}', ${p.price}, '${p.image}', 'Standard Selection'); closeSearch();">
            Add to Bag
          </button>
        </div>
      `).join('');
    });
  }
}

function quickSearch(tag) {
  const input = document.getElementById('luxurySearchInput');
  if (input) {
    input.value = tag;
    input.dispatchEvent(new Event('input'));
  }
}

// -----------------------------------------------------------------------------
// 5. WISHLIST SLIDE-OVER DRAWER ENGINE
// -----------------------------------------------------------------------------
function openWishlist() {
  const drawer = document.getElementById('wishlistDrawer');
  const overlay = document.getElementById('wishlistOverlay');
  renderWishlist();
  if (drawer && overlay) {
    drawer.classList.add('active');
    overlay.classList.add('active');
  }
}

function closeWishlist() {
  const drawer = document.getElementById('wishlistDrawer');
  const overlay = document.getElementById('wishlistOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
  }
}

function renderWishlist() {
  const container = document.getElementById('wishlistItemsContainer');
  const countBadge = document.getElementById('wishlistDrawerCount');
  updateHeaderBadges();

  if (countBadge) countBadge.textContent = `${state.wishlist.length} Saved`;
  if (!container) return;

  if (state.wishlist.length === 0) {
    container.innerHTML = `
      <div class="drawer-empty-state">
        <i class="ri-heart-3-line empty-icon"></i>
        <h4>Your Wishlist is Empty</h4>
        <p>Save pieces you love to track their availability or move them to your bag later.</p>
        <button class="btn btn-gold" onclick="closeWishlist()">Explore Collections</button>
      </div>
    `;
    return;
  }

  container.innerHTML = state.wishlist.map(id => {
    const p = productDatabase[id];
    if (!p) return '';
    return `
      <div class="wishlist-item-row">
        <img src="${p.image}" alt="${p.title}" class="wishlist-item-img">
        <div class="wishlist-item-info">
          <span class="wi-brand">${p.brand}</span>
          <h4 class="wi-title">${p.title}</h4>
          <div class="wi-price">₹${p.price.toLocaleString()}</div>
          <div class="wi-actions">
            <button class="btn btn-gold btn-sm" onclick="addToCart(${p.id}, '${p.title}', ${p.price}, '${p.image}', 'Standard Selection'); removeFromWishlist(${p.id});">
              <i class="ri-shopping-bag-line"></i> Move to Bag
            </button>
            <button class="btn-remove-wish" onclick="removeFromWishlist(${p.id})" title="Remove"><i class="ri-delete-bin-line"></i></button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function removeFromWishlist(id) {
  const idx = state.wishlist.indexOf(id);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    renderWishlist();
    updateHeaderBadges();
    showToast('Removed piece from your Wishlist.');
  }
}

function addAllWishlistToBag() {
  if (state.wishlist.length === 0) return;
  state.wishlist.forEach(id => {
    const p = productDatabase[id];
    if (p) {
      addToCart(p.id, p.title, p.price, p.image, 'Standard Selection', false);
    }
  });
  state.wishlist = [];
  renderWishlist();
  closeWishlist();
  openCart();
  showToast('All saved pieces moved to your Shopping Bag!');
}

function toggleWishlist(btn, id) {
  const index = state.wishlist.indexOf(id);
  if (index > -1) {
    state.wishlist.splice(index, 1);
    if (btn) {
      btn.classList.remove('active');
      btn.innerHTML = '<i class="ri-heart-line"></i>';
    }
    showToast('Removed from your wishlist');
  } else {
    state.wishlist.push(id);
    if (btn) {
      btn.classList.add('active');
      btn.innerHTML = '<i class="ri-heart-fill" style="color: #9f1239;"></i>';
    }
    showToast('Saved to your wishlist');
  }
  updateHeaderBadges();
  renderWishlist();
}

function updateHeaderBadges() {
  const wishCount = state.wishlist.length;
  const cartCount = state.cart.reduce((sum, i) => sum + i.quantity, 0);

  document.querySelectorAll('.wishlist-count, .mob-wish-count').forEach(el => {
    el.textContent = wishCount;
    el.style.display = wishCount > 0 ? 'flex' : 'none';
  });

  document.querySelectorAll('.cart-count, #cartCountBadge, .mob-cart-count').forEach(el => {
    el.textContent = cartCount;
    el.style.display = cartCount > 0 ? 'flex' : 'none';
  });
}

// -----------------------------------------------------------------------------
// 6. HERO SLIDER ENGINE WITH 2-WAY THUMBNAIL SYNCHRONIZATION
// -----------------------------------------------------------------------------
let currentHeroSlide = 0;
let heroInterval = null;

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const thumbs = document.querySelectorAll('.banner-thumb');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');

  if (!slides.length) return;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    thumbs.forEach((t, i) => t.classList.toggle('active', i === index));
    currentHeroSlide = index;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const idx = (currentHeroSlide - 1 + slides.length) % slides.length;
      showSlide(idx);
      resetHeroAutoTimer();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const idx = (currentHeroSlide + 1) % slides.length;
      showSlide(idx);
      resetHeroAutoTimer();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      showSlide(idx);
      resetHeroAutoTimer();
    });
  });

  heroInterval = setInterval(() => {
    const idx = (currentHeroSlide + 1) % slides.length;
    showSlide(idx);
  }, 6000);
}

function resetHeroAutoTimer() {
  clearInterval(heroInterval);
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const thumbs = document.querySelectorAll('.banner-thumb');
  
  heroInterval = setInterval(() => {
    const idx = (currentHeroSlide + 1) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    thumbs.forEach((t, i) => t.classList.toggle('active', i === idx));
    currentHeroSlide = idx;
  }, 6000);
}

function jumpToHeroSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const thumbs = document.querySelectorAll('.banner-thumb');

  if (!slides.length) return;

  slides.forEach((s, i) => s.classList.toggle('active', i === index));
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
  thumbs.forEach((t, i) => t.classList.toggle('active', i === index));

  currentHeroSlide = index;
  resetHeroAutoTimer();
}

// -----------------------------------------------------------------------------
// 6B. SIGNATURE COLLECTIONS LUXURY HORIZONTAL SLIDER
// -----------------------------------------------------------------------------
function initCollectionsSlider() {
  const track = document.getElementById('collectionsSliderTrack');
  const prevBtn = document.getElementById('collPrevBtn');
  const nextBtn = document.getElementById('collNextBtn');
  const currentSlideEl = document.getElementById('collCurrentSlide');
  const totalSlidesEl = document.getElementById('collTotalSlides');
  const progressBar = document.getElementById('collProgressBar');

  if (!track || !prevBtn || !nextBtn) return;

  const tiles = track.querySelectorAll('.collection-tile');
  if (!tiles.length) return;

  if (totalSlidesEl) {
    totalSlidesEl.textContent = tiles.length < 10 ? `0${tiles.length}` : `${tiles.length}`;
  }

  function getScrollStep() {
    const tile = tiles[0];
    const gap = window.innerWidth <= 640 ? 16 : 24;
    return tile ? (tile.offsetWidth + gap) : 380;
  }

  function updateSliderState() {
    const scrollLeft = track.scrollLeft;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) : 0;

    // Progress bar width (between 15% and 100%)
    if (progressBar) {
      const barWidth = 15 + (progress * 85);
      progressBar.style.width = `${barWidth}%`;
    }

    // Active slide counter based on scroll position
    const step = getScrollStep();
    const activeIndex = Math.min(Math.round(scrollLeft / step) + 1, tiles.length);
    if (currentSlideEl) {
      currentSlideEl.textContent = activeIndex < 10 ? `0${activeIndex}` : `${activeIndex}`;
    }

    // Button states
    prevBtn.disabled = scrollLeft <= 8;
    nextBtn.disabled = scrollLeft >= (maxScroll - 8);
  }

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
  });

  // Mouse drag functionality for desktop
  let isDown = false;
  let startX;
  let scrollLeftStart;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('grabbing');
    startX = e.pageX - track.offsetLeft;
    scrollLeftStart = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.classList.remove('grabbing');
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('grabbing');
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeftStart - walk;
  });

  track.addEventListener('scroll', updateSliderState, { passive: true });
  window.addEventListener('resize', updateSliderState);

  // Initial update
  updateSliderState();
}

// -----------------------------------------------------------------------------
// 7. PRODUCT CATEGORY FILTER TABS
// -----------------------------------------------------------------------------
function initProductFilter() {
  const tabBtns = document.querySelectorAll('#productFilterTabs .tab-btn');
  const cards = document.querySelectorAll('.product-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// -----------------------------------------------------------------------------
// 8. INTERACTIVE "SHOP THE LOOK" HOTSPOTS
// -----------------------------------------------------------------------------
function initHotspots() {
  const pins = document.querySelectorAll('.hotspot-pin');
  pins.forEach(pin => {
    pin.addEventListener('click', () => {
      const spotId = pin.dataset.spot;
      const targetItem = document.getElementById(`spot-${spotId}`);
      if (targetItem) {
        document.querySelectorAll('.bundle-item').forEach(b => b.classList.remove('pulse-item'));
        targetItem.classList.add('pulse-item');
        setTimeout(() => targetItem.classList.remove('pulse-item'), 1200);
        targetItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
}

function recalculateBundle() {
  let subtotal = 0;
  const checkboxes = document.querySelectorAll('.bundle-checkbox');
  
  checkboxes.forEach(cb => {
    const parent = cb.closest('.bundle-item');
    if (cb.checked) {
      subtotal += parseFloat(cb.dataset.price);
      parent.classList.add('active');
    } else {
      parent.classList.remove('active');
    }
  });

  const discount = Math.round(subtotal * 0.15);
  const total = subtotal - discount;

  const savEl = document.getElementById('bundleSavings');
  const totEl = document.getElementById('bundleTotal');
  if (savEl) savEl.textContent = `-₹${discount.toLocaleString()}`;
  if (totEl) totEl.textContent = `₹${total.toLocaleString()}`;
}

function addBundleToCart() {
  const checkboxes = document.querySelectorAll('.bundle-checkbox:checked');
  if (checkboxes.length === 0) {
    showToast('Please select at least one item from the curated look.');
    return;
  }

  checkboxes.forEach(cb => {
    const parent = cb.closest('.bundle-item');
    const name = parent.querySelector('.b-item-name').textContent;
    const price = parseFloat(cb.dataset.price);
    const img = parent.querySelector('img').src;
    const spec = parent.querySelector('.b-item-spec').textContent;

    addToCart(Date.now() + Math.random(), name, price, img, spec, false);
  });

  openCart();
  showToast('Added complete curated look to your shopping bag!');
}

// -----------------------------------------------------------------------------
// 9. BANGLE SIZING CALCULATOR
// -----------------------------------------------------------------------------
function selectBangleSize(sizeName, diameter, fitNote) {
  document.querySelectorAll('.size-options-grid .size-btn').forEach(btn => btn.classList.remove('active'));
  if (window.event && window.event.currentTarget) {
    window.event.currentTarget.classList.add('active');
  }

  const sLbl = document.getElementById('selectedSizeLabel');
  const dLbl = document.getElementById('selectedDiameterLabel');
  const fLbl = document.getElementById('selectedFitLabel');

  if (sLbl) sLbl.textContent = sizeName;
  if (dLbl) dLbl.textContent = diameter;
  if (fLbl) fLbl.textContent = fitNote;
  showToast(`Bangle size updated to ${sizeName} (${diameter})`);
}

// -----------------------------------------------------------------------------
// 10. SHOPPING BAG / CART DRAWER
// -----------------------------------------------------------------------------
function openCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  renderCart();
  if (drawer && overlay) {
    drawer.classList.add('active');
    overlay.classList.add('active');
  }
}

function closeCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
  }
}

function addToCart(id, name, price, image, variant, shouldOpenCart = true) {
  const existing = state.cart.find(item => item.name === name && item.variant === variant);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      id: id,
      name: name,
      price: price,
      image: image,
      variant: variant,
      quantity: 1
    });
  }

  renderCart();
  updateHeaderBadges();
  if (shouldOpenCart) {
    openCart();
    showToast(`Added "${name}" to your bag`);
  }
}

function updateCartQty(index, delta) {
  state.cart[index].quantity += delta;
  if (state.cart[index].quantity <= 0) {
    state.cart.splice(index, 1);
  }
  renderCart();
  updateHeaderBadges();
}

function removeCartItem(index) {
  state.cart.splice(index, 1);
  renderCart();
  updateHeaderBadges();
  showToast('Item removed from bag');
}

function applyCoupon() {
  const input = document.getElementById('couponCodeInput');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (code === 'ROYAL10') {
    state.appliedCoupon = { code: 'ROYAL10', rate: 0.10 };
    showToast('Promo Code ROYAL10 applied (10% Privilege Discount)!');
    renderCart();
  } else {
    showToast('Invalid privilege code. Try ROYAL10');
  }
}

function renderCart() {
  const container = document.getElementById('cartItemsContainer');
  const drawerCount = document.getElementById('drawerItemCount');
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  if (drawerCount) drawerCount.textContent = `${totalItems} Items`;
  updateHeaderBadges();

  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="drawer-empty-state">
        <i class="ri-shopping-bag-3-line empty-icon"></i>
        <h4>Your Shopping Bag is Empty</h4>
        <p>Explore our signature Meenakari bangles or anti-tarnish everyday collection.</p>
        <button class="btn btn-gold" onclick="closeCart()">Continue Shopping</button>
      </div>
    `;
    const sSub = document.getElementById('cartSubtotal');
    const sTot = document.getElementById('cartGrandTotal');
    const fill = document.getElementById('shippingProgressFill');
    const goal = document.getElementById('shippingGoalText');
    if (sSub) sSub.textContent = '₹0';
    if (sTot) sTot.textContent = '₹0';
    if (fill) fill.style.width = '0%';
    if (goal) goal.innerHTML = 'Add items worth ₹1,499 for <strong>Free Express Shipping</strong>';
    return;
  }

  container.innerHTML = state.cart.map((item, index) => `
    <div class="cart-item-row">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-variant">${item.variant}</div>
        <div class="cart-item-price-row">
          <div class="cart-qty-ctrl">
            <button class="qty-btn" onclick="updateCartQty(${index}, -1)">-</button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQty(${index}, 1)">+</button>
          </div>
          <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString()}</div>
          <button class="cart-item-remove" onclick="removeCartItem(${index})" title="Remove item"><i class="ri-delete-bin-line"></i></button>
        </div>
      </div>
    </div>
  `).join('');

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = 0;

  const discRow = document.getElementById('discountRow');
  const cartDisc = document.getElementById('cartDiscount');
  if (state.appliedCoupon) {
    discount = Math.round(subtotal * state.appliedCoupon.rate);
    if (discRow) discRow.style.display = 'flex';
    if (cartDisc) cartDisc.textContent = `-₹${discount.toLocaleString()}`;
  } else {
    if (discRow) discRow.style.display = 'none';
  }

  const grandTotal = subtotal - discount;

  const sSub = document.getElementById('cartSubtotal');
  const sTot = document.getElementById('cartGrandTotal');
  if (sSub) sSub.textContent = `₹${subtotal.toLocaleString()}`;
  if (sTot) sTot.textContent = `₹${grandTotal.toLocaleString()}`;

  const freeThreshold = 1499;
  const progressPercent = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
  const fill = document.getElementById('shippingProgressFill');
  const goalText = document.getElementById('shippingGoalText');
  const shipCost = document.getElementById('shippingCost');

  if (fill) fill.style.width = `${progressPercent}%`;

  if (subtotal >= freeThreshold) {
    if (goalText) goalText.innerHTML = '<i class="ri-checkbox-circle-fill text-green"></i> <strong>Unlocked FREE Insured Express Shipping!</strong>';
    if (shipCost) shipCost.textContent = 'FREE';
  } else {
    const diff = freeThreshold - subtotal;
    if (goalText) goalText.innerHTML = `Add ₹${diff.toLocaleString()} more for <strong>FREE Insured Shipping!</strong>`;
    if (shipCost) shipCost.textContent = '₹99';
  }
}

function proceedToCheckout() {
  if (state.cart.length === 0) {
    showToast('Your shopping bag is empty.');
    return;
  }
  showToast('Redirecting to 256-bit Secure Checkout gateway...');
  setTimeout(() => {
    alert(`Order Summary Prototype:\nTotal Amount: ${document.getElementById('cartGrandTotal').textContent}\nItems: ${state.cart.length}\nPayment: UPI / Netbanking / Credit Card / Cash On Delivery\n\nThank you for choosing AURA & ARTISAN.`);
  }, 600);
}

// -----------------------------------------------------------------------------
// 11. QUICK VIEW MODAL
// -----------------------------------------------------------------------------
function openQuickView(id) {
  const p = productDatabase[id];
  if (!p) return;

  const content = document.getElementById('qvModalContent');
  if (!content) return;

  content.innerHTML = `
    <div class="qv-grid">
      <div class="qv-media">
        <img src="${p.image}" alt="${p.title}">
      </div>
      <div class="qv-info">
        <span class="qv-badge">${p.brand}</span>
        <h2 class="qv-title">${p.title}</h2>
        <div class="qv-rating">
          <div class="stars">
            <i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i>
          </div>
          <span class="rating-count">(${p.reviewsCount} verified reviews)</span>
        </div>
        <div class="qv-price-box">
          <span class="qv-price-curr">₹${p.price.toLocaleString()}</span>
          <span class="qv-price-orig">₹${p.origPrice.toLocaleString()}</span>
          <span class="discount-pill">${p.discount}</span>
        </div>
        <p style="font-size: 0.85rem; color: #6b645c; margin-bottom: 16px; line-height: 1.5;">${p.description}</p>
        
        <div class="qv-specs-box">
          ${Object.entries(p.specs).map(([key, val]) => `
            <div class="qv-spec-line">
              <strong>${key}:</strong>
              <span>${val}</span>
            </div>
          `).join('')}
        </div>

        <div class="qv-actions-row">
          <button class="btn btn-gold btn-block" onclick="addToCart(${p.id}, '${p.title}', ${p.price}, '${p.image}', 'Standard Selection'); closeQuickView();">
            <i class="ri-shopping-bag-line"></i> Add To Bag
          </button>
          <button class="btn btn-outline-white" style="color: #23201e; border-color: #e7dfd5;" onclick="toggleWishlist(this, ${p.id})">
            <i class="ri-heart-line"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('quickViewModal').classList.add('active');
  document.getElementById('quickViewBackdrop').classList.add('active');
}

function closeQuickView() {
  const modal = document.getElementById('quickViewModal');
  const backdrop = document.getElementById('quickViewBackdrop');
  if (modal && backdrop) {
    modal.classList.remove('active');
    backdrop.classList.remove('active');
  }
}

// -----------------------------------------------------------------------------
// 12. CURRENCY SELECTOR
// -----------------------------------------------------------------------------
function initCurrencySelector() {
  const select = document.getElementById('currencySelect');
  if (!select) return;

  const rates = {
    INR: { rate: 1.0, symbol: '₹' },
    USD: { rate: 0.012, symbol: '$' },
    AUD: { rate: 0.019, symbol: 'A$' },
    GBP: { rate: 0.0095, symbol: '£' },
    EUR: { rate: 0.011, symbol: '€' }
  };

  select.addEventListener('change', (e) => {
    const curr = e.target.value;
    state.currency = curr;
    state.currencyRate = rates[curr].rate;
    state.currencySymbol = rates[curr].symbol;
    showToast(`Currency updated to ${curr} (${rates[curr].symbol})`);
  });
}

// -----------------------------------------------------------------------------
// 13. TOAST NOTIFICATION UTILITY
// -----------------------------------------------------------------------------
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('active');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('active');
  }, 3200);
}

// -----------------------------------------------------------------------------
// 14. NEWSLETTER HANDLER
// -----------------------------------------------------------------------------
function handleNewsletterSubmit(e) {
  e.preventDefault();
  showToast(`Welcome to the Maison Circle! Use privilege code ROYAL10 for 10% off.`);
  e.target.reset();
}

// -----------------------------------------------------------------------------
// 15. CATALOG SORT & FILTER HELPERS
// -----------------------------------------------------------------------------
function sortCatalog(sortVal) {
  const grid = document.getElementById('catalogGrid');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.product-card'));
  
  if (sortVal === 'price-low') {
    cards.sort((a, b) => {
      const pa = parseInt(a.querySelector('.price-current').textContent.replace(/[^\d]/g, ''), 10);
      const pb = parseInt(b.querySelector('.price-current').textContent.replace(/[^\d]/g, ''), 10);
      return pa - pb;
    });
  } else if (sortVal === 'price-high') {
    cards.sort((a, b) => {
      const pa = parseInt(a.querySelector('.price-current').textContent.replace(/[^\d]/g, ''), 10);
      const pb = parseInt(b.querySelector('.price-current').textContent.replace(/[^\d]/g, ''), 10);
      return pb - pa;
    });
  }

  cards.forEach(card => grid.appendChild(card));
  showToast(`Catalog sorted by ${sortVal}`);
}

function filterCategory(cat) {
  const cards = document.querySelectorAll('.product-card');
  let count = 0;
  cards.forEach(card => {
    if (cat === 'all' || card.dataset.category === cat) {
      card.style.display = 'flex';
      count++;
    } else {
      card.style.display = 'none';
    }
  });

  // Sync sidebar checkboxes
  const checkboxes = document.querySelectorAll('.catalog-sidebar .filter-checkbox input');
  checkboxes.forEach(cb => {
    const onchangeAttr = cb.getAttribute('onchange') || '';
    if (onchangeAttr.includes(`'${cat}'`)) {
      cb.checked = true;
    } else if (cat !== 'all') {
      cb.checked = false;
    }
  });

  const countEl = document.querySelector('.item-count-text strong');
  if (countEl) {
    countEl.textContent = `${count} Designs`;
  }

  const categoryNames = {
    'all': 'All Collections',
    'meenakari': 'Vijay Meenakari Bangles',
    'kundan': 'Sawwaisa Pachi Kundan',
    'anti-tarnish': '18K Waterproof Gold',
    'oxidized': 'Chhail Oxidized Silver',
    'men': "Swashaa Men's Luxe",
    'pearls': 'Nazaakat Basra Pearls',
    'temple': 'South Indian Temple & Kemp',
    'diamonds': 'Solitaire Lab Diamonds',
    'talismans': 'Noor Evil Eye Talismans',
    'bangles': 'Imperial Bridal Chuda'
  };

  showToast(`Showing: ${categoryNames[cat] || cat}`);
}

// Check URL search parameters on catalog page load
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  if (catParam) {
    setTimeout(() => {
      filterCategory(catParam);
    }, 150);
  }
});

// =============================================================================
// 16. INTERACTIVE 3D ANIMATION ENGINE (Three.js WebGL & 3D Parallax Tilt)
// =============================================================================

let threeScene, threeCamera, threeRenderer, jewelGroup, gemstoneMesh, ringBandMesh, sparkleLight;
let is3dAutoRotating = true;
let is3dSparkleActive = true;
let is3dDragging = false;
let previousPointerPosition = { x: 0, y: 0 };
let currentGemColor = 0xffffff;
let currentMetalColor = 0xe5c158;

const bespokeRingConfig = {
  gemstone: 'D-Flawless White Diamond',
  gemColor: '#ffffff',
  metal: '18K Royal Yellow Gold',
  metalColor: '#e5c158',
  carat: '2.50 Carat Round Ideal Cut',
  basePrice: 34500
};

/**
 * Initialize WebGL 3D Jewel Atelier
 */
function init3dJewelAtelier() {
  const container = document.getElementById('jewel3dContainer');
  const canvas = document.getElementById('jewel3dCanvas');
  if (!container || !canvas) return;

  // Check if Three.js is loaded
  if (typeof THREE === 'undefined') {
    init3dCanvasFallback(container, canvas);
    return;
  }

  const width = container.clientWidth || 600;
  const height = container.clientHeight || 520;

  // 1. Scene, Camera, Renderer
  threeScene = new THREE.Scene();
  threeCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  threeCamera.position.set(0, 1.2, 7.5);

  threeRenderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  threeRenderer.setSize(width, height);
  threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  threeRenderer.toneMapping = THREE.ACESFilmicToneMapping;
  threeRenderer.toneMappingExposure = 1.2;

  // 2. Lighting Setup (Simulating High-Jewelry Spotlights & Caustics)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  threeScene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xfff5e6, 1.6);
  mainLight.position.set(5, 10, 7);
  threeScene.add(mainLight);

  const rimLight = new THREE.DirectionalLight(0xc5a880, 1.2);
  rimLight.position.set(-6, -4, -5);
  threeScene.add(rimLight);

  sparkleLight = new THREE.PointLight(0xffffff, 2.2, 18);
  sparkleLight.position.set(2, 3, 4);
  threeScene.add(sparkleLight);

  // 3. Jewelry Assembly (3D Ring Band + Solitaire Diamond)
  jewelGroup = new THREE.Group();

  // A. Faceted 3D Brilliant-Cut Diamond Geometry
  // Top Crown (Truncated Cone) + Pavilion (Inverted Cone)
  const gemGeometry = new THREE.CylinderGeometry(1.5, 2.3, 0.9, 16);
  const pavilionGeometry = new THREE.ConeGeometry(2.3, 2.0, 16);
  pavilionGeometry.rotateX(Math.PI);
  pavilionGeometry.translate(0, -1.0, 0);

  // Combine into a brilliant solitaire
  const diamondGeo = new THREE.IcosahedronGeometry(2.0, 1);
  diamondGeo.computeVertexNormals();

  const diamondMaterial = new THREE.MeshStandardMaterial({
    color: currentGemColor,
    metalness: 0.15,
    roughness: 0.05,
    flatShading: true, // Creates brilliant geometric jewel facets!
    transparent: true,
    opacity: 0.94
  });

  gemstoneMesh = new THREE.Mesh(diamondGeo, diamondMaterial);
  gemstoneMesh.position.set(0, 1.4, 0);
  gemstoneMesh.scale.set(1.0, 1.1, 1.0);
  jewelGroup.add(gemstoneMesh);

  // B. 18K Gold Setting Prongs (6 Crown Claws)
  const prongGeo = new THREE.CylinderGeometry(0.08, 0.12, 1.8, 8);
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: currentMetalColor,
    metalness: 0.88,
    roughness: 0.18
  });

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const prong = new THREE.Mesh(prongGeo, goldMaterial);
    prong.position.set(Math.cos(angle) * 1.55, 1.1, Math.sin(angle) * 1.55);
    prong.rotation.z = -Math.cos(angle) * 0.18;
    prong.rotation.x = Math.sin(angle) * 0.18;
    jewelGroup.add(prong);
  }

  // C. 18K Gold Ring Band (Torus Geometry)
  const bandGeo = new THREE.TorusGeometry(2.0, 0.32, 16, 64);
  bandGeo.rotateX(Math.PI / 2);
  ringBandMesh = new THREE.Mesh(bandGeo, goldMaterial);
  ringBandMesh.position.set(0, -0.6, 0);
  jewelGroup.add(ringBandMesh);

  // Initial tilt for regal perspective
  jewelGroup.rotation.x = 0.35;
  jewelGroup.rotation.y = -0.4;
  threeScene.add(jewelGroup);

  // 4. Ambient 3D Gold Dust Particles
  const particleCount = 65;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 12;
    particlePositions[i + 1] = (Math.random() - 0.5) * 10;
    particlePositions[i + 2] = (Math.random() - 0.5) * 8;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0xe5c158,
    size: 0.12,
    transparent: true,
    opacity: 0.65
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  threeScene.add(particles);

  // 5. Interactive Pointer Drag & Touch Handling
  container.addEventListener('pointerdown', (e) => {
    is3dDragging = true;
    previousPointerPosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('pointermove', (e) => {
    if (!is3dDragging || !jewelGroup) return;
    const deltaX = e.clientX - previousPointerPosition.x;
    const deltaY = e.clientY - previousPointerPosition.y;

    jewelGroup.rotation.y += deltaX * 0.009;
    jewelGroup.rotation.x += deltaY * 0.009;

    previousPointerPosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('pointerup', () => {
    is3dDragging = false;
  });

  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    threeCamera.position.z = Math.max(4.5, Math.min(10.5, threeCamera.position.z + e.deltaY * 0.005));
  }, { passive: false });

  // 6. Animation Loop (60 FPS Smooth Render)
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    if (is3dAutoRotating && !is3dDragging && jewelGroup) {
      jewelGroup.rotation.y += 0.007;
    }

    if (is3dSparkleActive && sparkleLight) {
      sparkleLight.position.x = Math.sin(elapsedTime * 1.5) * 3.5;
      sparkleLight.position.z = Math.cos(elapsedTime * 1.5) * 3.5 + 2;
      sparkleLight.position.y = Math.sin(elapsedTime * 2.2) * 1.2 + 2;
    }

    particles.rotation.y = elapsedTime * 0.02;
    threeRenderer.render(threeScene, threeCamera);
  }
  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    if (!container || !threeCamera || !threeRenderer) return;
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    threeCamera.aspect = newWidth / newHeight;
    threeCamera.updateProjectionMatrix();
    threeRenderer.setSize(newWidth, newHeight);
  });
}

/**
 * Fallback Canvas 3D Engine (Pure 2D/3D Math if Three.js is blocked)
 */
function init3dCanvasFallback(container, canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = container.clientWidth || 600;
  canvas.height = container.clientHeight || 520;

  let angleY = 0;
  let angleX = 0.35;

  function drawFacetedGem() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const size = 110;

    if (is3dAutoRotating && !is3dDragging) angleY += 0.012;

    ctx.save();
    ctx.translate(cx, cy);

    // Draw Gold Ring Arc
    ctx.beginPath();
    ctx.ellipse(0, 45, size * 1.1, size * 0.45, 0, 0, Math.PI * 2);
    ctx.strokeStyle = currentMetalColor === 0xe5c158 ? '#e5c158' : (currentMetalColor === 0xe09880 ? '#e09880' : '#e2e8f0');
    ctx.lineWidth = 14;
    ctx.shadowColor = 'rgba(229, 193, 88, 0.4)';
    ctx.shadowBlur = 15;
    ctx.stroke();

    // Draw Faceted Gem Outline
    const facets = 12;
    ctx.beginPath();
    for (let i = 0; i < facets; i++) {
      const a = (i / facets) * Math.PI * 2 + angleY;
      const x = Math.cos(a) * size;
      const y = Math.sin(a) * size * 0.7 - 25;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = currentGemColor === 0xffffff ? 'rgba(255,255,255,0.85)' : 'rgba(225, 29, 72, 0.85)';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
    requestAnimationFrame(drawFacetedGem);
  }
  drawFacetedGem();
}

/**
 * 3D Control Helpers
 */
function toggle3dRotation() {
  is3dAutoRotating = !is3dAutoRotating;
  const btn = document.getElementById('btn3dRotate');
  if (btn) btn.classList.toggle('active', is3dAutoRotating);
  showToast(is3dAutoRotating ? '3D Auto-Rotation: ON' : '3D Auto-Rotation: Paused');
}

function toggle3dSparkle() {
  is3dSparkleActive = !is3dSparkleActive;
  const btn = document.getElementById('btn3dSparkle');
  if (btn) btn.classList.toggle('active', is3dSparkleActive);
  if (sparkleLight) sparkleLight.intensity = is3dSparkleActive ? 2.2 : 0;
  showToast(is3dSparkleActive ? 'Facet Sparkle Shimmer: Active' : 'Facet Sparkle: Off');
}

function reset3dView() {
  if (jewelGroup) {
    jewelGroup.rotation.set(0.35, -0.4, 0);
  }
  if (threeCamera) {
    threeCamera.position.set(0, 1.2, 7.5);
  }
  showToast('3D Perspective Reset');
}

/**
 * Gemstone Customization
 */
function setGemstone(type, name, hexColor, metalness) {
  document.querySelectorAll('.gem-opt-btn').forEach(btn => btn.classList.remove('active'));
  if (event && event.currentTarget) event.currentTarget.classList.add('active');

  const nameEl = document.getElementById('gemNameDisplay');
  if (nameEl) nameEl.textContent = name;

  bespokeRingConfig.gemstone = name;
  bespokeRingConfig.gemColor = hexColor;

  const hexInt = parseInt(hexColor.replace('#', '0x'), 16);
  currentGemColor = hexInt;

  if (gemstoneMesh && gemstoneMesh.material) {
    gemstoneMesh.material.color.setHex(hexInt);
    gemstoneMesh.material.metalness = metalness;
  }

  // Price adjustment
  let price = 34500;
  if (type === 'emerald') price = 39800;
  if (type === 'ruby') price = 42500;
  if (type === 'sapphire') price = 41200;
  if (type === 'canary') price = 36900;
  bespokeRingConfig.basePrice = price;

  const priceEl = document.getElementById('live3dPrice');
  if (priceEl) priceEl.textContent = `₹${price.toLocaleString('en-IN')}`;

  showToast(`Gemstone updated: ${name}`);
}

/**
 * Metal Customization
 */
function setMetal(type, name, hexColor, metalness) {
  document.querySelectorAll('.metal-opt-btn').forEach(btn => btn.classList.remove('active'));
  if (event && event.currentTarget) event.currentTarget.classList.add('active');

  const nameEl = document.getElementById('metalNameDisplay');
  if (nameEl) nameEl.textContent = name;

  bespokeRingConfig.metal = name;
  bespokeRingConfig.metalColor = hexColor;

  const hexInt = parseInt(hexColor.replace('#', '0x'), 16);
  currentMetalColor = hexInt;

  if (ringBandMesh && ringBandMesh.material) {
    ringBandMesh.material.color.setHex(hexInt);
    ringBandMesh.material.metalness = metalness;
  }

  showToast(`Metal updated: ${name}`);
}

/**
 * Add Custom 3D Ring to Cart
 */
function addCustomRingToCart() {
  const customItem = {
    id: Date.now(),
    name: `Bespoke Solitaire (${bespokeRingConfig.gemstone})`,
    price: bespokeRingConfig.basePrice,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=300&q=80',
    variant: `${bespokeRingConfig.metal} • 2.50 Carat`,
    quantity: 1
  };

  state.cart.push(customItem);
  updateCartUI();
  openCart();
  showToast(`Custom 3D Solitaire added to your shopping bag!`);
}

// Ensure 3D Atelier initializes on page load
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    init3dJewelAtelier();
  }, 200);
});

/**
 * Contact Us & Client Concierge Handlers
 */
function handleContactFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('[name="name"]')?.value || 'Client';
  
  // Show luxury confirmation message
  showToast(`Thank you, ${name}. Your inquiry has been prioritized with our Senior Concierge.`);
  
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="ri-checkbox-circle-line"></i> Message Dispatched Successfully`;
    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 3500);
  }
}

function handleAppointmentSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('[name="name"]')?.value || 'Client';

  showToast(`Private Consultation confirmed for ${name}. Our Jaipur styling concierge will WhatsApp you.`);
  
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="ri-check-double-line"></i> Consultation Slot Reserved`;
    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 3500);
  }
}

function trackLiveOrder() {
  const input = document.getElementById('orderTrackInput');
  const resultMsg = document.getElementById('trackResultMsg');
  if (!input || !resultMsg) return;

  const val = input.value.trim().toUpperCase();
  if (!val) {
    resultMsg.innerHTML = `<span style="color: #ef4444;"><i class="ri-error-warning-line"></i> Please enter your 8-digit Order ID (e.g. AA-948201).</span>`;
    return;
  }

  resultMsg.innerHTML = `
    <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 6px; padding: 12px; margin-top: 10px;">
      <div style="display: flex; align-items: center; gap: 8px; color: #047857; font-weight: 600; font-size: 0.85rem; margin-bottom: 6px;">
        <i class="ri-checkbox-circle-fill"></i> Order #${val} Found &bull; In Insured Transit
      </div>
      <p style="font-size: 0.78rem; color: #374151; margin-bottom: 4px;">
        <strong>Courier Partner:</strong> Sequel Secure Logistics (AWB: SQL-${Math.floor(100000 + Math.random() * 900000)})
      </p>
      <p style="font-size: 0.78rem; color: #374151; margin-bottom: 4px;">
        <strong>Status:</strong> Dispatched from Jaipur Vault &bull; Out for Tamper-Evident Delivery Tomorrow by 2:00 PM.
      </p>
    </div>
  `;
  showToast(`Shipment status retrieved for #${val}`);
}

function toggleContactFaq(el) {
  const item = el.closest('.faq-accordion-item');
  if (item) {
    item.classList.toggle('open');
  }
}

function switchContactTab(tabId) {
  document.querySelectorAll('.contact-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.contact-tab-pane').forEach(pane => pane.classList.remove('active'));
  
  const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
  const activePane = document.getElementById(tabId);
  
  if (activeBtn) activeBtn.classList.add('active');
  if (activePane) activePane.classList.add('active');
}


// -----------------------------------------------------------------------------
// LUXURY SCROLL REVEAL & HEADER SCROLL CONTROLLER
// -----------------------------------------------------------------------------
function initScrollReveal() {
  const selector = [
    '.section-header',
    '.product-card',
    '.collection-slide-card',
    '.collection-tile',
    '.trust-item',
    '.footer-pillar-item',
    '.science-card',
    '.bangle-studio-box',
    '.heritage-story-text',
    '.heritage-story-visual',
    '.instagram-feed-item',
    '.faq-accordion-item',
    '.reveal-on-scroll'
  ].join(', ');

  const revealTargets = document.querySelectorAll(selector);
  if (!revealTargets.length) return;

  revealTargets.forEach(el => {
    if (!el.classList.contains('reveal-on-scroll') && !el.classList.contains('reveal-scale')) {
      el.classList.add('reveal-on-scroll');
    }
  });

  // Stagger siblings inside grids/tracks for cascading ripple entrance
  document.querySelectorAll('.products-grid, .trust-pillars-grid, .footer-pillars-grid, .collections-slider-track, .science-pillars-grid').forEach(grid => {
    const children = grid.querySelectorAll('.reveal-on-scroll');
    children.forEach((child, index) => {
      const staggerClass = `reveal-stagger-${(index % 6) + 1}`;
      child.classList.add(staggerClass);
    });
  });

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.10
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealTargets.forEach(el => revealObserver.observe(el));
}

function initScrollHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  let ticking = false;
  const updateHeader = () => {
    if (window.scrollY > 40) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  updateHeader();
}
