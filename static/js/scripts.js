
  // Global variables
let currentTheme = "light"
const isTyping = false
let typingIndex = 0
const typingText = "Uzbekistan"
let products = []
let news = []
let currentFilter = "all"

const TELEGRAM_BOT_TOKEN = "8247224955:AAHeXJG4NFRCTeRn95HaVlbW6KgBlFt8gMM"
const TELEGRAM_CHAT_ID = "6557500438"

// Initialize the website
document.addEventListener("DOMContentLoaded", () => {
  initializeWebsite()
  generateProducts()
  generateNews()
  startTypingAnimation()
  startCounterAnimation()
  initializeScrollEffects()
  loadFormData()
  initializeGallery() // Added gallery initialization
})

// Initialize website functionality
function initializeWebsite() {
  document.documentElement.setAttribute("data-theme", "light")

  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Initialize intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  }, observerOptions)

  // Observe all sections
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section)
  })
}

// Theme toggle functionality
function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light"
  document.documentElement.setAttribute("data-theme", currentTheme)
  localStorage.setItem("theme", currentTheme)

  // Show notification
  showNotification(`${currentTheme === "dark" ? "Qora" : "Oq"} mavzuga o'tkazildi`)
}



// Mobile menu toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu")
  mobileMenu.classList.toggle("hidden")
}

 const closeMobileMenu = () => {
    document.getElementById("mobileMenu").classList.add("hidden")
  }

// Typing animation
function startTypingAnimation() {
  const typingElement = document.getElementById("typingText")
  if (!typingElement) return

  function typeText() {
    if (typingIndex < typingText.length) {
      typingElement.textContent = typingText.substring(0, typingIndex + 1)
      typingIndex++
      setTimeout(typeText, 150)
    } else {
      setTimeout(() => {
        typingIndex = 0
        typingElement.textContent = ""
        setTimeout(typeText, 500)
      }, 2000)
    }
  }

  typeText()
}

// Counter animation
function startCounterAnimation() {
  const counters = document.querySelectorAll(".counter")

  const animateCounter = (counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.floor(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  }

  // Intersection observer for counters
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        counterObserver.unobserve(entry.target)
      }
    })
  })

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })
}

// Scroll effects
function initializeScrollEffects() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    // Progress bar
    const progressBar = document.getElementById("progressBar")
    const scrollPercent = (scrolled / (document.body.scrollHeight - window.innerHeight)) * 100
    progressBar.style.width = scrollPercent + "%"

    // Back to top button
    const backToTop = document.getElementById("backToTop")
    if (scrolled > 300) {
      backToTop.classList.add("show")
    } else {
      backToTop.classList.remove("show")
    }

    // Parallax effect
    const parallaxElements = document.querySelectorAll(".parallax-bg")
    parallaxElements.forEach((element) => {
      element.style.transform = `translateY(${rate}px)`
    })
  })
}


  products = productCategories
  renderProducts()
}

function generateNews() {
  const newsData = [
    {
      id: 1,
      title: "Yangi CNC stanoklar keldi",
      date: "15 Dekabr, 2024",
      excerpt: "Eng zamonaviy CNC stanoklar Kosonsoy Stanoklar Dunyosida. Yuqori aniqlik va tezlik...",
      content: `
                <p>Hurmatli mijozlar! Sizlarga xursandchilik bilan e'lon qilamizki, eng zamonaviy CNC stanoklar keldi.</p>
                <p>Yangi stanoklar quyidagi xususiyatlarga ega:</p>
                <ul>
                    <li>Yuqori aniqlik - 0.001mm gacha</li>
                    <li>Tez ishlov berish tezligi</li>
                    <li>Avtomatik boshqaruv tizimi</li>
                    <li>Energiya tejamkor texnologiya</li>
                </ul>
                <p>Batafsil ma'lumot uchun bizga murojaat qiling.</p>
                <p>Telefon: +998 71 123 45 67</p>
            `,

    },
    {
      id: 2,
      title: "Qish mavsumi uchun maxsus chegirmalar",
      date: "10 Dekabr, 2024",
      excerpt: "Qish mavsumi uchun barcha stanok ehtiyot qismlariga 25% gacha chegirma...",
      content: `
                <p>Qish mavsumi yaqinlashib kelmoqda va biz mijozlarimiz uchun ajoyib takliflar tayyorladik!</p>
                <p>15 dekabr - 15 yanvar oralig'ida barcha stanok ehtiyot qismlariga 25% gacha chegirma!</p>
                <p>Chegirma quyidagi mahsulotlarga taalluqlidir:</p>
                <ul>
                    <li>CNC stanok qismlari - 25% chegirma</li>
                    <li>Tokarniy stanok qismlari - 20% chegirma</li>
                    <li>Elektr qismlari - 15% chegirma</li>
                    <li>Hidravlik qismlar - 18% chegirma</li>
                </ul>
                <p>Bu ajoyib imkoniyatni qo'ldan boy bermang!</p>
            `,

    },
    {
      id: 3,
      title: "Professional ta'lim kurslari boshlandi",
      date: "5 Dekabr, 2024",
      excerpt: "Stanok operatorlari uchun professional ta'lim kurslari. Sertifikat bilan...",
      content: `
                <p>Stanok operatorlari uchun professional ta'lim kurslari boshlandi.</p>
                <p>Kurs dasturi:</p>
                <ul>
                    <li>CNC stanoklar bilan ishlash</li>
                    <li>Xavfsizlik qoidalari</li>
                    <li>Texnik xizmat ko'rsatish</li>
                    <li>Amaliy mashg'ulotlar</li>
                </ul>
                <p>Kurs yakunida rasmiy sertifikat beriladi.</p>
                <p>Ro'yxatdan o'tish uchun: +998 71 123 45 67</p>
            `,
      image: "/logo.jpg?height=300&width=500",
    },
  ]

  news = newsData
  renderNews()
}

function renderProducts() {
  const productsGrid = document.getElementById("productsGrid")
  let filteredProducts = currentFilter === "all" ? products : products.filter((p) => p.category === currentFilter)

  // Show only first 6 products if showing all, otherwise show all filtered products
  if (currentFilter === "all") {
    filteredProducts = filteredProducts.slice(0, 6)
  }

  productsGrid.innerHTML = filteredProducts
    .map(
      (product) => `
        <div class="product-card" onclick="openProductPage(${product.id})">
            <div class="h-48 bg-gray-200 flex items-center justify-center">
                <i class="fas fa-cog text-4xl text-gray-400"></i>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">${product.name}</h3>
                <p class="text-gray-600 mb-4">${product.description.substring(0, 80)}...</p>
                <div class="flex justify-between items-center">
                    <span class="text-2xl font-bold text-red-500">${product.price} so'm</span>
                    <button onclick="openProductPage(${product.id})" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                        <i class="fas fa-shopping-cart mr-1"></i>
                        Batafsil
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

function renderNews() {
  const newsGrid = document.getElementById("newsGrid")
  newsGrid.innerHTML = news
    .map(
      (article) => `
        <div class="news-card" onclick="openNewsPage(${article.id})">
            <div class="h-48 bg-gray-200 flex items-center justify-center">
                <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover">
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">${article.title}</h3>
                <p class="text-gray-600 mb-4">${article.excerpt}</p>
                <div class="flex justify-between items-center">
                    <span class="text-gray-600">${article.date}</span>
                    <button onclick="openNewsPage(${article.id})" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                        <i class="fas fa-eye mr-1"></i>
                        Ko'rsatish
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Filter products
function filterProducts(category) {
  currentFilter = category

  // Update filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active", "bg-red-500", "text-white")
    btn.classList.add("bg-gray-200", "text-gray-700")
  })

  // Find and update the clicked button
  const buttons = document.querySelectorAll(".filter-btn")
  buttons.forEach((btn) => {
    if (
      (category === "all" && btn.textContent.trim() === "Barchasi") ||
      (category === "cnc" && btn.textContent.trim() === "CNC Stanoklar") ||
      (category === "tokarny" && btn.textContent.trim() === "Tokarniy Stanoklar") ||
      (category === "frezerny" && btn.textContent.trim() === "Frezerniy Stanoklar") ||
      (category === "elektr" && btn.textContent.trim() === "Elektr Qismlari")
    ) {
      btn.classList.add("active", "bg-red-500", "text-white")
      btn.classList.remove("bg-gray-200", "text-gray-700")
    }
  })

  renderProducts()
}

// Products uchun
function openProductPage(productId) {
  window.location.href = `product-detail.html?id=${productId}`
}

// News uchun
function openNewsPage(newsId) {
  window.location.href = `news-detail.html?id=${newsId}`
}

function openProductModal(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  document.getElementById("productModalTitle").textContent = product.name
  document.getElementById("productModalPrice").textContent = product.price + " so'm"
  document.getElementById("productModalDescription").textContent = product.description

  const modal = document.getElementById("productModal")
  modal.classList.remove("hidden")
  document.body.style.overflow = "hidden"
}

function closeProductModal() {
  const modal = document.getElementById("productModal")
  modal.classList.add("hidden")
  document.body.style.overflow = "auto"
}

function openNewsModal(newsId) {
  const article = news.find((n) => n.id === newsId)
  if (!article) return

  document.getElementById("newsModalTitle").textContent = article.title
  document.getElementById("newsModalDate").textContent = article.date
  document.getElementById("newsModalContent").innerHTML = article.content

  const modal = document.getElementById("newsModal")
  modal.classList.remove("hidden")
  document.body.style.overflow = "hidden"
}

function closeNewsModal() {
  const modal = document.getElementById("newsModal")
  modal.classList.add("hidden")
  document.body.style.overflow = "auto"
}

function orderProduct() {
  showNotification("Buyurtma qabul qilindi! Tez orada siz bilan bog'lanamiz.")
  closeProductModal()
}

function callForProduct() {
  window.open("tel:+998711234567", "_self")
}

// Add to cart
function addToCart(productName) {
  showNotification(`${productName} savatga qo'shildi!`)
}

function initializeGallery() {
  const carImage = document.getElementById("carImage")
  const thumbnails = document.querySelectorAll(".thumbnail")
  const nextBtn = document.getElementById("nextBtn")
  const prevBtn = document.getElementById("prevBtn")
  const prevBtn2 = document.getElementById("prevBtn2")
  const nextBtn2 = document.getElementById("nextBtn2")


  if (!carImage || !nextBtn || !prevBtn) {
    console.log("[v0] Gallery elements not found, skipping gallery initialization")
    return
  }

  const images = [
    "./rasmlar/photo_10_2025-08-31_14-44-43.jpg",
    "./rasmlar/photo_9_2025-08-31_14-44-43.jpg",
    "./rasmlar/photo_8_2025-08-31_14-44-43.jpg",
    "./rasmlar/photo_7_2025-08-31_14-44-43.jpg",
    "./rasmlar/photo_6_2025-08-31_14-44-43.jpg",
    "./rasmlar/photo_5_2025-08-31_14-44-43.jpg",
    "./rasmlar/photo_4_2025-08-31_14-44-43.jpg",
    "./rasmlar/photo_3_2025-08-31_14-44-43.jpg",
    "./rasmlar/photo_2_2025-08-31_14-44-43.jpg",
    "./rasmlar/photo_1_2025-08-31_14-44-43.jpg",
  ]
  let currentIndex = 0
  let autoRotateInterval

  function changeImage(newIndex) {
    carImage.style.opacity = "0.5"
    setTimeout(() => {
      carImage.src = images[newIndex]
      currentIndex = newIndex
      carImage.style.opacity = "1"
    }, 300)
  }

  function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length
      changeImage(nextIndex)
    }, 2000)
  }

  function stopAutoRotate() {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval)
    }
  }

  function restartAutoRotate() {
    stopAutoRotate()
    setTimeout(startAutoRotate, 5000) // Restart after 5 seconds of no interaction
  }

  // Thumbnail bosilganda asosiy rasmni almashtirish
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      changeImage(index)
      restartAutoRotate()
    })
  })
// O'ng tugma bosilganda sekin keyingi rasmga o'tish

  nextBtn.addEventListener("click", () => {
    const nextIndex = (currentIndex + 1) % images.length;
    carImage.style.transition = "opacity 0.5s ease"; // Add smooth transition
    changeImage(nextIndex);
    restartAutoRotate();
  });


 // Chap tugma
  prevBtn.addEventListener("click", () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    carImage.style.transition = "opacity 0.5s ease"; // Add smooth transition
    changeImage(prevIndex)
    restartAutoRotate()
  })


  nextBtn2.addEventListener("click", () => {
    const nextIndex = (currentIndex + 1) % images.length
    changeImage(nextIndex)

  })

  prevBtn.addEventListener("click", () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    changeImage(prevIndex)

  })
  startAutoRotate()

  const galleryContainer = carImage.parentElement
  galleryContainer.addEventListener("mouseenter", stopAutoRotate)
  galleryContainer.addEventListener("mouseleave", startAutoRotate)
}

// Modal functionality
function openConsultationModal() {
  document.getElementById("consultationModal").classList.remove("hidden")
}

function openPhoneModal() {
  document.getElementById("phoneModal").classList.remove("hidden")
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden")
}

// Form submissions
async function submitConsultation(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const name = formData.get("name") || event.target.querySelector('input[type="text"]').value
  const phone = formData.get("phone") || event.target.querySelector('input[type="tel"]').value
  const message = formData.get("message") || event.target.querySelector("textarea").value || "Konsultatsiya so'rovi"

  const telegramMessage = `
📩 Yangi konsultatsiya so'rovi:
👤 Ism: ${name}
📞 Telefon: ${phone}
💬 Xabar: ${message}
🕐 Vaqt: ${new Date().toLocaleString("uz-UZ")}
  `

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
      }),
    })

    showNotification("Konsultatsiya so'rovi yuborildi!")
    closeModal("consultationModal")
    event.target.reset()
  } catch (err) {
    console.error("Xatolik:", err)
    showNotification("Xatolik yuz berdi!", "error")
  }
}

async function submitForm(event) {
  event.preventDefault()

  const submitText = document.getElementById("submitText")
  const submitLoading = document.getElementById("submitLoading")

  submitText.classList.add("hidden")
  submitLoading.classList.remove("hidden")

  // Get form data
  const formData = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value,
    timestamp: new Date().toLocaleString("uz-UZ"),
  }

  // Save form data locally
  saveFormData(formData)

  // Send to Telegram
  const success = await sendToTelegram(formData)

  setTimeout(() => {
    submitText.classList.remove("hidden")
    submitLoading.classList.add("hidden")

    if (success) {
      showNotification("Xabar muvaffaqiyatli yuborildi!")
      document.getElementById("contactForm").reset()
    } else {
      showNotification("Xabar yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.", "error")
    }
  }, 2000)
}

async function sendToTelegram(formData) {
  try {
    // Format message for Telegram
    const message = `
🔔 Yangi xabar Kosonsoy Stanoklar saytidan!

👤 Ism: ${formData.fullName}
📧 Email: ${formData.email}
📞 Telefon: ${formData.phone}
💬 Xabar: ${formData.message}
🕐 Vaqt: ${formData.timestamp}

#yangi_xabar #kosonsoy_stanoklar
        `

    // Send to Telegram Bot API
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    })

    const result = await response.json()
    return result.ok
  } catch (error) {
    console.error("Telegram yuborishda xatolik:", error)
    return false
  }
}

// Form data persistence
function saveFormData(formData) {
  const savedForms = JSON.parse(localStorage.getItem("contactForms") || "[]")
  savedForms.push(formData)
  localStorage.setItem("contactForms", JSON.stringify(savedForms))
}

function loadFormData() {
  // Auto-fill form if user has previously filled it
  const savedForms = JSON.parse(localStorage.getItem("contactForms") || "[]")
  if (savedForms.length > 0) {
    const lastForm = savedForms[savedForms.length - 1]
    // Could auto-fill name and email for convenience
  }
}

// Utility functions
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: "smooth" })
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function showNotification(message, type = "success") {
  const notification = document.getElementById("notification")
  const notificationText = document.getElementById("notificationText")

  // Update notification style based on type
  notification.className = `notification px-6 py-3 rounded-lg shadow-lg ${type === "error" ? "bg-red-500" : "bg-green-500"
    } text-white`

  notificationText.textContent = message
  notification.classList.add("show")

  setTimeout(() => {
    notification.classList.remove("show")
  }, 4000)
}

function showAllBranches() {
  showNotification("Barcha filiallar ro'yxati yuklanmoqda...")
  // Here you would typically load more branches or redirect to a branches page
}

// Close modals when clicking outside
document.addEventListener("click", (event) => {
  const modals = document.querySelectorAll(".modal, .detail-modal")
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.classList.add("hidden")
      document.body.style.overflow = "auto"
    }
  })
})

// Keyboard shortcuts
document.addEventListener("keydown", (event) => {
  // ESC to close modals
  if (event.key === "Escape") {
    document.querySelectorAll(".modal, .detail-modal").forEach((modal) => {
      modal.classList.add("hidden")
    })
    document.body.style.overflow = "auto"
  }

  // Ctrl+K to open search (future feature)
  if (event.ctrlKey && event.key === "k") {
    event.preventDefault()
    // Open search modal
  }
})

// Performance optimization
let ticking = false
function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects)
    ticking = true
  }
}

function updateScrollEffects() {
  // Update scroll-based animations here
  ticking = false
}

// Error handling
window.addEventListener("error", (event) => {
  console.error("JavaScript error:", event.error)
  // Could show user-friendly error message
})

const savedTheme = localStorage.getItem("theme")
if (savedTheme) {
  currentTheme = savedTheme
  document.documentElement.setAttribute("data-theme", currentTheme)
} else {
  // Set default to light theme
  currentTheme = "light"
  document.documentElement.setAttribute("data-theme", "light")
}

const mainImage = document.querySelector("#mainProductImage");
const mainImagen = document.querySelector("#mainProductImage #nextBtn2");
const mainImagep = document.querySelector("#mainProductImage #prevBtn2");
const mainImagei = document.querySelector("#mainProductImage img");
const quitbtn2 = document.querySelector("#mainProductImage #quitbtn2");

quitbtn2.addEventListener("click", () => {
  mainImage.classList.add("hidden");
})

const rasmlar = document.querySelectorAll(".product-gallery img");
let currentIndex = 0;

rasmlar.forEach((rasm, index) => {
  rasm.addEventListener("click", () => {
    mainImage.classList.remove("hidden");
    mainImagei.src = rasmlar[index].src;
  })
})
// mainImagen bosilganda keyingi rasmga utish
mainImagen.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % rasmlar.length;
  mainImagei.style.transition = "opacity 0.5s ease"; // Add smooth transition
  mainImagei.style.opacity = "0"; // Start with opacity 0 for fade effect
  setTimeout(() => {
    mainImagei.src = rasmlar[currentIndex].src; // Change the image source
    mainImagei.style.opacity = "1"; // Fade in the new image
  }, 300); // Wait for 300ms before fading in the new image
});




// mainImagep bosilganda oldingi rasmga utish
mainImagep.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + rasmlar.length) % rasmlar.length;
  mainImagei.style.opacity = "0"; // Start with opacity 0 for fade effect
  setTimeout(() => {
    mainImagei.src = rasmlar[currentIndex].src; // Change the image source
    mainImagei.style.opacity = "1"; // Fade in the new image
  }, 300); // Wait for 300ms before changing the image
});






thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    currentIndex = index;
    changeImage();
  });
});

const changeImage = () => {
  mainImage.src = thumbnails[currentIndex].src;
};

