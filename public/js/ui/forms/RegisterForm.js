class RegisterForm extends AsyncForm {
  onSubmit(data) {
    User.register(data, (err, response) => {
      if (response && response.success) {
        this.element.reset(); // Сброс формы
        App.setState('user-logged'); // Установка состояния приложения
        const modal = App.getModal('register'); // Нахождение модального окна
        modal.close(); // Закрытие модального окна
      } else {
        console.error(err);
        // Обработка ошибок регистрации
      }
    });
  }
}
