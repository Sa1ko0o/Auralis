document.addEventListener('DOMContentLoaded', () => {
  const typingHeader = document.querySelector('.page-title');
  if(typingHeader) {
    const text = typingHeader.textContent;
    typingHeader.textContent = '';
    let index = 0;
    function type() {
      if(index < text.length) {
        typingHeader.textContent += text[index];
        index++;
        setTimeout(type, 80); // скорость печати
      }
    }
    type();
  }
});
