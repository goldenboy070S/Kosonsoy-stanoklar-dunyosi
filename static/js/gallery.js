function changeLanguage() {
    const select = document.getElementById('languageSelect');
    const selectedLanguage = select.value;
    window.location.href = `?lang=${selectedLanguage}`;
}



const carImage = document.getElementById('carImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const thumbnails = document.querySelectorAll('.thumbnail');

// Rasmlar ro'yxatini yaratish
const images = Array.from(thumbnails).map(thumb => thumb.src);
let currentIndex = 0;
let autoSlideInterval;

// Rasmni o'zgartirish funksiyasi
function changeImage(index) {
    currentIndex = (index + images.length) % images.length; // Tsiklni ta'minlash
    carImage.src = images[currentIndex];

    // Aktiv thumbnailni belgilash
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('border-blue-500', i === currentIndex);
        thumb.classList.toggle('border-transparent', i !== currentIndex);
    });
}

// Oldinga o'tish
function nextImage() {
    changeImage(currentIndex + 1);
}

// Orqaga o'tish
function prevImage() {
    changeImage(currentIndex - 1);
}

// Avtomatik aylanish funksiyasi
function startAutoSlide() {
    autoSlideInterval = setInterval(nextImage, 5000); // Har 5 sekundda o'zgaradi
}

// Avtomatik aylanishni to'xtatish
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Tugmalar uchun hodisalar
prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    prevImage();
    startAutoSlide();
});

nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    nextImage();
    startAutoSlide();
});

// Thumbnail rasmlarga bosish hodisasi
thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        stopAutoSlide();
        changeImage(index);
        startAutoSlide();
    });
});

// Galereya yuklanganda avtomatik aylanishni boshlash
document.addEventListener('DOMContentLoaded', () => {
    startAutoSlide();

    // Birinchi rasmni faol qilish
    thumbnails[0].classList.add('border-blue-500');
});

// Galereyaga kursor kelganda va chiqqanda avtomatik aylanishni boshqarish
carImage.parentElement.addEventListener('mouseenter', stopAutoSlide);
carImage.parentElement.addEventListener('mouseleave', startAutoSlide);
async function fetchProducts() {
  try {
    // Django API endpointidan ma'lumot olish
    const response = await fetch('/api/products/') // API endpointni o'zingizning URL'ingizga almashtiring
    const data = await response.json()
    products = data.products // Serverdan kelgan mahsulotlar
    renderProducts()
  } catch (error) {
    console.error("Mahsulotlarni yuklashda xatolik:", error)
    showNotification("Mahsulotlarni yuklashda xatolik yuz berdi!", "error")
  }
}

// Mahsulotlarni ko'rsatish

// Global o'zgaruvchi
// Global o'zgaruvchilar
let currentFilter = "all";
// categories va products bu yerda e'lon qilinmaydi, HTMLdan keladi

function filterProducts(category) {
  currentFilter = category;

  console.log("Filtering with category:", category); // Debug uchun

  // Update filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active", "bg-red-500", "text-white");
    btn.classList.add("bg-gray-200", "text-gray-700");
  });

  // Find and update the clicked button dynamically
  if (typeof categories !== 'undefined' && categories.length > 0) {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach((btn) => {
      const btnName = btn.textContent.trim();
      const btnCategory = categories.find(cat => cat.name === btnName);
      if (btnCategory && (category === "all" || btnCategory.slug === category)) {
        btn.classList.add("active", "bg-red-500", "text-white");
        btn.classList.remove("bg-gray-200", "text-gray-700");
      }
    });
  } else {
    console.error("Categories is not defined or empty");
  }

  // Filter products using data-category
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");
    console.log("Card category:", cardCategory); // Debug uchun
    if (category === "all" || cardCategory === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none"; // Qolganlarni yashirish
    }
  });
}

function openProductModal(productId) {
  const product = products.find((p) => p.pk === productId);
  if (!product) return;

  document.getElementById("productModalTitle").textContent = product.fields.name;
  document.getElementById("productModalPrice").textContent = `$${product.fields.price}`;
  document.getElementById("productModalDescription").textContent = product.fields.description;

  const modal = document.getElementById("productModal");
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

function orderProduct() {
  showNotification("Buyurtma qabul qilindi! Tez orada siz bilan bog'lanamiz.");
  closeProductModal();
}

function addToCart(productName) {
  showNotification(`${productName} savatga qo'shildi!`);
}

function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  const notificationText = document.getElementById("notificationText");

  notification.className = `notification px-6 py-3 rounded-lg shadow-lg ${type === "error" ? "bg-red-500" : "bg-green-500"} text-white`;

  notificationText.textContent = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 4000);
}
//Yangiliklar
// Open news page (adjusted for Django URL from get_absolute_url)
function openNewsPage(url) {
  window.location.href = url; // url is the full absolute URL, e.g., '/news/slug/' or '/news/pk/'
}

// Optional: News modal functionality (kept for compatibility, but page navigation is primary)
function openNewsModal(newsId) {
  // Note: Since rendering is server-side, modal would require AJAX to fetch news content.
  // For simplicity, we're using page navigation (openNewsPage) as in the original design.
  console.log(`Modal for news ID ${newsId} not implemented; using page navigation instead.`);
}

function closeNewsModal() {
  const modal = document.getElementById("newsModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}
