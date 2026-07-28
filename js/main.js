/* ============================================
   ЖК Ленская — Main JavaScript
   ============================================ */

// --- Apartment Data ---
const APARTMENTS_DATA = [
  { id: 1, rooms: 1, area: 42.5, floor: 3, totalFloors: 25, building: 1, section: 1, price: 6200000, status: 'free', hasBalcony: true, hasTerrace: false, view: 'двор', kitchen: 12.0, bathrooms: 1, planType: '1k' },
  { id: 2, rooms: 1, area: 45.8, floor: 8, totalFloors: 25, building: 1, section: 1, price: 6800000, status: 'free', hasBalcony: true, hasTerrace: false, view: 'река', kitchen: 13.5, bathrooms: 1, planType: '1k' },
  { id: 3, rooms: 2, area: 68.2, floor: 12, totalFloors: 25, building: 1, section: 1, price: 9500000, status: 'free', hasBalcony: true, hasTerrace: true, view: 'река', kitchen: 16.0, bathrooms: 1, planType: '2k' },
  { id: 4, rooms: 2, area: 72.1, floor: 5, totalFloors: 25, building: 1, section: 2, price: 10200000, status: 'reserved', hasBalcony: true, hasTerrace: false, view: 'двор', kitchen: 17.5, bathrooms: 1, planType: '2k' },
  { id: 5, rooms: 3, area: 95.4, floor: 18, totalFloors: 25, building: 1, section: 1, price: 14500000, status: 'free', hasBalcony: true, hasTerrace: true, view: 'река', kitchen: 20.0, bathrooms: 2, planType: '3k' },
  { id: 6, rooms: 3, area: 102.7, floor: 22, totalFloors: 25, building: 2, section: 1, price: 16800000, status: 'free', hasBalcony: true, hasTerrace: true, view: 'река', kitchen: 22.5, bathrooms: 2, planType: '3k' },
  { id: 7, rooms: 1, area: 38.9, floor: 6, totalFloors: 20, building: 2, section: 2, price: 5500000, status: 'sold', hasBalcony: false, hasTerrace: false, view: 'двор', kitchen: 11.0, bathrooms: 1, planType: '1k' },
  { id: 8, rooms: 2, area: 64.3, floor: 15, totalFloors: 25, building: 1, section: 2, price: 8900000, status: 'free', hasBalcony: true, hasTerrace: false, view: 'река', kitchen: 15.0, bathrooms: 1, planType: '2k' },
  { id: 9, rooms: 4, area: 128.5, floor: 20, totalFloors: 25, building: 2, section: 1, price: 22000000, status: 'free', hasBalcony: true, hasTerrace: true, view: 'река', kitchen: 25.0, bathrooms: 2, planType: '4k' },
  { id: 10, rooms: 1, area: 41.2, floor: 10, totalFloors: 20, building: 2, section: 2, price: 5900000, status: 'free', hasBalcony: true, hasTerrace: false, view: 'двор', kitchen: 11.5, bathrooms: 1, planType: '1k' },
  { id: 11, rooms: 2, area: 71.8, floor: 3, totalFloors: 25, building: 1, section: 1, price: 9800000, status: 'reserved', hasBalcony: true, hasTerrace: false, view: 'двор', kitchen: 16.5, bathrooms: 1, planType: '2k' },
  { id: 12, rooms: 3, area: 88.6, floor: 7, totalFloors: 20, building: 2, section: 2, price: 12500000, status: 'free', hasBalcony: true, hasTerrace: false, view: 'лес', kitchen: 18.0, bathrooms: 2, planType: '3k' },
  { id: 13, rooms: 1, area: 44.1, floor: 14, totalFloors: 25, building: 1, section: 1, price: 6500000, status: 'free', hasBalcony: true, hasTerrace: false, view: 'река', kitchen: 12.5, bathrooms: 1, planType: '1k' },
  { id: 14, rooms: 2, area: 66.9, floor: 21, totalFloors: 25, building: 1, section: 2, price: 10800000, status: 'free', hasBalcony: true, hasTerrace: true, view: 'река', kitchen: 15.5, bathrooms: 1, planType: '2k' },
  { id: 15, rooms: 3, area: 98.2, floor: 25, totalFloors: 25, building: 2, section: 1, price: 18200000, status: 'free', hasBalcony: true, hasTerrace: true, view: 'река', kitchen: 21.0, bathrooms: 2, planType: '3k' },
  { id: 16, rooms: 1, area: 40.3, floor: 4, totalFloors: 20, building: 2, section: 2, price: 5700000, status: 'sold', hasBalcony: false, hasTerrace: false, view: 'двор', kitchen: 11.0, bathrooms: 1, planType: '1k' },
  { id: 17, rooms: 2, area: 73.5, floor: 9, totalFloors: 25, building: 1, section: 1, price: 10500000, status: 'free', hasBalcony: true, hasTerrace: true, view: 'лес', kitchen: 17.0, bathrooms: 1, planType: '2k' },
  { id: 18, rooms: 4, area: 135.8, floor: 23, totalFloors: 25, building: 2, section: 1, price: 24500000, status: 'free', hasBalcony: true, hasTerrace: true, view: 'река', kitchen: 28.0, bathrooms: 3, planType: '4k' },
];

// --- State ---
let favorites = JSON.parse(localStorage.getItem('lenskaya_favorites') || '[]');
let currentFilters = {};
let displayedCount = 6;
let isMenuOpen = false;

// --- DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initBurgerMenu();
  initScrollAnimations();
  initFavoritesCounters();
  initParticles();
  
  // Page-specific init
  if (document.querySelector('.catalog-filters')) initCatalog();
  if (document.querySelector('.detail-page')) initDetailPage();
  if (document.querySelector('.favorites-page')) initFavoritesPage();
  if (document.querySelector('.gallery-page')) initGallery();
  initForms();
  initModals();
});

// --- Header ---
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });
  
  // Check initial state
  if (window.scrollY > 50) header.classList.add('scrolled');
}

// --- Burger Menu ---
function initBurgerMenu() {
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!burger || !mobileMenu) return;
  
  burger.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    burger.classList.toggle('active', isMenuOpen);
    mobileMenu.classList.toggle('active', isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  });
  
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      isMenuOpen = false;
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// --- Scroll Animations ---
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  if (!elements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  elements.forEach(el => observer.observe(el));
}

// --- Particles ---
function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'hero-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (6 + Math.random() * 6) + 's';
    container.appendChild(particle);
  }
}

// --- Favorites ---
function getFavorites() {
  return JSON.parse(localStorage.getItem('lenskaya_favorites') || '[]');
}

function toggleFavorite(id) {
  let favs = getFavorites();
  const idx = favs.indexOf(id);
  if (idx > -1) {
    favs.splice(idx, 1);
    showToast('Удалено из избранного');
  } else {
    favs.push(id);
    showToast('Добавлено в избранное');
  }
  localStorage.setItem('lenskaya_favorites', JSON.stringify(favs));
  favorites = favs;
  updateFavoritesUI();
  return favs;
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function updateFavoritesUI() {
  const favs = getFavorites();
  
  // Update counter
  document.querySelectorAll('.header-favorites-count').forEach(el => {
    el.textContent = favs.length;
    el.classList.toggle('active', favs.length > 0);
  });
  
  // Update card buttons
  document.querySelectorAll('.apartment-card-fav').forEach(btn => {
    const id = parseInt(btn.dataset.id);
    btn.classList.toggle('active', isFavorite(id));
  });
}

function initFavoritesCounters() {
  updateFavoritesUI();
}

// --- Catalog ---
function initCatalog() {
  const filterSelects = document.querySelectorAll('.filter-select, .filter-input');
  const resetBtn = document.querySelector('.filter-reset');
  const loadMoreBtn = document.querySelector('.load-more-btn');
  
  filterSelects.forEach(el => {
    el.addEventListener('change', applyFilters);
    el.addEventListener('input', debounce(applyFilters, 300));
  });
  
  if (resetBtn) {
    resetBtn.addEventListener('click', resetFilters);
  }
  
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      displayedCount += 6;
      renderApartments();
    });
  }
  
  renderApartments();
}

function getFilterValues() {
  return {
    rooms: document.querySelector('[data-filter="rooms"]')?.value || '',
    areaMin: parseFloat(document.querySelector('[data-filter="area-min"]')?.value) || 0,
    areaMax: parseFloat(document.querySelector('[data-filter="area-max"]')?.value) || Infinity,
    priceMin: parseFloat(document.querySelector('[data-filter="price-min"]')?.value) || 0,
    priceMax: parseFloat(document.querySelector('[data-filter="price-max"]')?.value) || Infinity,
    floorMin: parseInt(document.querySelector('[data-filter="floor-min"]')?.value) || 0,
    floorMax: parseInt(document.querySelector('[data-filter="floor-max"]')?.value) || Infinity,
    status: document.querySelector('[data-filter="status"]')?.value || '',
    building: document.querySelector('[data-filter="building"]')?.value || '',
  };
}

function filterApartments(data, filters) {
  return data.filter(apt => {
    if (filters.rooms && filters.rooms !== '' && apt.rooms !== parseInt(filters.rooms)) return false;
    if (apt.area < filters.areaMin) return false;
    if (filters.areaMax !== Infinity && apt.area > filters.areaMax) return false;
    if (apt.price < filters.priceMin) return false;
    if (filters.priceMax !== Infinity && apt.price > filters.priceMax) return false;
    if (apt.floor < filters.floorMin) return false;
    if (filters.floorMax !== Infinity && apt.floor > filters.floorMax) return false;
    if (filters.status && filters.status !== '' && apt.status !== filters.status) return false;
    if (filters.building && filters.building !== '' && apt.building !== parseInt(filters.building)) return false;
    // Hide sold by default unless explicitly requested
    if (apt.status === 'sold' && filters.status !== 'sold') return false;
    return true;
  });
}

function applyFilters() {
  currentFilters = getFilterValues();
  displayedCount = 6;
  renderApartments();
}

function resetFilters() {
  document.querySelectorAll('.filter-select').forEach(el => el.value = '');
  document.querySelectorAll('.filter-input').forEach(el => el.value = '');
  currentFilters = {};
  displayedCount = 6;
  renderApartments();
}

function renderApartments() {
  const container = document.querySelector('.apartments-grid');
  const countEl = document.querySelector('.filter-count');
  const loadMoreBtn = document.querySelector('.load-more-btn');
  if (!container) return;
  
  const filters = Object.keys(currentFilters).length ? currentFilters : getFilterValues();
  const filtered = filterApartments(APARTMENTS_DATA, filters);
  const toShow = filtered.slice(0, displayedCount);
  
  if (countEl) {
    countEl.textContent = `Найдено: ${filtered.length} квартир`;
  }
  
  container.innerHTML = toShow.map(apt => createApartmentCard(apt)).join('');
  
  if (loadMoreBtn) {
    loadMoreBtn.style.display = filtered.length > displayedCount ? '' : 'none';
  }
  
  // Re-init fav buttons
  container.querySelectorAll('.apartment-card-fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite(parseInt(btn.dataset.id));
    });
  });
  
  updateFavoritesUI();
}

function createApartmentCard(apt) {
  const statusLabels = { free: 'Свободна', reserved: 'Бронь', sold: 'Продано' };
  const statusClasses = { free: 'status-free', reserved: 'status-reserved', sold: 'status-sold' };
  const roomLabels = { 1: 'Студия', 2: '1-комнатная', 3: '2-комнатная', 4: '3-комнатная' };
  
  // Use rooms-1 as index for label, or direct mapping
  let roomLabel;
  if (apt.rooms === 1) roomLabel = 'Студия';
  else if (apt.rooms === 2) roomLabel = '1-комнатная';
  else if (apt.rooms === 3) roomLabel = '2-комнатная';
  else roomLabel = '3-комнатная';
  
  const priceFormatted = apt.status === 'sold' ? 'Продано' : formatPrice(apt.price);
  const favClass = isFavorite(apt.id) ? 'active' : '';
  
  return `
    <div class="apartment-card fade-in" data-id="${apt.id}">
      <a href="apartment-detail.html?id=${apt.id}" class="apartment-card-link">
        <div class="apartment-card-image">
          <div class="plan-placeholder">
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="8" y="8" width="48" height="48" rx="2"/>
              <line x1="8" y1="28" x2="40" y2="28"/>
              <line x1="40" y1="8" x2="40" y2="28"/>
              <line x1="24" y1="28" x2="24" y2="56"/>
              <line x1="24" y1="40" x2="56" y2="40"/>
            </svg>
          </div>
          <span class="apartment-card-status ${statusClasses[apt.status]}">${statusLabels[apt.status]}</span>
          <button class="apartment-card-fav ${favClass}" data-id="${apt.id}" title="В избранное">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
        <div class="apartment-card-body">
          <div class="apartment-card-type">${roomLabel}</div>
          <div class="apartment-card-title">Квартира ${apt.id} · Корпус ${apt.building} · Этаж ${apt.floor}</div>
          <div class="apartment-card-specs">
            <div class="apartment-card-spec">
              <span class="apartment-card-spec-value">${apt.area} м²</span>
              <span class="apartment-card-spec-label">Площадь</span>
            </div>
            <div class="apartment-card-spec">
              <span class="apartment-card-spec-value">${apt.floor}/${apt.totalFloors}</span>
              <span class="apartment-card-spec-label">Этаж</span>
            </div>
            <div class="apartment-card-spec">
              <span class="apartment-card-spec-value">${apt.view}</span>
              <span class="apartment-card-spec-label">Вид</span>
            </div>
          </div>
          <div class="apartment-card-footer">
            <div class="apartment-card-price">${priceFormatted}</div>
            <span class="btn btn-sm btn-outline">Подробнее</span>
          </div>
        </div>
      </a>
    </div>
  `;
}

function formatPrice(price) {
  if (!price) return 'По запросу';
  return (price / 1000000).toFixed(1) + ' млн ₽';
}

// --- Detail Page ---
function initDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const apt = APARTMENTS_DATA.find(a => a.id === id);
  
  if (!apt) {
    document.querySelector('.detail-page').innerHTML = `
      <div class="error-page" style="padding-top: 120px;">
        <h2>Квартира не найдена</h2>
        <p>Вернитесь в каталог для выбора квартиры</p>
        <a href="apartments.html" class="btn btn-primary">Перейти в каталог</a>
      </div>
    `;
    return;
  }
  
  populateDetail(apt);
}

function populateDetail(apt) {
  const statusLabels = { free: 'Свободна', reserved: 'Бронь', sold: 'Продано' };
  const statusClasses = { free: 'free', reserved: 'reserved', sold: 'sold' };
  
  let roomLabel;
  if (apt.rooms === 1) roomLabel = 'Студия';
  else if (apt.rooms === 2) roomLabel = '1-комнатная';
  else if (apt.rooms === 3) roomLabel = '2-комнатная';
  else roomLabel = '3-комнатная';
  
  // Update page elements
  const el = (sel) => document.querySelector(sel);
  if (el('.detail-room-type')) el('.detail-room-type').textContent = roomLabel;
  if (el('.detail-title')) el('.detail-title').textContent = `Квартира ${apt.id}`;
  if (el('.detail-status')) {
    el('.detail-status').className = `detail-status ${statusClasses[apt.status]}`;
    el('.detail-status').textContent = statusLabels[apt.status];
  }
  if (el('.detail-price')) {
    el('.detail-price').innerHTML = apt.status === 'sold' ? 'Продано' : `${formatPrice(apt.price)} <span>за всю квартиру</span>`;
  }
  if (el('.detail-area')) el('.detail-area').textContent = `${apt.area} м²`;
  if (el('.detail-floor')) el('.detail-floor').textContent = `${apt.floor} из ${apt.totalFloors}`;
  if (el('.detail-kitchen')) el('.detail-kitchen').textContent = `${apt.kitchen} м²`;
  if (el('.detail-building')) el('.detail-building').textContent = `Корпус ${apt.building}`;
  if (el('.detail-view')) el('.detail-view').textContent = apt.view;
  if (el('.detail-bathrooms')) el('.detail-bathrooms').textContent = apt.bathrooms;
  if (el('.detail-balcony')) el('.detail-balcony').textContent = apt.hasBalcony ? 'Есть' : 'Нет';
  if (el('.detail-terrace')) el('.detail-terrace').textContent = apt.hasTerrace ? 'Есть' : 'Нет';
  
  // Fav button
  const favBtn = el('.detail-fav-btn');
  if (favBtn) {
    const updateFavBtn = () => {
      favBtn.classList.toggle('active', isFavorite(apt.id));
      favBtn.querySelector('span').textContent = isFavorite(apt.id) ? 'В избранном' : 'В избранное';
    };
    updateFavBtn();
    favBtn.addEventListener('click', () => {
      toggleFavorite(apt.id);
      updateFavBtn();
    });
  }
  
  // Set form apartment ID
  const formAptInput = el('input[name="apartment_id"]');
  if (formAptInput) formAptInput.value = apt.id;
}

// --- Favorites Page ---
function initFavoritesPage() {
  renderFavoritesPage();
}

function renderFavoritesPage() {
  const container = document.querySelector('.favorites-grid');
  const emptyState = document.querySelector('.favorites-empty');
  if (!container) return;
  
  const favs = getFavorites();
  const favApartments = APARTMENTS_DATA.filter(a => favs.includes(a.id));
  
  if (favApartments.length === 0) {
    container.style.display = 'none';
    if (emptyState) emptyState.style.display = '';
    return;
  }
  
  if (emptyState) emptyState.style.display = 'none';
  container.style.display = '';
  container.innerHTML = favApartments.map(apt => createApartmentCard(apt)).join('');
  
  container.querySelectorAll('.apartment-card-fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite(parseInt(btn.dataset.id));
      renderFavoritesPage();
    });
  });
}

// --- Gallery ---
function initGallery() {
  const items = document.querySelectorAll('[data-lightbox]');
  if (!items.length) return;
  
  const galleryItems = Array.from(items);
  
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      openLightboxGallery(galleryItems, index);
    });
  });
}

function openLightboxGallery(items, startIndex) {
  let currentIndex = startIndex;
  
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Закрыть">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <button class="lightbox-nav lightbox-prev" aria-label="Предыдущий">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15,18 9,12 15,6"/></svg>
      </button>
      <div class="lightbox-image-container">
        <img class="lightbox-image" src="" alt="">
        <div class="lightbox-caption"></div>
      </div>
      <button class="lightbox-nav lightbox-next" aria-label="Следующий">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9,18 15,12 9,6"/></svg>
      </button>
      <div class="lightbox-counter"></div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('active'));
  
  const img = overlay.querySelector('.lightbox-image');
  const caption = overlay.querySelector('.lightbox-caption');
  const counter = overlay.querySelector('.lightbox-counter');
  const prevBtn = overlay.querySelector('.lightbox-prev');
  const nextBtn = overlay.querySelector('.lightbox-next');
  const closeBtn = overlay.querySelector('.lightbox-close');
  
  function showSlide(index) {
    const item = items[index];
    const src = item.dataset.lightboxSrc || item.querySelector('img')?.src || '';
    const cap = item.dataset.lightboxCaption || item.dataset.caption || '';
    const id = item.dataset.lightboxId || '';
    
    img.src = src;
    img.alt = cap;
    caption.innerHTML = cap + (id ? `<div class="lightbox-caption-id">${id}</div>` : '');
    counter.textContent = `${index + 1} / ${items.length}`;
  }
  
  function next() {
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
  }
  
  function prev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(currentIndex);
  }
  
  function close() {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  }
  
  showSlide(currentIndex);
  
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  closeBtn.addEventListener('click', close);
  
  // Keyboard navigation
  document.addEventListener('keydown', function onKey(e) {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
  });
  
  // Touch swipe
  let touchStartX = 0;
  overlay.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  overlay.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next(); else prev();
    }
  }, { passive: true });
  
  // Click outside to close
  overlay.querySelector('.lightbox-content').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) close();
  });
}

function openLightbox(src, caption) {
  // Legacy fallback
  const items = [{ dataset: { lightbox: '', lightboxSrc: src, lightboxCaption: caption } }];
  openLightboxGallery(items, 0);
}

// --- Forms ---
function initForms() {
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
  });
  
  // Phone mask
  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', phoneMask);
    input.addEventListener('focus', (e) => {
      if (!e.target.value) e.target.value = '+7 ';
    });
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formType = form.dataset.form;
  
  // Basic validation
  const name = form.querySelector('[name="name"]');
  const phone = form.querySelector('[name="phone"]');
  const consent = form.querySelector('[name="consent"]');
  
  if (!name?.value.trim()) {
    showFieldError(name, 'Введите имя');
    return;
  }
  
  if (!phone?.value.trim() || phone.value.replace(/\D/g, '').length < 11) {
    showFieldError(phone, 'Введите корректный телефон');
    return;
  }
  
  if (consent && !consent.checked) {
    showToast('Необходимо согласие на обработку данных');
    return;
  }
  
  // Collect data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  data.form_type = formType;
  data.url = window.location.href;
  data.timestamp = new Date().toISOString();
  
  // Store in localStorage (would be sent to CRM in production)
  const leads = JSON.parse(localStorage.getItem('lenskaya_leads') || '[]');
  leads.push(data);
  localStorage.setItem('lenskaya_leads', JSON.stringify(leads));
  
  // Analytics event
  if (typeof gtag !== 'undefined') {
    gtag('event', 'form_submit', { form_type: formType });
  }
  
  // Show success
  form.style.display = 'none';
  const success = form.nextElementSibling;
  if (success?.classList.contains('form-success')) {
    success.classList.add('active');
  } else {
    showToast('Заявка отправлена! Мы свяжемся с вами.');
  }
  
  // Close modal if in modal
  setTimeout(() => {
    const modal = form.closest('.modal-overlay');
    if (modal) modal.classList.remove('active');
  }, 2000);
}

function showFieldError(field, message) {
  field.style.borderColor = 'var(--color-error)';
  field.focus();
  showToast(message);
  setTimeout(() => { field.style.borderColor = ''; }, 3000);
}

function phoneMask(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length === 0) {
    e.target.value = '';
    return;
  }
  if (value[0] === '8') value = '7' + value.slice(1);
  if (value[0] !== '7') value = '7' + value;
  
  let formatted = '+7';
  if (value.length > 1) formatted += ' (' + value.slice(1, 4);
  if (value.length > 4) formatted += ') ' + value.slice(4, 7);
  if (value.length > 7) formatted += '-' + value.slice(7, 9);
  if (value.length > 9) formatted += '-' + value.slice(9, 11);
  
  e.target.value = formatted;
}

// --- Modals ---
function initModals() {
  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.dataset.modal;
      openModal(modalId);
    });
  });
  
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  });
  
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay').classList.remove('active');
    });
  });
  
  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Focus first input
    setTimeout(() => {
      const firstInput = modal.querySelector('input');
      if (firstInput) firstInput.focus();
    }, 100);
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// --- Toast ---
function showToast(message, duration = 3000) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.classList.add('active');
  });
  
  setTimeout(() => {
    toast.classList.remove('active');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// --- Utility ---
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Smooth scroll for anchor links
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  
  const target = document.querySelector(link.getAttribute('href'));
  if (!target) return;
  
  e.preventDefault();
  const headerOffset = 80;
  const elementPosition = target.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
});
