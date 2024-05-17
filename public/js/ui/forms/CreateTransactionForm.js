class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.renderAccountsList();
    this.subscribeToAccountChanges();
  }

  renderAccountsList() {
    if (User.current()) {
      Account.list({}, (err, response) => {
        if (response && response.account) {
          const select = this.element.querySelector('.accounts-select');
          select.innerHTML = response.account.map(account => `<option value="${account.id}">${account.name}</option>`).join('');
        }
      });
    }
  }

  subscribeToAccountChanges() {
    // Подписка на событие добавления нового счета
    document.addEventListener('accountAdded', () => {
      this.renderAccountsList();
    });

    // Подписка на событие удаления счета
    document.addEventListener('accountRemoved', () => {
      this.renderAccountsList();
    });
  }

  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        const modal = App.getModal('newIncome');
        modal.close();
        this.element.reset();
        App.update();
      } else {
        console.error(err);
        alert('Произошла ошибка при создании транзакции: ' + err.message);
      }
    });
  }
}
