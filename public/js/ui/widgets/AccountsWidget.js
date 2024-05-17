class AccountsWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element; // Контейнер для счетов
    this.registerEvents();
    this.update();
  }

  registerEvents() {
    this.element.addEventListener('click', event => {
      if (event.target.closest('.account')) {
        this.onSelectAccount(event.target.closest('.account'));
      }
      if (event.target.closest('.create-account')) {
        const modal = App.getModal('createAccount');
        modal.open();
      }
    });
  }

  update() {
    if (User.current()) {
      Account.list({}, (err, response) => {
        if (response && response.data) {
          this.clear();
          response.data.forEach(account => this.renderItem(account));
        }
      });
    }
  }

  clear() {
    this.element.querySelectorAll('.account').forEach(account => account.remove());
  }

  onSelectAccount(element) {
    this.element.querySelectorAll('.account').forEach(account => account.classList.remove('active'));
    element.classList.add('active');
    App.showPage('transactions', { account_id: element.dataset.id });
  }

  getAccountHTML(item) {
    if (!item || !item.id || !item.name) {
      console.error('Invalid account data', item);
      return '';
    }

    return `<li class="account" data-id="${item.id}">
              <a href="#">
                <span>${item.name}</span> /
                <span>0 ₽</span> <!-- Здесь можно указать начальный баланс -->
              </a>
            </li>`;
  }

  renderItem(data) {
    const accountHTML = this.getAccountHTML(data);
    if (accountHTML) {
      this.element.insertAdjacentHTML('beforeend', accountHTML);
    }
  }

  addAccount(data) {
    if (data && data.id && data.name) {
      this.renderItem(data); // Добавляем новый счёт в виджет
    } else {
      console.error('Invalid account data', data);
    }
  }
}
