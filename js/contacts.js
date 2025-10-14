document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const notification = document.getElementById('contact-notification');

  function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const message = form.querySelector('textarea').value.trim();

    if(!name || !email || !message) return;

    // Показываем уведомление на странице
    showNotification(`Спасибо, ${name}! Ваше сообщение отправлено.`);

    // Очищаем форму
    form.reset();
  });

  // Эффект печати заголовка
  const typingHeader = document.querySelector('.page-title');
  if(typingHeader) {
    const text = typingHeader.textContent;
    typingHeader.textContent = '';
    let index = 0;
    function type() {
      if(index < text.length) {
        typingHeader.textContent += text[index];
        index++;
        setTimeout(type, 80);
      }
    }
    type();
  }
});
