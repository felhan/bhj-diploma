class LoginForm extends AsyncForm {
  onSubmit(data) {
    // Регистрирует пользователя через User.login
    User.login(data, (err, response) => {
      if (response && response.success) {
        // При успешной авторизации сбрасывает форму
        this.element.reset();
        // При успешной авторизации задаёт состояние App.setState('user-logged')
        App.setState('user-logged');
        // Находит окно, в котором находится форма и закрывает его
        const modal = new Modal(this.element.closest('.modal'));
        modal.close();
      } else {
        console.error(err);
        // Обработка ошибок авторизации
      }
    });
  }
}
