// script.js
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. BURGER MENU & MOBILE NAVIGATION
     ========================================================================== */
  const burger = document.getElementById('burger-menu');
  const nav = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  // Переключение состояния мобильного меню
  const toggleMenu = () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  };

  burger.addEventListener('click', toggleMenu);

  // Закрытие меню при клике на якорную ссылку
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  /* ==========================================================================
     2. HEADER SCROLL & ACTIVE NAV LINKS
     ========================================================================== */
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Стилизация хедера при скролле
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Подсветка активной ссылки в меню
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  });

  /* ==========================================================================
     3. MODAL POPUP & FORM VALIDATION
     ========================================================================== */
  const modal = document.getElementById('modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const bookingForm = document.getElementById('booking-form');
  const modalSuccess = document.getElementById('modal-success');

  // Открытие модального окна
  const openModal = () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Запрет прокрутки страницы
  };

  // Закрытие модального окна
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Сброс формы через задержку (после закрытия)
    setTimeout(() => {
      bookingForm.reset();
      bookingForm.style.display = 'block';
      modalSuccess.classList.remove('active');
      clearErrors();
    }, 300);
  };

  openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  // Закрытие по клавише Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Очистка ошибок
  function clearErrors() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => group.classList.remove('error'));
  }

  // Валидация полей
  function validateForm() {
    let isValid = true;
    clearErrors();

    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');

    // Валидация имени (не пустое, минимум 2 символа)
    if (nameInput.value.trim().length < 2) {
      nameInput.parentElement.classList.add('error');
      isValid = false;
    }

    // Валидация телефона (регулярное выражение для базовой проверки)
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(phoneInput.value.trim())) {
      phoneInput.parentElement.classList.add('error');
      isValid = false;
    }

    return isValid;
  }

  // Обработка отправки формы
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Имитация успешной отправки формы
      bookingForm.style.display = 'none';
      modalSuccess.classList.add('active');
    }
  });
});