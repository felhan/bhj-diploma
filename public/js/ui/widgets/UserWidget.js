class UserWidget {
  /**
   * Устанавливает полученный элемент в свойство element.
   * Если переданный элемент не существует, выбрасывает ошибку.
   */
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
  }

  /**
   * Получает информацию о текущем пользователе с помощью User.current().
   * Если пользователь авторизован, в элемент .user-name устанавливает имя авторизованного пользователя.
   */
  update() {
    const user = User.current();
    if (user) {
      this.element.querySelector('.user-name').textContent = user.name;
    }
  }
}
