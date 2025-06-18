//Disable right-click
document.addEventListener(
  "contextmenu",
  (e) => {
    e.preventDefault()
  },
  false,
)

// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll(".section")
  const portfolioCards = document.querySelectorAll(".portfolio-card")
  const modal = document.getElementById("imageModal")
  const modalImg = document.getElementById("modalImage")
  const closeModal = document.querySelector(".close")

  // Show home section by default
  document.getElementById("home").classList.add("active")

  // Mobile menu toggle
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  }

  // Navigation link clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Remove active class from all links and sections
      navLinks.forEach((l) => l.classList.remove("active"))
      sections.forEach((s) => s.classList.remove("active"))

      // Add active class to clicked link
      this.classList.add("active")

      // Show corresponding section
      const targetId = this.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        targetSection.classList.add("active")

        // Add loading animation
        targetSection.style.opacity = "0"
        setTimeout(() => {
          targetSection.style.opacity = "1"
          targetSection.classList.add("loading")
        }, 100)
      }

      // Close mobile menu
      if (hamburger) {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      }

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  })

  // Portfolio card clicks
  portfolioCards.forEach((card) => {
    card.addEventListener("click", function () {
      const level = this.getAttribute("data-level")
      const detailSection = document.getElementById(level + "-detail")

      if (detailSection) {
        // Hide portfolio main section
        document.getElementById("portfolio").classList.remove("active")

        // Show detail section
        detailSection.classList.add("active")

        // Add loading animation
        detailSection.style.opacity = "0"
        setTimeout(() => {
          detailSection.style.opacity = "1"
          detailSection.classList.add("loading")

          // Initialize portfolio filters for the active section
          setTimeout(() => {
            initializePortfolioFilters()
            bindImageModalEvents()
          }, 200)
        }, 100)

        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    })
  })

  // Function to bind image modal events
  function bindImageModalEvents() {
    // Select all images in portfolio detail sections and timeline images
    const portfolioImages = document.querySelectorAll(
      ".portfolio-detail-section.active .gallery-item img, .portfolio-detail-section.active .internship-images img, .about-section .timeline-image",
    )

    portfolioImages.forEach((img) => {
      // Remove existing click listeners (ถ้ามี)
      img.onclick = null
      // Add new click listener
      img.addEventListener("click", function (e) {
        e.preventDefault()
        e.stopPropagation()

        const modal = document.getElementById("imageModal")
        const modalImg = document.getElementById("modalImage")

        if (modal && modalImg) {
          modal.style.display = "block"
          modalImg.src = this.src
          modalImg.alt = this.alt || "Portfolio Image"
          document.body.style.overflow = "hidden"

          // Add fade in animation
          modal.style.opacity = "0"
          setTimeout(() => {
            modal.style.opacity = "1"
          }, 10)
        }
      })
    })
  }

  function handleImageClick(e) {
    e.preventDefault()
    e.stopPropagation()

    const modal = document.getElementById("imageModal")
    const modalImg = document.getElementById("modalImage")

    if (modal && modalImg) {
      modal.style.display = "block"
      modalImg.src = this.src
      modalImg.alt = this.alt || "Portfolio Image"
      document.body.style.overflow = "hidden"

      // Add fade in animation
      modal.style.opacity = "0"
      setTimeout(() => {
        modal.style.opacity = "1"
      }, 10)
    }
  }

  // Initial binding of image modal events
  bindImageModalEvents()

  // Close modal function
  function closeModalFunction() {
    if (modal) {
      modal.style.opacity = "0"
      setTimeout(() => {
        modal.style.display = "none"
        document.body.style.overflow = "auto"
      }, 300)
    }
  }

  // Close modal with close button
  if (closeModal) {
    closeModal.addEventListener("click", closeModalFunction)
  }

  // Close modal when clicking outside
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModalFunction()
      }
    })
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.style.display === "block") {
      closeModalFunction()
    }
  })

  // Add scroll effect to navbar
  let lastScrollTop = 0
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const navbar = document.querySelector(".navbar")

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.style.transform = "translateY(-100%)"
    } else {
      // Scrolling up
      navbar.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop
  })

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("loading")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".education-card, .internship-card, .portfolio-card, .certificate-item, .activity-item, .timeline-card, .skill-icon",
  )
  animateElements.forEach((el) => {
    observer.observe(el)
  })

  // Add gallery transitions
  addGalleryTransitions()

  // Initialize skill icon hover effects
  initializeSkillEffects()

  // Initialize timeline animations
  initializeTimelineAnimations()
})

// Global function to show portfolio main (called from back buttons)
function showPortfolioMain() {
  // Hide all detail sections
  const detailSections = document.querySelectorAll(".portfolio-detail-section")
  detailSections.forEach((section) => {
    section.classList.remove("active")
  })

  // Show main portfolio section
  const portfolioSection = document.getElementById("portfolio")
  portfolioSection.classList.add("active")

  // Add loading animation
  portfolioSection.style.opacity = "0"
  setTimeout(() => {
    portfolioSection.style.opacity = "1"
    portfolioSection.classList.add("loading")
  }, 100)

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// Filter functionality for portfolio detail sections - Updated to include Projects
function initializePortfolioFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")
  const gallerySections = document.querySelectorAll(".gallery-section")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Filter items based on selection
      if (filter === "all") {
        // Show all sections and items
        gallerySections.forEach((section) => {
          section.classList.remove("hidden")
        })
        galleryItems.forEach((item) => {
          item.classList.remove("hidden")
        })
      } else if (filter === "certificates") {
        // Show only certificates section
        gallerySections.forEach((section) => {
          if (section.getAttribute("data-category") === "certificates") {
            section.classList.remove("hidden")
          } else {
            section.classList.add("hidden")
          }
        })
      } else if (filter === "activities") {
        // Show only activities section
        gallerySections.forEach((section) => {
          if (section.getAttribute("data-category") === "activities") {
            section.classList.remove("hidden")
          } else {
            section.classList.add("hidden")
          }
        })
      } else if (filter === "projects") {
        // Show only projects section
        gallerySections.forEach((section) => {
          if (section.getAttribute("data-category") === "projects") {
            section.classList.remove("hidden")
          } else {
            section.classList.add("hidden")
          }
        })
      }

      // Add animation effect
      const visibleItems = document.querySelectorAll(".gallery-item:not(.hidden)")
      visibleItems.forEach((item, index) => {
        item.style.opacity = "0"
        item.style.transform = "translateY(20px)"
        setTimeout(() => {
          item.style.opacity = "1"
          item.style.transform = "translateY(0)"
        }, index * 50)
      })
    })
  })
}

// Update bindImageModalEvents function to work with new gallery structure and timeline images
function bindImageModalEvents() {
  // Select all images in portfolio detail sections and timeline images
  const portfolioImages = document.querySelectorAll(
    ".portfolio-detail-section.active .gallery-item img, .portfolio-detail-section.active .internship-images img, .about-section .timeline-image",
  )

  portfolioImages.forEach((img) => {
    // Remove existing click listeners (ถ้ามี)
    img.onclick = null
    // Add new click listener
    img.addEventListener("click", function (e) {
      e.preventDefault()
      e.stopPropagation()

      const modal = document.getElementById("imageModal")
      const modalImg = document.getElementById("modalImage")

      if (modal && modalImg) {
        modal.style.display = "block"
        modalImg.src = this.src
        modalImg.alt = this.alt || "Portfolio Image"
        document.body.style.overflow = "hidden"

        // Add fade in animation
        modal.style.opacity = "0"
        setTimeout(() => {
          modal.style.opacity = "1"
        }, 10)
      }
    })
  })
}

// Add smooth transitions for gallery items
function addGalleryTransitions() {
  const galleryItems = document.querySelectorAll(".gallery-item")

  galleryItems.forEach((item) => {
    item.style.transition = "all 0.3s ease, opacity 0.3s ease, transform 0.3s ease"
  })
}

// Initialize skill icon effects
function initializeSkillEffects() {
  const skillIcons = document.querySelectorAll(".skill-icon")

  skillIcons.forEach((icon, index) => {
    // Add staggered animation delay
    icon.style.animationDelay = `${index * 0.1}s`

    // Add click effect
    icon.addEventListener("click", function () {
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)
    })

    // Add hover sound effect (visual feedback)
    icon.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 15px 30px rgba(0, 123, 255, 0.4)"
    })

    icon.addEventListener("mouseleave", function () {
      this.style.boxShadow = ""
    })
  })
}

// Initialize timeline animations
function initializeTimelineAnimations() {
  const timelineCards = document.querySelectorAll(".timeline-card")

  timelineCards.forEach((card, index) => {
    // Add staggered animation
    card.style.animationDelay = `${index * 0.2}s`

    // Add scroll-triggered animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }
        })
      },
      { threshold: 0.3 },
    )

    // Set initial state
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "all 0.6s ease"

    observer.observe(card)
  })

  // Animate timeline dots
  const timelineDots = document.querySelectorAll(".timeline-dot-vertical")
  timelineDots.forEach((dot, index) => {
    setTimeout(() => {
      dot.style.transform = "translate(-50%, -50%) scale(1.2)"
      setTimeout(() => {
        dot.style.transform = "translate(-50%, -50%) scale(1)"
      }, 200)
    }, index * 300)
  })
}

// Add parallax effect to background grid
function addParallaxEffect() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const sections = document.querySelectorAll(".section::before")

    sections.forEach((section) => {
      const speed = 0.5
      section.style.transform = `translateY(${scrolled * speed}px)`
    })
  })
}

// Initialize parallax effect
addParallaxEffect()

// Add typing effect for interests
function addTypingEffect() {
  const interestItems = document.querySelectorAll(".interests-list li")

  interestItems.forEach((item, index) => {
    const text = item.textContent
    item.textContent = ""

    setTimeout(() => {
      let i = 0
      const typeInterval = setInterval(() => {
        item.textContent += text.charAt(i)
        i++
        if (i >= text.length) {
          clearInterval(typeInterval)
        }
      }, 50)
    }, index * 500)
  })
}

// Add smooth section transitions
function addSectionTransitions() {
  const sections = document.querySelectorAll(".section")

  sections.forEach((section) => {
    section.style.transition = "opacity 0.5s ease-in-out"
  })
}

// Initialize additional effects when About section is active
document.addEventListener("DOMContentLoaded", () => {
  const aboutLink = document.querySelector('a[href="#about"]')

  if (aboutLink) {
    aboutLink.addEventListener("click", () => {
      setTimeout(() => {
        // Re-bind image modal events for timeline images
        bindImageModalEvents()
        // Add typing effect for interests
        setTimeout(addTypingEffect, 1000)
      }, 500)
    })
  }
})

// Add loading states for images
function addImageLoadingStates() {
  const images = document.querySelectorAll("img")

  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })

    img.addEventListener("error", function () {
      this.style.opacity = "0.5"
      this.alt = "Image failed to load"
    })

    // Set initial state
    img.style.opacity = "0"
    img.style.transition = "opacity 0.3s ease"
  })
}

// Initialize image loading states
addImageLoadingStates()
