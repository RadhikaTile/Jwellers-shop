/**
 * AURA & ARTISAN - Luxury Admin Control Center Controller
 * Version 1.0 (2026)
 * Integrates directly with StoreEngine
 */

(function () {
  'use strict';

  // State
  let currentTab = 'overview';
  let editingProductId = null;
  let viewingOrderId = null;

  // DOM Elements
  const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
  const sections = document.querySelectorAll('.admin-section');
  const pageTitle = document.getElementById('pageTitle');
  const pageSubtitle = document.getElementById('pageSubtitle');
  const tickerGold = document.getElementById('headerGoldRate');
  const tickerSilver = document.getElementById('headerSilverRate');

  // ---------------------------------------------------------------------------
  // 1. NAVIGATION ROUTING
  // ---------------------------------------------------------------------------
  function switchTab(tabId) {
    currentTab = tabId;

    navLinks.forEach(link => {
      if (link.dataset.tab === tabId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Sync mobile bottom nav items
    document.querySelectorAll('.admin-mob-item').forEach(item => {
      if (item.dataset.tab === tabId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    sections.forEach(sec => {
      if (sec.id === `section-${tabId}`) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });

    // Auto-close sidebar drawer on tablet & mobile
    if (window.innerWidth <= 992) {
      closeSidebar();
    }

    // Update Titles
    const titles = {
      overview: { title: 'Executive Overview', subtitle: 'Real-time sales, order fulfillment, and live bullion metrics' },
      products: { title: 'Product & Jewellery Catalog', subtitle: 'Manage curated collections, purity specs, and dynamic pricing rules' },
      metals: { title: 'Live Metal Pricing Control', subtitle: 'Configure live bullion feeds, IBJA benchmarks, making charges, and GST' },
      inventory: { title: 'Inventory & Stock Control', subtitle: 'Track atelier stock levels, low-quantity alerts, and availability' },
      orders: { title: 'Order Fulfillment & Shipments', subtitle: 'Process patron orders, dispatch couriers, and generate tax invoices' },
      coupons: { title: 'Privilege Codes & Promotions', subtitle: 'Create VIP promo codes, threshold discounts, and marketing campaigns' },
      shipping: { title: 'Shipping & Courier Dispatch', subtitle: 'Configure transit partners, free insured shipping rules, and PIN delivery' },
      settings: { title: 'System & Database Backup', subtitle: 'Export store snapshots, restore backups, or reset demo database' }
    };

    if (titles[tabId]) {
      pageTitle.textContent = titles[tabId].title;
      pageSubtitle.textContent = titles[tabId].subtitle;
    }

    // Refresh Section Data
    refreshCurrentTab();
  }

  function refreshCurrentTab() {
    updateHeaderTicker();
    if (currentTab === 'overview') renderOverview();
    if (currentTab === 'products') renderProducts();
    if (currentTab === 'metals') renderMetals();
    if (currentTab === 'inventory') renderInventory();
    if (currentTab === 'orders') renderOrders();
    if (currentTab === 'coupons') renderCoupons();
    if (currentTab === 'shipping') renderShipping();
  }

  // ---------------------------------------------------------------------------
  // 2. HEADER TICKER & METRICS
  // ---------------------------------------------------------------------------
  function updateHeaderTicker() {
    const rates = StoreEngine.MetalPricing.getRates();
    if (tickerGold) tickerGold.textContent = `₹${rates.gold24k.toLocaleString('en-IN')}/g`;
    if (tickerSilver) tickerSilver.textContent = `₹${rates.silver925.toLocaleString('en-IN')}/g`;
  }

  // ---------------------------------------------------------------------------
  // 3. OVERVIEW DASHBOARD
  // ---------------------------------------------------------------------------
  function renderOverview() {
    const orders = StoreEngine.Orders.getAll();
    const products = StoreEngine.Products.getAll();
    const rates = StoreEngine.MetalPricing.getRates();

    const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
    const lowStockCount = products.filter(p => Number(p.stock) < 10).length;

    document.getElementById('metricRevenue').textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;
    document.getElementById('metricOrders').textContent = orders.length;
    document.getElementById('metricProducts').textContent = products.length;
    document.getElementById('metricLowStock').textContent = lowStockCount;

    // Overview Rates Card
    document.getElementById('ovRateGold24').textContent = `₹${rates.gold24k.toLocaleString('en-IN')}`;
    document.getElementById('ovRateGold22').textContent = `₹${rates.gold22k.toLocaleString('en-IN')}`;
    document.getElementById('ovRateGold18').textContent = `₹${rates.gold18k.toLocaleString('en-IN')}`;
    document.getElementById('ovRateSilver925').textContent = `₹${rates.silver925.toLocaleString('en-IN')}`;

    // Render Recent 5 Orders Table
    const recentOrdersBody = document.getElementById('recentOrdersTableBody');
    if (!recentOrdersBody) return;

    const recent = orders.slice(0, 5);
    if (recent.length === 0) {
      recentOrdersBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px; color:#888;">No orders recorded yet.</td></tr>';
      return;
    }

    recentOrdersBody.innerHTML = recent.map(o => {
      const dateStr = new Date(o.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      const statusClass = (o.orderStatus || 'confirmed').toLowerCase();
      return `
        <tr>
          <td><strong>${o.orderId}</strong><br><small style="color:#888;">${dateStr}</small></td>
          <td>${o.customerName}<br><small style="color:#888;">${o.phone}</small></td>
          <td>${o.items.length} piece(s)</td>
          <td><strong>₹${Number(o.totalAmount).toLocaleString('en-IN')}</strong></td>
          <td><span class="badge-status ${statusClass}">${o.orderStatus}</span></td>
          <td>
            <button class="btn-icon" onclick="AdminApp.viewInvoice('${o.orderId}')" title="View Tax Invoice"><i class="ri-file-text-line"></i></button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // ---------------------------------------------------------------------------
  // 4. PRODUCT CATALOG MANAGEMENT
  // ---------------------------------------------------------------------------
  function renderProducts() {
    const products = StoreEngine.Products.getAll();
    const tbody = document.getElementById('productsTableBody');
    const searchVal = (document.getElementById('productSearchInput')?.value || '').toLowerCase();
    const catVal = document.getElementById('productCategoryFilter')?.value || 'all';

    let filtered = products.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(searchVal) || (p.sku && p.sku.toLowerCase().includes(searchVal));
      const matchCat = catVal === 'all' || p.category === catVal;
      return matchSearch && matchCat;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:30px; color:#888;">No products matching criteria.</td></tr>';
      return;
    }

    tbody.innerHTML = filtered.map(p => {
      let stockClass = 'in-stock';
      let stockText = `${p.stock} in stock`;
      if (p.stock <= 0) {
        stockClass = 'out-of-stock';
        stockText = 'Out of Stock';
      } else if (p.stock < 10) {
        stockClass = 'low-stock';
        stockText = `${p.stock} low stock`;
      }

      const metalLabel = p.metalType ? p.metalType.toUpperCase().replace('-', ' ') : 'N/A';
      const dynamicBadge = p.isDynamicPricing ? `<span class="badge-dynamic"><i class="ri-refresh-line"></i> Live Metal</span>` : `<span style="color:#777; font-size:0.7rem;">Fixed Price</span>`;

      return `
        <tr>
          <td>
            <div class="table-product-cell">
              <img src="${p.image}" class="table-thumb" alt="${p.title}" onerror="this.src='https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=100&q=80'">
              <div>
                <strong>${p.title}</strong><br>
                <small style="color:#888;">SKU: ${p.sku || 'N/A'}</small>
              </div>
            </div>
          </td>
          <td>${p.category || 'Luxury'}</td>
          <td>
            <span>${metalLabel}</span><br>
            <small style="color:#888;">${p.metalWeight ? p.metalWeight + 'g' : '-'}</small>
          </td>
          <td>${dynamicBadge}</td>
          <td>
            <strong>₹${Number(p.price).toLocaleString('en-IN')}</strong><br>
            <small style="color:#888; text-decoration:line-through;">₹${Number(p.origPrice || 0).toLocaleString('en-IN')}</small>
          </td>
          <td><span class="badge-stock ${stockClass}">${stockText}</span></td>
          <td>
            <div style="display:flex; gap:6px;">
              <button class="btn-icon" onclick="AdminApp.editProduct(${p.id})" title="Edit Product"><i class="ri-edit-line"></i></button>
              <button class="btn-icon" onclick="AdminApp.deleteProduct(${p.id})" title="Delete Product" style="color:#e74c3c;"><i class="ri-delete-bin-line"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function openProductModal(productId = null) {
    editingProductId = productId;
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('productModalTitle');
    const form = document.getElementById('productForm');

    form.reset();

    if (productId) {
      modalTitle.textContent = 'Edit Jewellery Piece';
      const p = StoreEngine.Products.getById(productId);
      if (p) {
        document.getElementById('prodId').value = p.id;
        document.getElementById('prodTitle').value = p.title || '';
        document.getElementById('prodSku').value = p.sku || '';
        document.getElementById('prodCategory').value = p.category || '18K Anti-Tarnish (Everyday)';
        document.getElementById('prodBrand').value = p.brand || '';
        document.getElementById('prodMetalType').value = p.metalType || 'gold-18k';
        document.getElementById('prodMetalWeight').value = p.metalWeight || '';
        document.getElementById('prodMakingCharges').value = p.makingCharges || 14;
        document.getElementById('prodGemstoneCost').value = p.gemstoneCost || 0;
        document.getElementById('prodDynamicPricing').checked = !!p.isDynamicPricing;
        document.getElementById('prodPrice').value = p.price || '';
        document.getElementById('prodOrigPrice').value = p.origPrice || '';
        document.getElementById('prodStock').value = p.stock !== undefined ? p.stock : 10;
        document.getElementById('prodBadge').value = p.badge || '';
        document.getElementById('prodImage').value = p.image || '';
        document.getElementById('prodSecImage').value = p.secondaryImage || '';
        document.getElementById('prodDescription').value = p.description || '';
      }
    } else {
      modalTitle.textContent = 'Add New Jewellery Piece';
      document.getElementById('prodId').value = '';
      document.getElementById('prodStock').value = 15;
      document.getElementById('prodMakingCharges').value = 14;
    }

    modal.classList.add('open');
  }

  function closeProductModal() {
    document.getElementById('productModal').classList.remove('open');
    editingProductId = null;
  }

  function handleProductSubmit(e) {
    e.preventDefault();
    const idVal = document.getElementById('prodId').value;
    const isDynamic = document.getElementById('prodDynamicPricing').checked;

    const payload = {
      title: document.getElementById('prodTitle').value.trim(),
      sku: document.getElementById('prodSku').value.trim(),
      category: document.getElementById('prodCategory').value,
      brand: document.getElementById('prodBrand').value.trim() || 'Aura & Artisan Atelier',
      metalType: document.getElementById('prodMetalType').value,
      metalWeight: parseFloat(document.getElementById('prodMetalWeight').value) || 0,
      makingCharges: parseFloat(document.getElementById('prodMakingCharges').value) || 14,
      gemstoneCost: parseFloat(document.getElementById('prodGemstoneCost').value) || 0,
      isDynamicPricing: isDynamic,
      price: parseFloat(document.getElementById('prodPrice').value) || 0,
      origPrice: parseFloat(document.getElementById('prodOrigPrice').value) || 0,
      stock: parseInt(document.getElementById('prodStock').value, 10) || 0,
      badge: document.getElementById('prodBadge').value.trim(),
      image: document.getElementById('prodImage').value.trim() || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
      secondaryImage: document.getElementById('prodSecImage').value.trim(),
      description: document.getElementById('prodDescription').value.trim()
    };

    if (idVal) {
      payload.id = parseInt(idVal, 10);
    }

    StoreEngine.Products.save(payload);
    closeProductModal();
    renderProducts();
    showToast(idVal ? 'Product updated successfully.' : 'New product added to catalog.');
  }

  function deleteProduct(id) {
    if (confirm('Are you sure you want to remove this jewellery piece from the catalog?')) {
      StoreEngine.Products.delete(id);
      renderProducts();
      showToast('Product removed.');
    }
  }

  // ---------------------------------------------------------------------------
  // 5. LIVE METAL PRICING CONTROL
  // ---------------------------------------------------------------------------
  function renderMetals() {
    const rates = StoreEngine.MetalPricing.getRates();

    document.getElementById('inputGold24').value = rates.gold24k;
    document.getElementById('inputGold22').value = rates.gold22k;
    document.getElementById('inputGold18').value = rates.gold18k;
    document.getElementById('inputGold14').value = rates.gold14k;
    document.getElementById('inputSilver999').value = rates.silver999;
    document.getElementById('inputSilver925').value = rates.silver925;
    document.getElementById('inputUsdInr').value = rates.usdInrRate || 86.8;
    document.getElementById('inputDefaultMaking').value = rates.defaultMakingPercent || 14;
    document.getElementById('inputGstRate').value = rates.gstPercent || 3;

    document.getElementById('metalApiProvider').textContent = rates.apiProvider || 'gold-api.com';
    const dateFormatted = new Date(rates.lastUpdated).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    document.getElementById('metalLastUpdated').textContent = dateFormatted;

    // Run sample calculator
    calculateSampleMetalPrice();
  }

  async function fetchLiveMetals() {
    const btn = document.getElementById('btnFetchLiveMetals');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Fetching Live Rates...';
    btn.disabled = true;

    try {
      const result = await StoreEngine.MetalPricing.fetchLiveRates();
      if (result.success) {
        showToast('Live bullion prices synchronized from Gold-API feed.');
      } else {
        showToast('External feed unreachable. Retained domestic benchmark rates.');
      }
      renderMetals();
      updateHeaderTicker();
    } catch (e) {
      showToast('Error syncing metal rates.');
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  }

  function saveManualMetals() {
    const rates = {
      gold24k: parseFloat(document.getElementById('inputGold24').value) || 7850,
      gold22k: parseFloat(document.getElementById('inputGold22').value) || 7196,
      gold18k: parseFloat(document.getElementById('inputGold18').value) || 5888,
      gold14k: parseFloat(document.getElementById('inputGold14').value) || 4592,
      silver999: parseFloat(document.getElementById('inputSilver999').value) || 94.5,
      silver925: parseFloat(document.getElementById('inputSilver925').value) || 87.4,
      usdInrRate: parseFloat(document.getElementById('inputUsdInr').value) || 86.8,
      defaultMakingPercent: parseFloat(document.getElementById('inputDefaultMaking').value) || 14,
      gstPercent: parseFloat(document.getElementById('inputGstRate').value) || 3,
      apiProvider: 'Manual Showroom Benchmark',
      lastUpdated: new Date().toISOString()
    };

    StoreEngine.MetalPricing.saveRates(rates);
    updateHeaderTicker();
    showToast('Metal benchmark rates saved.');
  }

  function recalculateAllStorePrices() {
    const res = StoreEngine.MetalPricing.recalculateStorePrices();
    renderProducts();
    showToast(`Recalculated prices for ${res.count} dynamic jewellery pieces.`);
  }

  function calculateSampleMetalPrice() {
    const metalType = document.getElementById('calcMetalType')?.value || 'gold-22k';
    const weight = parseFloat(document.getElementById('calcWeight')?.value) || 10;
    const making = parseFloat(document.getElementById('calcMaking')?.value) || 14;
    const gemstone = parseFloat(document.getElementById('calcGemstone')?.value) || 0;

    const dummy = {
      metalType: metalType,
      metalWeight: weight,
      makingCharges: making,
      gemstoneCost: gemstone,
      isDynamicPricing: true
    };

    const calc = StoreEngine.MetalPricing.calculatePrice(dummy);
    document.getElementById('calcResultMetalCost').textContent = `₹${calc.metalCost.toLocaleString('en-IN')}`;
    document.getElementById('calcResultMakingCost').textContent = `₹${calc.makingCost.toLocaleString('en-IN')}`;
    document.getElementById('calcResultGst').textContent = `₹${calc.gstAmount.toLocaleString('en-IN')}`;
    document.getElementById('calcResultFinalPrice').textContent = `₹${calc.basePrice.toLocaleString('en-IN')}`;
  }

  // ---------------------------------------------------------------------------
  // 6. INVENTORY MANAGEMENT
  // ---------------------------------------------------------------------------
  function renderInventory() {
    const products = StoreEngine.Products.getAll();
    const tbody = document.getElementById('inventoryTableBody');
    const filter = document.getElementById('inventoryStockFilter')?.value || 'all';

    let list = products;
    if (filter === 'low') {
      list = products.filter(p => p.stock > 0 && p.stock < 10);
    } else if (filter === 'out') {
      list = products.filter(p => p.stock <= 0);
    }

    if (list.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px; color:#888;">No inventory items match filter.</td></tr>';
      return;
    }

    tbody.innerHTML = list.map(p => {
      let statusBadge = '<span class="badge-stock in-stock">Healthy Stock</span>';
      if (p.stock <= 0) {
        statusBadge = '<span class="badge-stock out-of-stock">Depleted</span>';
      } else if (p.stock < 10) {
        statusBadge = '<span class="badge-stock low-stock">Low Stock Alert</span>';
      }

      return `
        <tr>
          <td>
            <div class="table-product-cell">
              <img src="${p.image}" class="table-thumb" alt="${p.title}">
              <div>
                <strong>${p.title}</strong><br>
                <small style="color:#888;">SKU: ${p.sku}</small>
              </div>
            </div>
          </td>
          <td>${p.category}</td>
          <td><strong>${p.stock}</strong> units</td>
          <td>${statusBadge}</td>
          <td>
            <div style="display:flex; align-items:center; gap:6px;">
              <button class="btn-icon" onclick="AdminApp.adjustStock(${p.id}, -1)">-</button>
              <input type="number" id="stockInput_${p.id}" value="${p.stock}" style="width:60px; background:#000; border:1px solid #333; color:#fff; text-align:center; padding:4px; border-radius:4px;">
              <button class="btn-icon" onclick="AdminApp.adjustStock(${p.id}, 1)">+</button>
              <button class="btn-gold" style="padding:4px 10px; font-size:0.7rem;" onclick="AdminApp.saveStockInput(${p.id})">Save</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function adjustStock(id, delta) {
    StoreEngine.Products.adjustStock(id, delta);
    renderInventory();
    showToast('Stock quantity updated.');
  }

  function saveStockInput(id) {
    const input = document.getElementById(`stockInput_${id}`);
    if (input) {
      const val = parseInt(input.value, 10);
      StoreEngine.Products.updateStock(id, val);
      renderInventory();
      showToast('Inventory level set.');
    }
  }

  // ---------------------------------------------------------------------------
  // 7. ORDER FULFILLMENT & INVOICE
  // ---------------------------------------------------------------------------
  function renderOrders() {
    const orders = StoreEngine.Orders.getAll();
    const tbody = document.getElementById('ordersTableBody');
    const filter = document.getElementById('orderStatusFilter')?.value || 'all';
    const search = (document.getElementById('orderSearchInput')?.value || '').toLowerCase();

    let list = orders.filter(o => {
      const matchStatus = filter === 'all' || o.orderStatus.toLowerCase() === filter.toLowerCase();
      const matchSearch = o.orderId.toLowerCase().includes(search) || o.customerName.toLowerCase().includes(search) || o.phone.includes(search);
      return matchStatus && matchSearch;
    });

    if (list.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:30px; color:#888;">No orders found.</td></tr>';
      return;
    }

    tbody.innerHTML = list.map(o => {
      const dateStr = new Date(o.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      const statusClass = (o.orderStatus || 'confirmed').toLowerCase();

      return `
        <tr>
          <td>
            <strong>${o.orderId}</strong><br>
            <small style="color:#888;">${dateStr}</small>
          </td>
          <td>
            <strong>${o.customerName}</strong><br>
            <small style="color:#888;">${o.phone} • ${o.city}</small>
          </td>
          <td>
            <span>${o.items.map(i => `${i.title} (${i.quantity})`).join(', ')}</span>
          </td>
          <td>
            <strong>₹${Number(o.totalAmount).toLocaleString('en-IN')}</strong><br>
            <small style="color:#888;">${o.paymentMethod} (${o.paymentStatus})</small>
          </td>
          <td>
            <select class="form-control" style="padding:4px 8px; font-size:0.75rem;" onchange="AdminApp.changeOrderStatus('${o.orderId}', this.value)">
              <option value="Confirmed" ${o.orderStatus === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
              <option value="Processing" ${o.orderStatus === 'Processing' ? 'selected' : ''}>Processing</option>
              <option value="Shipped" ${o.orderStatus === 'Shipped' ? 'selected' : ''}>Shipped</option>
              <option value="Delivered" ${o.orderStatus === 'Delivered' ? 'selected' : ''}>Delivered</option>
              <option value="Cancelled" ${o.orderStatus === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </td>
          <td>
            <small style="color:var(--admin-gold);">${o.courierPartner || 'Pending'}</small><br>
            <small style="color:#888;">${o.trackingId || '-'}</small>
          </td>
          <td>
            <button class="btn-gold" style="padding:6px 12px; font-size:0.72rem;" onclick="AdminApp.viewInvoice('${o.orderId}')"><i class="ri-printer-line"></i> Tax Invoice</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function changeOrderStatus(orderId, newStatus) {
    StoreEngine.Orders.updateStatus(orderId, newStatus);
    showToast(`Order ${orderId} status set to ${newStatus}.`);
  }

  function viewInvoice(orderId) {
    const order = StoreEngine.Orders.getById(orderId);
    if (!order) return;

    viewingOrderId = orderId;
    const modal = document.getElementById('invoiceModal');
    const dateFormatted = new Date(order.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

    document.getElementById('invOrderId').textContent = order.orderId;
    document.getElementById('invDate').textContent = dateFormatted;
    document.getElementById('invCustomerName').textContent = order.customerName;
    document.getElementById('invPhone').textContent = order.phone;
    document.getElementById('invEmail').textContent = order.email || 'N/A';
    document.getElementById('invAddress').textContent = order.shippingAddress;
    document.getElementById('invPayment').textContent = `${order.paymentMethod} (${order.paymentStatus})`;
    document.getElementById('invCourier').textContent = `${order.courierPartner} • Tracking ID: ${order.trackingId}`;

    // Itemized Rows
    const itemsTbody = document.getElementById('invItemsTableBody');
    itemsTbody.innerHTML = order.items.map(item => `
      <tr>
        <td><strong>${item.title}</strong><br><small style="color:#666;">${item.variant || 'Standard'}</small></td>
        <td style="text-align:center;">${item.quantity}</td>
        <td style="text-align:right;">₹${Number(item.price).toLocaleString('en-IN')}</td>
        <td style="text-align:right;">₹${(Number(item.price) * Number(item.quantity)).toLocaleString('en-IN')}</td>
      </tr>
    `).join('');

    document.getElementById('invSubtotal').textContent = `₹${Number(order.subtotal).toLocaleString('en-IN')}`;
    document.getElementById('invDiscount').textContent = `-₹${Number(order.discount || 0).toLocaleString('en-IN')}`;
    document.getElementById('invShipping').textContent = order.shippingFee === 0 ? 'COMPLIMENTARY' : `₹${order.shippingFee}`;
    document.getElementById('invTotal').textContent = `₹${Number(order.totalAmount).toLocaleString('en-IN')}`;

    modal.classList.add('open');
  }

  function closeInvoiceModal() {
    document.getElementById('invoiceModal').classList.remove('open');
    viewingOrderId = null;
  }

  function printInvoice() {
    window.print();
  }

  // ---------------------------------------------------------------------------
  // 8. COUPONS MANAGEMENT
  // ---------------------------------------------------------------------------
  function renderCoupons() {
    const coupons = StoreEngine.Coupons.getAll();
    const tbody = document.getElementById('couponsTableBody');

    tbody.innerHTML = coupons.map(c => `
      <tr>
        <td><strong style="color:var(--admin-gold); letter-spacing:0.08em;">${c.code}</strong></td>
        <td>${c.type === 'percentage' ? c.value + '% OFF' : '₹' + c.value + ' FLAT OFF'}</td>
        <td>₹${c.minOrder.toLocaleString('en-IN')}</td>
        <td>₹${c.maxDiscount.toLocaleString('en-IN')}</td>
        <td>${c.description}</td>
        <td><span class="badge-stock ${c.isActive ? 'in-stock' : 'out-of-stock'}">${c.isActive ? 'Active' : 'Disabled'}</span></td>
        <td>
          <button class="btn-danger" onclick="AdminApp.deleteCoupon('${c.code}')"><i class="ri-delete-bin-line"></i> Delete</button>
        </td>
      </tr>
    `).join('');
  }

  function handleCouponSubmit(e) {
    e.preventDefault();
    const code = document.getElementById('couponCode').value.trim().toUpperCase();
    const type = document.getElementById('couponType').value;
    const value = parseFloat(document.getElementById('couponValue').value) || 10;
    const minOrder = parseFloat(document.getElementById('couponMinOrder').value) || 0;
    const maxDiscount = parseFloat(document.getElementById('couponMaxDiscount').value) || 1000;
    const description = document.getElementById('couponDesc').value.trim();

    if (!code) return;

    StoreEngine.Coupons.save({
      code,
      type,
      value,
      minOrder,
      maxDiscount,
      description,
      isActive: true
    });

    document.getElementById('couponForm').reset();
    renderCoupons();
    showToast(`Privilege code ${code} activated.`);
  }

  function deleteCoupon(code) {
    if (confirm(`Delete coupon ${code}?`)) {
      StoreEngine.Coupons.delete(code);
      renderCoupons();
      showToast(`Coupon ${code} removed.`);
    }
  }

  // ---------------------------------------------------------------------------
  // 9. SHIPPING SETTINGS & PINCODE TESTER
  // ---------------------------------------------------------------------------
  function renderShipping() {
    const settings = StoreEngine.Shipping.getSettings();
    document.getElementById('shipFreeThreshold').value = settings.freeThreshold;
    document.getElementById('shipStandardRate').value = settings.standardRate;
    document.getElementById('shipExpressRate').value = settings.expressRate;
  }

  function saveShippingSettings() {
    const settings = {
      freeThreshold: parseFloat(document.getElementById('shipFreeThreshold').value) || 1499,
      standardRate: parseFloat(document.getElementById('shipStandardRate').value) || 99,
      expressRate: parseFloat(document.getElementById('shipExpressRate').value) || 199
    };
    StoreEngine.Shipping.saveSettings(settings);
    showToast('Shipping rules saved.');
  }

  function testPincode() {
    const pin = document.getElementById('testPincodeInput').value;
    const res = StoreEngine.Shipping.checkPincode(pin);
    const box = document.getElementById('pincodeTestResult');

    if (res.valid) {
      box.innerHTML = `
        <div style="background:rgba(46,204,113,0.1); border:1px solid rgba(46,204,113,0.3); padding:12px; border-radius:6px; color:#58d68d; font-size:0.85rem;">
          <i class="ri-checkbox-circle-fill"></i> <strong>PIN ${res.pincode} Serviceable (${res.tier})</strong><br>
          ${res.message}
        </div>
      `;
    } else {
      box.innerHTML = `
        <div style="background:rgba(231,76,60,0.1); border:1px solid rgba(231,76,60,0.3); padding:12px; border-radius:6px; color:#ec7063; font-size:0.85rem;">
          <i class="ri-error-warning-fill"></i> ${res.message}
        </div>
      `;
    }
  }

  // ---------------------------------------------------------------------------
  // 10. BACKUP & RESTORE
  // ---------------------------------------------------------------------------
  function exportDatabase() {
    const backup = {
      products: StoreEngine.Products.getAll(),
      orders: StoreEngine.Orders.getAll(),
      rates: StoreEngine.MetalPricing.getRates(),
      coupons: StoreEngine.Coupons.getAll(),
      shipping: StoreEngine.Shipping.getSettings(),
      exportedAt: new Date().toISOString(),
      store: 'Aura & Artisan Haute Joaillerie'
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aura_artisan_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Catalog & orders snapshot downloaded.');
  }

  function importDatabase(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = JSON.parse(e.target.result);
        if (data.products && Array.isArray(data.products)) {
          localStorage.setItem(StoreEngine.STORAGE_KEYS.PRODUCTS, JSON.stringify(data.products));
        }
        if (data.orders && Array.isArray(data.orders)) {
          localStorage.setItem(StoreEngine.STORAGE_KEYS.ORDERS, JSON.stringify(data.orders));
        }
        if (data.rates) {
          localStorage.setItem(StoreEngine.STORAGE_KEYS.METAL_RATES, JSON.stringify(data.rates));
        }
        refreshCurrentTab();
        showToast('Store data successfully restored from backup.');
      } catch (err) {
        alert('Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
  }

  function resetToDefaults() {
    if (confirm('WARNING: This will reset all products, orders, and rates back to demo catalog. Proceed?')) {
      localStorage.clear();
      StoreEngine.init();
      refreshCurrentTab();
      showToast('Store reset to baseline catalog.');
    }
  }

  // ---------------------------------------------------------------------------
  // 11. TOAST UTILITY
  // ---------------------------------------------------------------------------
  let toastTimer = null;
  function showToast(message) {
    let toast = document.getElementById('adminToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'adminToast';
      toast.className = 'admin-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="ri-information-fill" style="color:var(--admin-gold);"></i> ${message}`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // ---------------------------------------------------------------------------
  // 12. INITIALIZATION
  // ---------------------------------------------------------------------------
  
  // ---------------------------------------------------------------------------
  // SIDEBAR DRAWER CONTROLLER (MOBILE & TABLET)
  // ---------------------------------------------------------------------------
  function openSidebar() {
    const sidebar = document.getElementById('adminSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar) sidebar.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    const sidebar = document.getElementById('adminSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  function toggleSidebar() {
    const sidebar = document.getElementById('adminSidebar');
    if (sidebar && sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Nav Click Listeners
    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const tab = this.dataset.tab;
        if (tab) switchTab(tab);
      });
    });

    // Form Event Listeners
    const productForm = document.getElementById('productForm');
    if (productForm) productForm.addEventListener('submit', handleProductSubmit);

    const couponForm = document.getElementById('couponForm');
    if (couponForm) couponForm.addEventListener('submit', handleCouponSubmit);

    // Mobile Sidebar Drawer Triggers
    const toggleBtn = document.getElementById('adminSidebarToggle');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleSidebar);

    const closeBtn = document.getElementById('sidebarCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);

    const backdrop = document.getElementById('sidebarBackdrop');
    if (backdrop) backdrop.addEventListener('click', closeSidebar);

    // Initial Render
    switchTab('overview');
  });

  // Global Export
  window.AdminApp = {
    switchTab: switchTab,
    openSidebar: openSidebar,
    closeSidebar: closeSidebar,
    toggleSidebar: toggleSidebar,
    editProduct: openProductModal,
    openNewProductModal: () => openProductModal(null),
    closeProductModal: closeProductModal,
    deleteProduct: deleteProduct,
    adjustStock: adjustStock,
    saveStockInput: saveStockInput,
    fetchLiveMetals: fetchLiveMetals,
    saveManualMetals: saveManualMetals,
    recalculateAllStorePrices: recalculateAllStorePrices,
    calculateSampleMetalPrice: calculateSampleMetalPrice,
    changeOrderStatus: changeOrderStatus,
    viewInvoice: viewInvoice,
    closeInvoiceModal: closeInvoiceModal,
    printInvoice: printInvoice,
    deleteCoupon: deleteCoupon,
    saveShippingSettings: saveShippingSettings,
    testPincode: testPincode,
    exportDatabase: exportDatabase,
    importDatabase: importDatabase,
    resetToDefaults: resetToDefaults,
    renderProducts: renderProducts,
    renderOrders: renderOrders,
    renderInventory: renderInventory,
    showToast: showToast
  };

})();
