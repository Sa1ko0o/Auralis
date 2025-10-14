document.addEventListener('DOMContentLoaded', () => {
  const chatWindow = document.getElementById('chat-window');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');

  // Создаём блок подсказок под полем ввода
  const suggestions = document.createElement('div');
  suggestions.id = 'chat-suggestions';
  suggestions.style.display = 'flex';
  suggestions.style.flexWrap = 'wrap';
  suggestions.style.gap = '8px';
  suggestions.style.marginTop = '10px';
  chatInput.parentNode.insertBefore(suggestions, chatSend.nextSibling);

  let scrollTimer;

  // Функция добавления сообщения с анимацией
  function addMessage(text, sender = 'user') {
    const msg = document.createElement('div');
    msg.classList.add('message', sender === 'bot' ? 'bot-message' : 'user-message');
    msg.textContent = text;
    chatWindow.appendChild(msg);

    requestAnimationFrame(() => {
      msg.style.animation = 'messageFadeIn 0.4s forwards';
    });

    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // Генерация подсказок
  function generateSuggestions(input) {
    suggestions.innerHTML = ''; // очищаем старые подсказки
    input = input.toLowerCase();

    const options = [];
    if(input.includes('привет') || input === '') options.push('Сказать привет');
    if(input.includes('бот') || input === '') options.push('Кто ты?');
    if(input.includes('услуги') || input === '') options.push('Показать услуги');
    if(input.includes('сайт') || input === '') options.push('Создать сайт');
    if(input.includes('телеграм') || input === '') options.push('Сделать Telegram-бота');

    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.className = 'btn secondary';
      btn.addEventListener('click', () => {
        chatInput.value = opt;
        chatSend.click();
        suggestions.innerHTML = '';
      });
      suggestions.appendChild(btn);
    });
  }

  // Мини-бот отвечает на простые фразы
  function botReply(input) {
    input = input.toLowerCase();
    if(input.includes('привет') || input.includes('сказать привет')) return 'Привет! Рад тебя видеть 😊';
    if(input.includes('бот') || input.includes('кто ты')) return 'Я мини-бот Auralis, могу демонстрировать функции сайта.';
    if(input.includes('услуги') || input.includes('показать услуги')) return 'Я могу показать UX/UI дизайн, сайты и Telegram-боты!';
    if(input.includes('сайт') || input.includes('создать сайт')) return 'Могу создать красивый и функциональный сайт под твои нужды.';
    if(input.includes('телеграм') || input.includes('сделать telegram-бота')) return 'Сделаю Telegram-бота для твоего проекта.';
    return 'Интересно! Расскажи подробнее...';
  }

  // Отправка сообщения по кнопке
  chatSend.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if(!text) return;
    addMessage(text, 'user');
    chatInput.value = '';
    suggestions.innerHTML = '';
    setTimeout(() => addMessage(botReply(text), 'bot'), 500);
  });

  // Отправка по Enter
  chatInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') chatSend.click();
  });

  // Показ подсказок при вводе
  chatInput.addEventListener('input', (e) => {
    generateSuggestions(e.target.value);
  });

  // Плавное появление скроллбара
  chatWindow.addEventListener('scroll', () => {
    chatWindow.classList.add('show-scroll');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => chatWindow.classList.remove('show-scroll'), 1200);
  });
  chatWindow.addEventListener('mouseenter', () => chatWindow.classList.add('show-scroll'));
  chatWindow.addEventListener('mouseleave', () => chatWindow.classList.remove('show-scroll'));
});
