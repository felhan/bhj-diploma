class CreateAccountForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.errors = {}; // Для хранения ошибок валидации
  }

  // Проверка данных формы
  validate(data) {
    this.errors = {}; // Сброс ошибок валидации
    if (!data.name || data.name.trim() === "") {
      this.errors.name = "Название счёта обязательно"; // Ошибка, если нет названия
    }

    return Object.keys(this.errors).length === 0; // Возвращаем true, если нет ошибок
  }

  // Метод отображения ошибок (если требуется)
  renderErrors() {
    if (Object.keys(this.errors).length > 0) {
      console.error("Ошибки валидации:", this.errors);
      // Здесь можно добавить визуальное отображение ошибок
    }
  }

  onSubmit(data) {
    if (!this.validate(data)) { // Проверяем валидность данных
      this.renderErrors(); // Отображаем ошибки
      return; // Если ошибки есть, прекращаем выполнение
    }

    // Используем createRequest для отправки данных
    createRequest({
      url: '/account', // URL для создания счёта
      method: 'PUT', // Используем метод PUT
      data, // Передаем данные формы
      responseType: 'json', // Ожидаем JSON в ответе
      callback: (err, response) => {
        console.log('Callback response:', response);
        if (err || !response || !response.success) { // Обрабатываем ошибки
          console.error(`Ошибка при создании счёта: ${err?.message || response?.error}`);
          alert(`Ошибка при создании счёта: ${err?.message || response?.error}`); // Выводим сообщение об ошибке
          return;
        }

        // При успешном ответе закрываем модальное окно, сбрасываем форму
        const modal = App.getModal('createAccount');
        modal.close();
        this.element.reset(); // Сбрасываем форму
        console.log("Счет создан", response.account);

        // Обновляем виджет аккаунтов
        const accountsWidget = App.getWidget('accounts');
        accountsWidget.addAccount(response.account); // Добавляем новый аккаунт

        // Обновляем приложение
        App.update(); // Обновляем приложение
      }
    });
  }
}
