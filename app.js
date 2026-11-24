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
  syncCatalogFromStoreEngine();
  initBullionAnnouncementTicker();
  initCategoryPillsAutoSlider();
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
  const heroSection = document.querySelector('.hero-section');

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

  // Pause auto-sliding when user interacts or hovers over the hero slider
  if (heroSection) {
    heroSection.addEventListener('mouseenter', () => {
      clearInterval(heroInterval);
    });
    heroSection.addEventListener('mouseleave', () => {
      resetHeroAutoTimer();
    });
    heroSection.addEventListener('touchstart', () => {
      clearInterval(heroInterval);
    }, { passive: true });
    heroSection.addEventListener('touchend', () => {
      resetHeroAutoTimer();
    }, { passive: true });
  }

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
  const pauseBtn = document.getElementById('collPauseBtn');
  const pauseIcon = document.getElementById('collPauseIcon');
  const groups = document.querySelectorAll('.collections-marquee-group');
  const progressBar = document.getElementById('collProgressBar');

  if (!track || !groups.length) return;

  if (progressBar) {
    progressBar.classList.add('marquee-progress-bar');
  }

  let isPaused = false;
  let isReverse = false;

  function togglePause() {
    isPaused = !isPaused;
    track.classList.toggle('is-paused', isPaused);
    if (pauseIcon) {
      pauseIcon.className = isPaused ? 'ri-play-line' : 'ri-pause-line';
    }
    if (pauseBtn) {
      pauseBtn.setAttribute('title', isPaused ? 'Play Infinite Flow' : 'Pause Flow');
    }
  }

  function setReverse(reverse) {
    isReverse = reverse;
    groups.forEach(g => {
      if (reverse) {
        g.classList.add('reverse-flow');
      } else {
        g.classList.remove('reverse-flow');
      }
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', togglePause);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      setReverse(true);
      if (isPaused) togglePause();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      setReverse(false);
      if (isPaused) togglePause();
    });
  }

  // Touch handling for mobile: pause when user interacts with card
  track.addEventListener('touchstart', () => {
    track.classList.add('is-paused');
  }, { passive: true });

  track.addEventListener('touchend', () => {
    if (!isPaused) {
      setTimeout(() => {
        track.classList.remove('is-paused');
      }, 1800);
    }
  }, { passive: true });
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
      let visibleIndex = 0;

      cards.forEach(card => {
        const matches = (filter === 'all' || card.dataset.category === filter);
        if (matches) {
          card.style.display = 'flex';
          // Trigger smooth staggered entrance animation
          card.classList.remove('card-filter-enter');
          void card.offsetWidth; // Force reflow
          card.style.animationDelay = `${visibleIndex * 0.05}s`;
          card.classList.add('card-filter-enter');
          visibleIndex++;
        } else {
          card.style.display = 'none';
          card.classList.remove('card-filter-enter');
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
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (typeof StoreEngine !== 'undefined' && StoreEngine.Coupons) {
    const res = StoreEngine.Coupons.validate(code, subtotal);
    if (res.valid) {
      state.appliedCoupon = { code: res.code, discountAmount: res.discountAmount };
      showToast(res.message);
      renderCart();
      return;
    } else {
      showToast(res.message);
      return;
    }
  }

  if (code === 'ROYAL10') {
    state.appliedCoupon = { code: 'ROYAL10', rate: 0.10, discountAmount: Math.round(subtotal * 0.10) };
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
    discount = state.appliedCoupon.discountAmount !== undefined ? state.appliedCoupon.discountAmount : Math.round(subtotal * (state.appliedCoupon.rate || 0.1));
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
  closeCart();
  openCheckoutModal();
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
// 15. COMPREHENSIVE HAUTE JOAILLERIE CATALOG & CATEGORY ENGINE
// -----------------------------------------------------------------------------

const categoryMetadata = {
  'all': {
    title: 'Timeless Heirlooms & Modern Essentials',
    subhead: 'Complete Curated Portfolio',
    desc: 'Explore hand-enamelled Jaipuri Meenakari bangles, uncut Pachi Kundan bridal sets, and sweatproof 18K gold daily jewellery.',
    badge: '15 Curated Universes',
    bannerImg: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1920&q=85'
  },
  'meenakari': {
    title: 'Vijay Meenakari Royal Bangles & Kadas',
    subhead: '800°C Kiln-Fired Enamel • Johari Bazaar Heritage',
    desc: 'Handcrafted in Jaipur with vibrant peacock blue and ruby red vitreous enameling, designed for heirloom durability and comfortable daily screw-lock wear.',
    badge: 'Jaipur Karigari',
    bannerImg: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1920&q=85'
  },
  'kundan': {
    title: 'Sawwaisa Pachi Kundan & Polki Bridal Sets',
    subhead: 'Sawwaisa / Khazana Royal Rajputana Edit',
    desc: 'Hand-set uncut Polki gems in 24K pure gold foil, backed with intricate red and green Meenakari etching for timeless regal weddings.',
    badge: 'Rajputana Heritage',
    bannerImg: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1920&q=85'
  },
  'anti-tarnish': {
    title: '18K Waterproof Everyday Anti-Tarnish Gold',
    subhead: 'Raviva / Chahana / Arika Modern Edit',
    desc: 'Vacuum PVD plated 18K gold over surgical steel and brass. Guaranteed 100% sweatproof, perfume-safe, and zero green skin discoloration.',
    badge: 'Lifetime Guarantee',
    bannerImg: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1920&q=85'
  },
  'oxidized': {
    title: 'Feeling Chhail 925 Tribal Silver & Chandbalis',
    subhead: 'Chhail Rajasthani Tribal Karigari',
    desc: 'Antique dual-tone oxidized 925 hallmarked silver featuring mirror ghungroos, carved deity motifs, and bohemian statement earwear.',
    badge: '925 Hallmarked',
    bannerImg: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?auto=format&fit=crop&w=1920&q=85'
  },
  'men': {
    title: "Swashaa Men's Luxe & Unisex Chains",
    subhead: 'Swashaa Minimalist Architectural Series',
    desc: 'Beveled Cuban links, brushed matte titanium signet rings, and sleek stainless steel cuffs engineered with ergonomic daily weight balance.',
    badge: 'Modern Minimalism',
    bannerImg: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1920&q=85'
  },
  'pearls': {
    title: 'Nazaakat Basra Pearls & Nizami Court Jewels',
    subhead: 'Nazaakat Royal Nizami Curation',
    desc: 'Hand-strung natural baroque Basra pearls layered with uncut polki separators, emerald drops, and multi-strand grand rani haars.',
    badge: 'Basra Heirlooms',
    bannerImg: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1920&q=85'
  },
  'temple': {
    title: 'South Indian Temple Nakshi & Kemp Heirlooms',
    subhead: 'Chola Devotional Repoussé Craft',
    desc: 'Deep repoussé nakshi work portraying Goddess Lakshmi and peacocks, adorned with ruby kemp stones and antique gold patina.',
    badge: 'Chola Dynasty',
    bannerImg: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1920&q=85'
  },
  'diamonds': {
    title: 'Solitaire Noir VVS Lab Diamond Classics',
    subhead: 'Paris Atelier High Jewellery',
    desc: 'Type IIa certified lab-grown diamonds set in 18K solid gold and platinum settings with maximum optical fire and scintillation.',
    badge: 'Certified VVS',
    bannerImg: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1920&q=85'
  },
  'talismans': {
    title: 'Noor Mother-of-Pearl Evil Eye Talismans',
    subhead: 'Mediterranean & Vedic Amulets',
    desc: 'Hand-carved mother-of-pearl, Greek sapphire crystals, and protective astral symbols set in water-resistant 18K PVD gold chains.',
    badge: 'Amulets of Protection',
    bannerImg: 'https://images.unsplash.com/photo-1674554875210-49b2a1c163d4?auto=format&fit=crop&w=1920&q=85'
  },
  'bangles': {
    title: 'Imperial Bridal Chuda & Marwar Kadas',
    subhead: 'Punjab & Marwar Wedding Heirlooms',
    desc: 'Traditional crimson and ivory acrylic chuda paired with hand-latkan pearl drops and 24K micro-gold bridal bangles.',
    badge: 'Bridal Heritage',
    bannerImg: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1920&q=85'
  },
  'navratna': {
    title: 'Navratna Nine-Gem Vedic Astral Heirlooms',
    subhead: 'Vedic Astrological Royal Settings',
    desc: 'All nine sacred Vedic planetary gemstones meticulously arranged in balanced astrological harmony with 22K gold foil setting.',
    badge: 'Vedic Astrology',
    bannerImg: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1920&q=85'
  },
  'rosegold': {
    title: 'Gulabi Jaipur 18K Rose Gold & Tourmaline',
    subhead: 'Pink City Pastel Atelier',
    desc: 'Romantic blush pink tourmaline baguettes and warm rose gold settings that blend modern minimalism with Indian grandeur.',
    badge: 'Pink City Atelier',
    bannerImg: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1920&q=85'
  },
  'hathphool': {
    title: 'Rajkumari Jadau Hathphool & Royal Hand Jewels',
    subhead: 'Rajputana Hand Heirlooms',
    desc: 'Triple-chain hand ornament articulating from a delicate wrist kada to five adjustable rings with uncut polki florets.',
    badge: 'Handcrafted Regalia',
    bannerImg: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1920&q=85'
  },
  'moissanite': {
    title: 'Dewdrop D-Color VVS1 Moissanite Solitaires',
    subhead: 'Certified Diamond Alternate',
    desc: 'Flawless optical dispersion surpassing earth-mined diamonds with a hardness of 9.25 Mohs, set in rhodium-plated sterling silver.',
    badge: 'D-Color Flawless',
    bannerImg: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1920&q=85'
  },
  'hair-jewels': {
    title: 'Noor-E-Passa, Maang Tikka & Matha Patti',
    subhead: 'Mughal & Nizami Royal Headwear',
    desc: 'Jhumar passas, crescent moon tikkas, and multi-strand pearl matha pattis crafted for unforgettable bridal crowning moments.',
    badge: 'Nizami Court',
    bannerImg: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1920&q=85'
  }
};

let currentActiveCategory = 'all';
let currentSearchQuery = '';

function sortCatalog(sortVal) {
  const grid = document.getElementById('catalogGrid');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.product-card'));
  
  if (sortVal === 'price-low') {
    cards.sort((a, b) => {
      const pa = parseInt(a.querySelector('.price-current').textContent.replace(/[^\d]/g, ''), 10) || 0;
      const pb = parseInt(b.querySelector('.price-current').textContent.replace(/[^\d]/g, ''), 10) || 0;
      return pa - pb;
    });
  } else if (sortVal === 'price-high') {
    cards.sort((a, b) => {
      const pa = parseInt(a.querySelector('.price-current').textContent.replace(/[^\d]/g, ''), 10) || 0;
      const pb = parseInt(b.querySelector('.price-current').textContent.replace(/[^\d]/g, ''), 10) || 0;
      return pb - pa;
    });
  } else if (sortVal === 'rating') {
    cards.sort((a, b) => (b.dataset.rating || 5) - (a.dataset.rating || 5));
  }

  cards.forEach(card => grid.appendChild(card));
  showToast('Catalog sorted by ' + sortVal);
}


// =============================================================================
// SIGNATURE COLLECTIONS MARQUEE SLIDER SELECTION (Collections Page)
// =============================================================================
function selectUniverseFromSlider(cat) {
  filterCategory(cat);

  // Sync active class on marquee cards
  const allTiles = document.querySelectorAll('.collections-marquee-track .collection-tile');
  allTiles.forEach(tile => {
    if (cat === 'all') {
      tile.classList.remove('active');
    } else if (tile.dataset.cat === cat) {
      tile.classList.add('active');
    } else {
      tile.classList.remove('active');
    }
  });

  // Smooth scroll down to catalog filter bar or grid
  const target = document.querySelector('.catalog-filter-bar') || document.querySelector('.catalog-layout-grid');
  if (target) {
    const headerOffset = 90;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  const nameMap = {
    'all': 'All 15 Curated Universes',
    'kundan': 'Sawwaisa Pachi Kundan & Polki',
    'meenakari': 'Jaipuri Meera Meenakari',
    'waterproof': '18K Anti-Tarnish Waterproof Gold',
    'silver': 'Feeling Chhail 925 Oxidized Silver',
    'men': "Swashaa Men's Luxe",
    'pearls': 'Nazaakat Basra Pearls',
    'temple': 'South Indian Temple Nakshi & Kemp',
    'diamonds': 'Solitaire Lab Diamonds',
    'talismans': 'Noor Evil Eye Talismans',
    'bangles': 'Imperial Bridal Chuda & Marwar Sets',
    'navratna': 'Navratna Celestial Nine-Gem',
    'rosegold': 'Gulabi Rose Gold & Tourmaline',
    'hathphool': 'Rajkumari Jadau Hathphool',
    'moissanite': 'Dewdrop VVS1 Moissanite',
    'hair-jewels': 'Noor-E-Passa & Matha Patti'
  };

  showToast('Universe Filtered: ' + (nameMap[cat] || cat));
}

function filterCategory(cat) {
  currentActiveCategory = cat || 'all';
  const cards = document.querySelectorAll('.product-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const cardCat = typeof normalizeCategorySlug === 'function' ? normalizeCategorySlug(card.dataset.category) : card.dataset.category;
    const filterCat = typeof normalizeCategorySlug === 'function' ? normalizeCategorySlug(cat) : cat;
    const matchesCat = (filterCat === 'all' || cardCat === filterCat || card.dataset.category === cat);
    const cardText = card.textContent.toLowerCase();
    const matchesSearch = !currentSearchQuery || cardText.includes(currentSearchQuery);

    if (matchesCat && matchesSearch) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  
  // Sync hero slider if on collections page
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 0 && typeof jumpToHeroSlide === 'function') {
    const cSlug = typeof normalizeCategorySlug === 'function' ? normalizeCategorySlug(cat) : (cat || '').toLowerCase();
    if (cSlug === 'kundan' || cSlug === 'bridal') {
      jumpToHeroSlide(0);
    } else if (cSlug === 'bangles' || cSlug === 'meenakari') {
      jumpToHeroSlide(1);
    } else if (cSlug === 'anti-tarnish' || cSlug === 'waterproof' || cSlug === 'chains') {
      jumpToHeroSlide(2);
    } else if (cSlug === 'pearls' || cSlug === 'oxidized' || cSlug === 'silver') {
      jumpToHeroSlide(3);
    }
  }

  // Sync marquee collection tiles
  const marqueeTiles = document.querySelectorAll('.collections-marquee-track .collection-tile');
  marqueeTiles.forEach(tile => {
    if (cat !== 'all' && tile.dataset.cat === cat) {
      tile.classList.add('active');
    } else {
      tile.classList.remove('active');
    }
  });

  // Sync sidebar category items
  const sidebarItems = document.querySelectorAll('.category-filter-item');
  sidebarItems.forEach(item => {
    if (item.dataset.cat === cat) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // 1. Sync category pills in top story bar
  const pillButtons = document.querySelectorAll('.category-pill-card');
  pillButtons.forEach(btn => {
    if (btn.dataset.cat === cat) {
      btn.classList.add('active');
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      isPillsPaused = true;
      if (pillsResumeTimeout) clearTimeout(pillsResumeTimeout);
      pillsResumeTimeout = setTimeout(() => { isPillsPaused = false; }, 4500);
    } else {
      btn.classList.remove('active');
    }
  });

  // 2. Sync sidebar checkboxes
  const checkboxes = document.querySelectorAll('.catalog-sidebar .filter-checkbox input');
  checkboxes.forEach(cb => {
    const onchangeAttr = cb.getAttribute('onchange') || '';
    if (cat === 'all') {
      cb.checked = onchangeAttr.includes("'all'");
    } else {
      cb.checked = onchangeAttr.includes("'" + cat + "'");
    }
  });

  // 3. Update count elements
  const countEl = document.querySelector('.item-count-text strong');
  if (countEl) {
    countEl.textContent = visibleCount + ' Designs';
  }

  // 4. Update Hero Banner dynamically if on collections page
  const meta = categoryMetadata[cat] || categoryMetadata['all'];
  const heroTitle = document.querySelector('.catalog-hero-text .hero-title');
  const heroSubhead = document.querySelector('.catalog-hero-text .hero-subhead');
  const heroDesc = document.querySelector('.catalog-hero-text .hero-desc');
  const heroBanner = document.querySelector('.catalog-hero-banner');

  if (heroTitle) heroTitle.textContent = meta.title;
  if (heroSubhead) heroSubhead.innerHTML = '<i class="ri-vip-diamond-line"></i> ' + meta.subhead;
  if (heroDesc) heroDesc.textContent = meta.desc;
  if (heroBanner && meta.bannerImg) {
    heroBanner.style.backgroundImage = 'linear-gradient(to right, rgba(15,21,19,0.92), rgba(15,21,19,0.4)), url("' + meta.bannerImg + '")';
  }

  // 5. Update breadcrumbs
  const breadcrumbSpan = document.querySelector('.breadcrumbs span');
  if (breadcrumbSpan) {
    breadcrumbSpan.textContent = cat === 'all' ? 'All Collections' : (meta.title.split('&')[0].trim());
  }

  // 6. Update Active Filter Chips Bar
  const chipsBar = document.getElementById('activeFiltersBar');
  const chipsContainer = document.getElementById('activeFilterChips');
  if (chipsBar && chipsContainer) {
    if (cat === 'all' && !currentSearchQuery) {
      chipsBar.style.display = 'none';
      chipsContainer.innerHTML = '';
    } else {
      chipsBar.style.display = 'flex';
      let chipsHtml = '';
      if (cat !== 'all') {
        chipsHtml += '<span class="filter-chip"><span>Universe:</span> ' + (categoryMetadata[cat]?.badge || cat) + ' <button onclick="filterCategory(\'all\')" aria-label="Remove category filter">&times;</button></span>';
      }
      if (currentSearchQuery) {
        chipsHtml += '<span class="filter-chip"><span>Search:</span> "' + currentSearchQuery + '" <button onclick="clearCatalogSearch()" aria-label="Clear search">&times;</button></span>';
      }
      chipsContainer.innerHTML = chipsHtml;
    }
  }

  // 7. Toggle Empty State
  const emptyState = document.getElementById('catalogEmptyState');
  if (emptyState) {
    emptyState.style.display = (visibleCount === 0) ? 'flex' : 'none';
  }

  // 8. Update URL query without full reload
  if (window.history && window.history.replaceState) {
    const url = new URL(window.location);
    if (cat === 'all') {
      url.searchParams.delete('cat');
    } else {
      url.searchParams.set('cat', cat);
    }
    window.history.replaceState({}, '', url);
  }

  showToast('Viewing: ' + (categoryMetadata[cat]?.title ? categoryMetadata[cat].title.split('&')[0].trim() : cat));
}


// Toggle Desktop Sidebar visibility
function toggleCatalogSidebar() {
  const grid = document.querySelector('.catalog-layout-grid');
  const btnText = document.getElementById('sidebarToggleText');
  const btn = document.getElementById('sidebarToggleBtn');
  if (!grid) return;

  const isCollapsed = grid.classList.toggle('sidebar-collapsed');
  if (btnText) {
    btnText.textContent = isCollapsed ? 'Show Sidebar' : 'Hide Sidebar';
  }
  if (btn) {
    if (isCollapsed) {
      btn.classList.add('collapsed');
    } else {
      btn.classList.remove('collapsed');
    }
  }
  showToast(isCollapsed ? 'Sidebar hidden (Full width view)' : 'Sidebar restored');
}

// =============================================================================
// CATEGORY PILLS AUTOMATIC SLIDER (Collections Page)
// =============================================================================
let categoryPillsAutoTimer = null;
let isPillsPaused = false;
let pillsResumeTimeout = null;

function initCategoryPillsAutoSlider() {
  const container = document.getElementById('categoryPillsScroll');
  if (!container) return;

  if (categoryPillsAutoTimer) {
    clearInterval(categoryPillsAutoTimer);
    categoryPillsAutoTimer = null;
  }

  // Smooth continuous auto-advance step (~1 card width: 180px)
  const slideStep = 180;
  const autoInterval = 2800; // Auto-slides every 2.8 seconds

  function advanceCategorySlide() {
    if (isPillsPaused) return;
    
    // Check if reached end or near the end (within 25px)
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (container.scrollLeft >= maxScroll - 25) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: slideStep, behavior: 'smooth' });
    }
  }

  categoryPillsAutoTimer = setInterval(advanceCategorySlide, autoInterval);

  function pauseAutoSlide(resumeDelay) {
    isPillsPaused = true;
    if (pillsResumeTimeout) clearTimeout(pillsResumeTimeout);
    if (resumeDelay && resumeDelay > 0) {
      pillsResumeTimeout = setTimeout(() => {
        isPillsPaused = false;
      }, resumeDelay);
    }
  }

  function resumeAutoSlide() {
    if (pillsResumeTimeout) clearTimeout(pillsResumeTimeout);
    isPillsPaused = false;
  }

  // Hover pause / resume on desktop
  container.addEventListener('mouseenter', () => pauseAutoSlide(0));
  container.addEventListener('mouseleave', () => resumeAutoSlide());

  // Also pause if hovering over navigation arrows
  const navArrows = document.querySelector('.csh-nav-arrows');
  if (navArrows) {
    navArrows.addEventListener('mouseenter', () => pauseAutoSlide(0));
    navArrows.addEventListener('mouseleave', () => resumeAutoSlide());
  }

  // Touch interactions on mobile & tablet
  container.addEventListener('touchstart', () => pauseAutoSlide(0), { passive: true });
  container.addEventListener('touchend', () => pauseAutoSlide(3500), { passive: true });

  // Native touch/wheel scroll detection
  let scrollTimeout = null;
  container.addEventListener('scroll', () => {
    if (!isPillsPaused) {
      isPillsPaused = true;
    }
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isPillsPaused = false;
    }, 3500);
  }, { passive: true });

  // Pause when switching browser tab to save cycles
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pauseAutoSlide(0);
    } else {
      resumeAutoSlide();
    }
  });
}

// Horizontal category scroll buttons (Next / Prev)
function scrollCategoryPills(dir) {
  const container = document.getElementById('categoryPillsScroll');
  if (!container) return;
  const scrollAmount = 320;
  
  const maxScroll = container.scrollWidth - container.clientWidth;
  if (dir > 0 && container.scrollLeft >= maxScroll - 25) {
    container.scrollTo({ left: 0, behavior: 'smooth' });
  } else if (dir < 0 && container.scrollLeft <= 15) {
    container.scrollTo({ left: maxScroll, behavior: 'smooth' });
  } else {
    container.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
  }

  // Pause automatic sliding for 4.5 seconds after manual arrow click
  isPillsPaused = true;
  if (pillsResumeTimeout) clearTimeout(pillsResumeTimeout);
  pillsResumeTimeout = setTimeout(() => {
    isPillsPaused = false;
  }, 4500);
}

// Live catalog keyword search
function handleCatalogSearch(query) {
  currentSearchQuery = (query || '').trim().toLowerCase();
  const clearBtn = document.getElementById('clearSearchBtn');
  if (clearBtn) {
    clearBtn.style.display = currentSearchQuery ? 'inline-flex' : 'none';
  }
  filterCategory(currentActiveCategory);
}

function clearCatalogSearch() {
  const input = document.getElementById('catalogSearchInput');
  if (input) input.value = '';
  handleCatalogSearch('');
}

// Mobile sidebar drawer toggle
function toggleMobileSidebar() {
  const sidebar = document.querySelector('.catalog-sidebar');
  const backdrop = document.getElementById('sidebarMobileBackdrop');
  if (!sidebar) return;
  const isOpen = sidebar.classList.contains('mobile-open');
  if (isOpen) {
    sidebar.classList.remove('mobile-open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  } else {
    sidebar.classList.add('mobile-open');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  if (catParam) {
    setTimeout(() => {
      filterCategory(catParam);
    }, 150);
  }
  initCategoryPillsAutoSlider();
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


// -----------------------------------------------------------------------------
// 17. DYNAMIC STOREFRONT & CHECKOUT ENGINE
// -----------------------------------------------------------------------------
let selectedPaymentMethod = 'upi';
let verifiedShippingPincode = null;


// =============================================================================
// DYNAMIC CATALOG PRODUCTS SYNCHRONIZATION ENGINE
// =============================================================================
function normalizeCategorySlug(rawCat) {
  if (!rawCat) return 'all';
  const c = String(rawCat).toLowerCase().trim();
  if (c.includes('meenakari')) return 'meenakari';
  if (c.includes('waterproof') || c.includes('anti-tarnish')) return 'waterproof';
  if (c.includes('kundan') || c.includes('polki')) return 'kundan';
  if (c.includes('silver') || c.includes('oxidized') || c.includes('chhail')) return 'silver';
  if (c.includes('men') || c.includes('unisex') || c.includes('swashaa')) return 'men';
  if (c.includes('pearl') || c.includes('basra')) return 'pearls';
  if (c.includes('temple') || c.includes('nakshi')) return 'temple';
  if (c.includes('diamond') || c.includes('solitaire')) return 'diamonds';
  if (c.includes('talisman') || c.includes('evil eye')) return 'talismans';
  if (c.includes('chuda') || c.includes('bangle')) return 'bangles';
  if (c.includes('navratna') || c.includes('astral')) return 'navratna';
  if (c.includes('rose') || c.includes('tourmaline')) return 'rosegold';
  if (c.includes('hathphool') || c.includes('harness')) return 'hathphool';
  if (c.includes('moissanite')) return 'moissanite';
  if (c.includes('passa') || c.includes('hair') || c.includes('matha')) return 'hair-jewels';
  return c;
}

function renderDynamicCatalogProducts() {
  const grid = document.getElementById('catalogGrid');
  if (!grid) return;

  const emptyState = document.getElementById('catalogEmptyState');
  if (typeof StoreEngine === 'undefined' || !StoreEngine.Products) return;

  const products = StoreEngine.Products.getAll();
  if (!products || !products.length) return;

  // Build card elements dynamically
  const cardsHtml = products.map(p => {
    const pId = p.id;
    const pTitle = p.title || p.name || 'Artisanal Jewellery';
    const rawCat = p.category || 'all';
    const catSlug = normalizeCategorySlug(rawCat);
    const pBadge = p.badge || (p.isDynamicPricing ? 'Live Metal' : (p.metalType === 'gold-24k' ? '24K Pure Gold' : 'New Creation'));
    const pPrice = Number(p.price) || 0;
    const pOrigPrice = Number(p.origPrice) || Math.round(pPrice * 1.3);
    const pDiscount = p.discount || (pOrigPrice > pPrice ? Math.round(((pOrigPrice - pPrice) / pOrigPrice) * 100) + '% OFF' : '');
    const pImg = p.image || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80';
    const pSecImg = p.secondaryImage || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80';
    const pBrand = p.brand || 'Jaipur Artisanal • Aura & Artisan';
    const stockText = (p.stock !== undefined) ? p.stock + ' in Stock' : 'BIS Certified';

    return `
          <div class="product-card" data-category="${catSlug}" data-id="${pId}">
            <div class="product-badge badge-bestseller">${pBadge}</div>
            <div class="product-img-wrap">
              <img class="img-primary"
                src="${pImg}"
                alt="${pTitle}"
                loading="lazy">
              <img class="img-secondary"
                src="${pSecImg}"
                alt="${pTitle} Detail"
                loading="lazy">
              <button class="card-wishlist" onclick="toggleWishlist(this, ${pId})" aria-label="Add to Wishlist"><i class="ri-heart-line"></i></button>
            </div>
            <div class="product-details">
              <div class="product-brand-tag">${pBrand}</div>
              <h3 class="product-name"><a href="product-detail.html">${pTitle}</a></h3>
              <div class="product-price-row">
                <span class="price-current">₹${pPrice.toLocaleString('en-IN')}</span>
                ${pOrigPrice > pPrice ? `<span class="price-original">₹${pOrigPrice.toLocaleString('en-IN')}</span>` : ''}
                ${pDiscount ? `<span class="discount-pill">${pDiscount}</span>` : ''}
              </div>
              <div class="card-action-group">
                <button type="button" class="btn btn-add-cart" onclick="addToCart(${pId}, '${pTitle.replace(/'/g, "\\'")}', ${pPrice}, '${pImg}', 'Standard Selection')">
                  <i class="ri-shopping-bag-line"></i> Add to Bag
                </button>
                <a href="https://wa.me/919829012345?text=Hello%20Aura%20%26%20Artisan%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(pTitle)}" class="btn-card-wa" target="_blank" rel="noopener" title="Quick WhatsApp Inquiry"><i class="ri-whatsapp-line"></i></a>
              </div>
              <div class="card-trust-tags">
                <span><i class="ri-shield-check-line"></i> BIS Certified</span>
                <span><i class="ri-truck-line"></i> ${stockText}</span>
              </div>
            </div>
          </div>`;
  }).join('\n');

  const emptyStateHtml = emptyState ? emptyState.outerHTML : '';
  grid.innerHTML = emptyStateHtml + '\n' + cardsHtml;

  // Re-apply active filters
  if (typeof currentActiveCategory !== 'undefined') {
    filterCategory(currentActiveCategory);
  }

  // Update design count
  const countStrong = document.querySelector('.item-count-text strong');
  if (countStrong) {
    countStrong.textContent = products.length + ' Designs';
  }
}

function syncCatalogFromStoreEngine() {
  if (typeof StoreEngine !== 'undefined' && StoreEngine.Products) {
    const products = StoreEngine.Products.getAll();
    products.forEach(p => {
      productDatabase[p.id] = p;
    });

    // Render dynamic catalog on collections page
    renderDynamicCatalogProducts();

    // Listen for storage changes from Admin
    window.addEventListener('aa_store_updated', (e) => {
      if (e.detail && e.detail.key === StoreEngine.STORAGE_KEYS.PRODUCTS) {
        const updated = e.detail.data;
        if (Array.isArray(updated)) {
          updated.forEach(p => { productDatabase[p.id] = p; });
          renderDynamicCatalogProducts();
          renderCart();
          renderWishlist();
        }
      }
    });
  }
}

function initBullionAnnouncementTicker() {
  if (typeof StoreEngine !== 'undefined' && StoreEngine.MetalPricing) {
    const rates = StoreEngine.MetalPricing.getRates();
    const tickerContainers = document.querySelectorAll('.ticker-content');
    tickerContainers.forEach(container => {
      const livePill = document.createElement('span');
      livePill.className = 'ticker-item';
      livePill.style.color = '#d4af37';
      livePill.innerHTML = `<i class="ri-scales-3-line"></i> Today's Hallmark 24K: ₹${rates.gold24k.toLocaleString('en-IN')}/g &bull; 925 Silver: ₹${rates.silver925.toLocaleString('en-IN')}/g`;
      const divider = document.createElement('span');
      divider.className = 'ticker-divider';
      divider.innerHTML = '&bull;';
      container.insertBefore(divider, container.firstChild);
      container.insertBefore(livePill, container.firstChild);
    });
  }
}

function openCheckoutModal() {
  const modal = document.getElementById('luxuryCheckoutModal');
  const backdrop = document.getElementById('checkoutModalBackdrop');
  if (!modal || !backdrop) return;

  renderCheckoutSummary();
  selectPaymentMethod('upi');

  backdrop.classList.add('open');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  const modal = document.getElementById('luxuryCheckoutModal');
  const backdrop = document.getElementById('checkoutModalBackdrop');
  if (modal) modal.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

function renderCheckoutSummary() {
  const itemsContainer = document.getElementById('checkoutItemsContainer');
  if (!itemsContainer) return;

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = 0;
  if (state.appliedCoupon) {
    discount = state.appliedCoupon.discountAmount !== undefined ? state.appliedCoupon.discountAmount : Math.round(subtotal * (state.appliedCoupon.rate || 0.1));
  }

  const isExpress = document.getElementById('shipOptionExpress')?.checked;
  const shippingFee = (typeof StoreEngine !== 'undefined' && StoreEngine.Shipping) 
    ? StoreEngine.Shipping.calculateShippingFee(subtotal, isExpress)
    : (subtotal >= 1499 ? 0 : 99);

  const grandTotal = Math.max(0, subtotal - discount + shippingFee);

  itemsContainer.innerHTML = state.cart.map(item => `
    <div class="checkout-item-row">
      <img src="${item.image}" alt="${item.name}" class="checkout-item-thumb">
      <div>
        <div class="checkout-item-title">${item.name}</div>
        <small style="color:#888;">${item.variant || 'Standard'} &times; ${item.quantity}</small>
      </div>
      <div class="checkout-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
    </div>
  `).join('');

  document.getElementById('checkoutSubtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  const discRow = document.getElementById('checkoutDiscountRow');
  if (discount > 0) {
    discRow.style.display = 'flex';
    document.getElementById('checkoutDiscount').textContent = `-₹${discount.toLocaleString('en-IN')}`;
  } else {
    discRow.style.display = 'none';
  }

  document.getElementById('checkoutShippingFee').textContent = shippingFee === 0 ? 'FREE' : `₹${shippingFee}`;
  document.getElementById('checkoutGrandTotal').textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
}

function selectPaymentMethod(method) {
  selectedPaymentMethod = method;
  document.querySelectorAll('.payment-method-card').forEach(card => {
    if (card.dataset.method === method) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  const panel = document.getElementById('paymentDetailsPanel');
  if (!panel) return;

  if (method === 'upi') {
    panel.innerHTML = `
      <div style="display:flex; align-items:center; gap:20px; flex-wrap:wrap;">
        <div style="background:#fff; padding:10px; border-radius:8px; width:130px; text-align:center;">
          <!-- Simulated Real-time UPI QR Code -->
          <svg viewBox="0 0 100 100" width="110" height="110">
            <rect width="100" height="100" fill="#ffffff"/>
            <rect x="10" y="10" width="25" height="25" fill="#000"/>
            <rect x="15" y="15" width="15" height="15" fill="#fff"/>
            <rect x="18" y="18" width="9" height="9" fill="#000"/>
            <rect x="65" y="10" width="25" height="25" fill="#000"/>
            <rect x="70" y="15" width="15" height="15" fill="#fff"/>
            <rect x="73" y="18" width="9" height="9" fill="#000"/>
            <rect x="10" y="65" width="25" height="25" fill="#000"/>
            <rect x="15" y="70" width="15" height="15" fill="#fff"/>
            <rect x="18" y="73" width="9" height="9" fill="#000"/>
            <rect x="42" y="12" width="16" height="6" fill="#000"/>
            <rect x="45" y="24" width="12" height="8" fill="#000"/>
            <rect x="40" y="42" width="20" height="16" fill="#000"/>
            <rect x="68" y="45" width="20" height="12" fill="#000"/>
            <rect x="45" y="70" width="14" height="18" fill="#000"/>
            <rect x="70" y="75" width="18" height="14" fill="#000"/>
          </svg>
          <span style="font-size:0.65rem; color:#111; font-weight:700; display:block; margin-top:4px;">Scan with Any App</span>
        </div>
        <div style="flex:1; min-width:200px;">
          <label style="font-size:0.75rem; text-transform:uppercase; color:#a3998b; display:block; margin-bottom:6px;">Or Pay via UPI VPA / Phone Number</label>
          <div style="display:flex; gap:8px;">
            <input type="text" id="upiVpaInput" class="checkout-input" placeholder="e.g. mobile@upi or patron@okhdfcbank" style="flex:1;">
            <button class="pincode-verify-btn" type="button" onclick="showToast('UPI VPA Verified')">Verify</button>
          </div>
          <small style="color:#2ecc71; font-size:0.75rem; margin-top:6px; display:block;"><i class="ri-shield-check-line"></i> Instant 0% Convenience Fee via BHIM, GPay, PhonePe, Paytm</small>
        </div>
      </div>
    `;
  } else if (method === 'card') {
    panel.innerHTML = `
      <div class="checkout-input-grid">
        <div class="checkout-field full">
          <label>Card Number</label>
          <input type="text" class="checkout-input" placeholder="4111 2222 3333 4444" maxlength="19">
        </div>
        <div class="checkout-field full">
          <label>Cardholder Name</label>
          <input type="text" class="checkout-input" placeholder="Name as embossed on card">
        </div>
        <div class="checkout-field">
          <label>Expiry Date</label>
          <input type="text" class="checkout-input" placeholder="MM / YY" maxlength="5">
        </div>
        <div class="checkout-field">
          <label>CVV / CVC</label>
          <input type="password" class="checkout-input" placeholder="&bull;&bull;&bull;" maxlength="4">
        </div>
      </div>
      <small style="color:#888; font-size:0.72rem; margin-top:8px; display:block;"><i class="ri-lock-line"></i> 256-Bit TLS Bank-Grade Card Tokenization (PCI-DSS Level 1)</small>
    `;
  } else if (method === 'netbanking') {
    panel.innerHTML = `
      <div class="checkout-field full">
        <label>Select Preferred Bank</label>
        <select class="checkout-input" style="width:100%;">
          <option value="HDFC">HDFC Bank</option>
          <option value="ICICI">ICICI Bank</option>
          <option value="SBI">State Bank of India</option>
          <option value="AXIS">Axis Bank</option>
          <option value="KOTAK">Kotak Mahindra Bank</option>
          <option value="OTHER">Other Indian Scheduled Bank</option>
        </select>
      </div>
    `;
  } else if (method === 'cod') {
    panel.innerHTML = `
      <div style="background:rgba(212,175,55,0.08); border:1px solid rgba(212,175,55,0.25); padding:12px; border-radius:6px;">
        <strong style="color:#d4af37; font-size:0.85rem;"><i class="ri-hand-coin-line"></i> Cash on Delivery Available</strong>
        <p style="font-size:0.75rem; color:#aaa; margin-top:4px; line-height:1.4;">
          Please keep exact cash ready upon delivery. Our tamper-proof courier security bag will be verified in your presence prior to payment.
        </p>
      </div>
    `;
  }
}

function verifyCheckoutPincode() {
  const pinInput = document.getElementById('checkoutPincode');
  const statusBox = document.getElementById('checkoutPincodeStatus');
  if (!pinInput || !statusBox) return;

  const pin = pinInput.value.trim();
  if (typeof StoreEngine !== 'undefined' && StoreEngine.Shipping) {
    const res = StoreEngine.Shipping.checkPincode(pin);
    if (res.valid) {
      verifiedShippingPincode = pin;
      statusBox.innerHTML = `<span style="color:#2ecc71;"><i class="ri-checkbox-circle-fill"></i> ${res.message}</span>`;
      statusBox.style.display = 'block';
    } else {
      statusBox.innerHTML = `<span style="color:#e74c3c;"><i class="ri-error-warning-fill"></i> ${res.message}</span>`;
      statusBox.style.display = 'block';
    }
  }
}

function submitCheckoutOrder(e) {
  if (e) e.preventDefault();

  const name = document.getElementById('checkoutName')?.value.trim();
  const phone = document.getElementById('checkoutPhone')?.value.trim();
  const email = document.getElementById('checkoutEmail')?.value.trim();
  const address = document.getElementById('checkoutAddress')?.value.trim();
  const city = document.getElementById('checkoutCity')?.value.trim();
  const stateVal = document.getElementById('checkoutState')?.value.trim();
  const pin = document.getElementById('checkoutPincode')?.value.trim();

  if (!name || !phone || !address || !pin) {
    showToast('Please fill all mandatory shipping address fields.');
    return;
  }

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = 0;
  if (state.appliedCoupon) {
    discount = state.appliedCoupon.discountAmount !== undefined ? state.appliedCoupon.discountAmount : Math.round(subtotal * (state.appliedCoupon.rate || 0.1));
  }
  const isExpress = document.getElementById('shipOptionExpress')?.checked;
  const shippingFee = (typeof StoreEngine !== 'undefined' && StoreEngine.Shipping) 
    ? StoreEngine.Shipping.calculateShippingFee(subtotal, isExpress)
    : (subtotal >= 1499 ? 0 : 99);
  const grandTotal = Math.max(0, subtotal - discount + shippingFee);

  const submitBtn = document.getElementById('btnSubmitOrder');
  const originalText = submitBtn ? submitBtn.innerHTML : '';
  if (submitBtn) {
    submitBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Authorizing 256-Bit Payment...';
    submitBtn.disabled = true;
  }

  setTimeout(() => {
    let orderRecord = null;
    if (typeof StoreEngine !== 'undefined' && StoreEngine.Orders) {
      orderRecord = StoreEngine.Orders.createOrder({
        customerName: name,
        phone: phone,
        email: email,
        shippingAddress: `${address}, ${city}, ${stateVal} - ${pin}`,
        city: city,
        state: stateVal,
        pincode: pin,
        items: state.cart.map(c => ({ id: c.id, title: c.name, price: c.price, quantity: c.quantity, variant: c.variant })),
        subtotal: subtotal,
        discount: discount,
        couponApplied: state.appliedCoupon ? state.appliedCoupon.code : null,
        shippingFee: shippingFee,
        totalAmount: grandTotal,
        paymentMethod: selectedPaymentMethod.toUpperCase(),
        paymentStatus: selectedPaymentMethod === 'cod' ? 'PENDING_DELIVERY' : 'PAID'
      });
    }

    if (submitBtn) {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }

    // Reset cart
    state.cart = [];
    state.appliedCoupon = null;
    renderCart();
    updateHeaderBadges();

    closeCheckoutModal();
    openSuccessModal(orderRecord);
  }, 1200);
}

function openSuccessModal(order) {
  const modal = document.getElementById('orderSuccessModal');
  const backdrop = document.getElementById('checkoutModalBackdrop');
  if (!modal || !backdrop) return;

  const orderId = order ? order.orderId : 'ORD-2026-' + Math.floor(1000 + Math.random() * 9000);
  const trackingId = order ? order.trackingId : 'BD-991823712IN';
  const courier = order ? order.courierPartner : 'BlueDart Express';
  const total = order ? order.totalAmount : 0;

  document.getElementById('successOrderId').textContent = orderId;
  document.getElementById('successTrackingText').textContent = `${courier} &bull; Tracking ID: ${trackingId}`;
  document.getElementById('successAmountText').textContent = `₹${Number(total).toLocaleString('en-IN')}`;

  backdrop.classList.add('open');
  modal.classList.add('open');
}

function closeSuccessModal() {
  const modal = document.getElementById('orderSuccessModal');
  const backdrop = document.getElementById('checkoutModalBackdrop');
  if (modal) modal.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

function openTrackOrderModal() {
  const modal = document.getElementById('trackOrderModal');
  const backdrop = document.getElementById('checkoutModalBackdrop');
  if (modal && backdrop) {
    backdrop.classList.add('open');
    modal.classList.add('open');
  }
}

function closeTrackOrderModal() {
  const modal = document.getElementById('trackOrderModal');
  const backdrop = document.getElementById('checkoutModalBackdrop');
  if (modal) modal.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

function lookupOrderTracking() {
  const input = document.getElementById('trackOrderQueryInput');
  const resultBox = document.getElementById('trackOrderResultBox');
  if (!input || !resultBox) return;

  const q = input.value.trim().toUpperCase();
  if (!q) {
    showToast('Please enter Order ID or phone number.');
    return;
  }

  let order = null;
  if (typeof StoreEngine !== 'undefined' && StoreEngine.Orders) {
    const orders = StoreEngine.Orders.getAll();
    order = orders.find(o => o.orderId.toUpperCase() === q || o.phone.replace(/\D/g, '').includes(q.replace(/\D/g, '')));
  }

  if (!order) {
    resultBox.innerHTML = `
      <div style="background:rgba(231,76,60,0.1); border:1px solid rgba(231,76,60,0.3); padding:16px; border-radius:8px; color:#ec7063; text-align:center;">
        <i class="ri-error-warning-line" style="font-size:1.5rem;"></i>
        <p style="margin-top:6px; font-size:0.85rem;">No active order found for "${q}". Please verify your Order Reference ID or contact our concierge.</p>
      </div>
    `;
    return;
  }

  const dateFormatted = new Date(order.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const status = (order.orderStatus || 'Confirmed').toLowerCase();

  let step1Class = 'completed';
  let step2Class = (status === 'processing' || status === 'shipped' || status === 'delivered') ? 'completed' : 'active';
  let step3Class = (status === 'shipped' || status === 'delivered') ? 'completed' : (status === 'processing' ? 'active' : '');
  let step4Class = (status === 'delivered') ? 'completed' : (status === 'shipped' ? 'active' : '');

  resultBox.innerHTML = `
    <div style="background:#090806; border:1px solid rgba(212,175,55,0.25); border-radius:10px; padding:20px; margin-top:16px; text-align:left;">
      <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(212,175,55,0.15); padding-bottom:12px; margin-bottom:16px;">
        <div>
          <strong style="color:#d4af37; font-size:1.1rem;">${order.orderId}</strong>
          <small style="color:#888; display:block;">Placed on ${dateFormatted}</small>
        </div>
        <div style="text-align:right;">
          <span style="background:rgba(46,204,113,0.15); color:#2ecc71; border:1px solid rgba(46,204,113,0.3); padding:4px 10px; border-radius:20px; font-size:0.75rem; font-weight:600;">${order.orderStatus}</span>
          <small style="color:#aaa; display:block; margin-top:4px;">${order.courierPartner}</small>
        </div>
      </div>

      <!-- Live Stepper -->
      <div class="tracking-stepper">
        <div class="step-node ${step1Class}">
          <div class="step-dot"><i class="ri-checkbox-circle-line"></i></div>
          <span class="step-label">Confirmed</span>
        </div>
        <div class="step-node ${step2Class}">
          <div class="step-dot"><i class="ri-shield-star-line"></i></div>
          <span class="step-label">Hallmarked</span>
        </div>
        <div class="step-node ${step3Class}">
          <div class="step-dot"><i class="ri-truck-line"></i></div>
          <span class="step-label">Shipped</span>
        </div>
        <div class="step-node ${step4Class}">
          <div class="step-dot"><i class="ri-gift-line"></i></div>
          <span class="step-label">Delivered</span>
        </div>
      </div>

      <div style="font-size:0.8rem; color:#aaa; line-height:1.6; border-top:1px solid rgba(212,175,55,0.1); padding-top:12px;">
        <p><strong style="color:#fff;">Patron:</strong> ${order.customerName} (${order.phone})</p>
        <p><strong style="color:#fff;">Destination:</strong> ${order.shippingAddress}</p>
        <p><strong style="color:#fff;">Air Waybill / Tracking:</strong> <span style="color:#d4af37;">${order.trackingId || 'Allocating hub...'}</span></p>
      </div>
    </div>
  `;
}

// Expose Checkout and Tracking helpers globally
window.openCheckoutModal = openCheckoutModal;
window.closeCheckoutModal = closeCheckoutModal;
window.selectPaymentMethod = selectPaymentMethod;
window.verifyCheckoutPincode = verifyCheckoutPincode;
window.submitCheckoutOrder = submitCheckoutOrder;
window.closeSuccessModal = closeSuccessModal;
window.openTrackOrderModal = openTrackOrderModal;
window.closeTrackOrderModal = closeTrackOrderModal;
window.lookupOrderTracking = lookupOrderTracking;
