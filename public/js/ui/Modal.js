class Modal {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    const dismissButtons = this.element.querySelectorAll('[data-dismiss="modal"]');
    dismissButtons.forEach(button => {
      button.addEventListener('click', this.onClose.bind(this));
    });
  }

  onClose(e) {
    e.preventDefault();
    this.close();
  }

  open() {
    this.element.style.display = 'block';
  }

  close() {
    this.element.style.display = 'none';
  }
}

// Обработчики событий для элементов span, открывающих модальные окна
const spans = {
  register: document.querySelector('.menu-item_register'),
  login: document.querySelector('.menu-item_login'),
  logout: document.querySelector('.menu-item_logout'),
  createAccount: document.querySelector('.create-account'),
  // Добавьте другие элементы span здесь...
};

Object.keys(spans).forEach(spanKey => {
  if (spans[spanKey]) {
    spans[spanKey].addEventListener('click', (evt) => {
      evt.preventDefault();
      App.getModal(spanKey).open();
    });
  }
});
