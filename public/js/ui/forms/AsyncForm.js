class AsyncForm {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submit();
    });
  }

  getData() {
    const formData = new FormData(this.element);
    const entries = formData.entries();
    const data = {};
    for (let [key, value] of entries) {
      data[key] = value;
    }
    return data;
  }

  onSubmit(options) {
    // Пустой метод для переопределения в дочерних классах
  }

  submit() {
    const data = this.getData();
    this.onSubmit(data);
  }
}
