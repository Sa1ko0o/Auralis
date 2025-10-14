document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Восстановление темы
  if(localStorage.getItem('theme') === 'light') {
    body.classList.add('light');
  }

  // Смена темы
  themeBtn.addEventListener('click', () => {
    body.classList.toggle('light');
    const current = body.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', current);

    // Плавная анимация кнопки
    themeBtn.style.transform = 'rotate(360deg)';
    setTimeout(() => themeBtn.style.transform = 'rotate(0deg)', 400);
  });

  // Уведомления
  function showNotification(message, duration = 3000) {
    let notification = document.querySelector('.contact-notification');
    if(!notification) {
      notification = document.createElement('div');
      notification.className = 'contact-notification';
      document.body.appendChild(notification);
    }
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => notification.classList.remove('show'), duration);
  }

  // Отправка формы
  const form = document.querySelector('.contact-form');
  if(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showNotification('Сообщение отправлено!');
      form.reset();
    });
  }
});