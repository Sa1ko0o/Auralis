// Плавный скролл для кнопок
function scrollToSection(id) {
  document.querySelector(id).scrollIntoView({ behavior:'smooth' });
}

// Анимация появления секций при скролле
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });
sections.forEach(section => observer.observe(section));

// Клик по логотипу возвращает на главную
document.getElementById('logo').addEventListener('click', () => scrollToSection('#hero'));

// Бургер-меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('active');
});

// Закрыть меню при клике на ссылку
document.querySelectorAll('#nav a').forEach(link => {
  link.addEventListener('click', () => {
    if(nav.classList.contains('active')){
      nav.classList.remove('active');
      burger.classList.remove('active');
    }
  });
});