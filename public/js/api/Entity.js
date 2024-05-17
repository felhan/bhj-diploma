class Entity {
  static URL = '';

  static list(data, callback) {
    createRequest({
      url: this.URL,
      method: 'GET',
      responseType: 'json',
      data,
      callback,
    });
  }

  static create(data, callback) {
    createRequest({
      url: this.URL,
      method: 'PUT',
      responseType: 'json',
      data,
      callback,
    });
  }

  static remove(id, data, callback) { // Добавляем `id` в аргументы
    createRequest({
      url: `${this.URL}/${id}`, // Убедитесь, что `id` передается в URL
      method: 'DELETE',
      responseType: 'json',
      data,
      callback,
    });
  }
}