// бургер-меню
const burger = () => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.header__nav');
  const menuItems = document.querySelectorAll('.header__nav-item');

  burger.addEventListener('click', () => {
    burger.classList.toggle('burger--active');
    menu.classList.toggle('header__nav--active');

    if (menu.classList.contains('header__nav--active')) {
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Закрыть меню');
      document.body.classList.add('stop-scroll');
    } else {
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Открыть меню');
      document.body.classList.remove('stop-scroll');
    }
  });

  menuItems.forEach(el => {
    el.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Открыть меню');
      burger.classList.remove('burger--active');
      menu.classList.remove('header__nav--active');
      document.body.classList.remove('stop-scroll');
    });
  });
}

burger();

// модальное окно
const modal = () => {
  const btns = Array.from(document.querySelectorAll(`[data-modal]`));
  const modals = Array.from(document.querySelectorAll('.modal'));
  const inputs = document.querySelectorAll('.modal__form-input');
  const body = document.body;
  const header = document.querySelector('.header__container');
  const menu = document.querySelector('.header__nav');
  const burger = document.querySelector('.burger');

  function open(el) {
    modals.forEach(modal => {
      if (modal.classList.contains('modal--open'))
        modal.classList.remove('modal--open');
    });

    if (menu.classList.contains('header__nav--active')) {
      header.classList.remove('header__container--active');
      menu.classList.remove('header__nav--active');
      burger.classList.remove('burger--active');
    }

    const modalData = el.target.dataset.modal || el.target.closest(`[data-modal]`).dataset.modal;
    const modal = document.getElementById(`${modalData}`);
    const modalClose = modal.querySelector('.modal__close-btn');

    modalClose.classList.remove('modal__close-btn--active');
    modal.classList.add('modal--open');
    body.classList.add('stop-scroll');
  }

  function close(el) {
    const target = el.target;
    const modal = target.closest('.modal');
    const modalBody = modal.querySelector('.modal__body');
    const modalClose = modal.querySelector('.modal__close-btn');
    const modalBtn = modal.querySelector('.btn-js');

    const itsModalBody = target == modalBody || modalBody.contains(target);
    const itsModalClose = target == modalClose || modalClose.contains(target);
    const itsModalBtn = target == modalBtn || modalBtn.contains(target);

    if ((itsModalClose && modal.classList.contains('modal--open')) ||
      (!itsModalBody && modal.classList.contains('modal--open')) ||
      (itsModalBtn && modal.classList.contains('modal--open'))) {
      modalClose.classList.add('modal__close-btn--active');
      modal.classList.remove('modal--open');
      body.classList.remove('stop-scroll');
      inputs.forEach(input => {
        const selectCurrent = modal.querySelector('.select__current');
        selectCurrent.textContent = '—Please choose an option—';
        input.value = '';
      });
    }
  }

  btns.forEach(btn => {
    btn.addEventListener('click', open);
  });

  modals.forEach(modal => {
    modal.addEventListener('click', close);
  });
}

modal();

// селект
const select = () => {
  const selectInput = document.querySelectorAll('.select__input');
  const selectItem = document.querySelectorAll('.select__item');
  let id;

  selectInput.forEach(input => {
    input.addEventListener('click', () => {
      id = input.parentNode.id;
      input.parentNode.classList.toggle('select--open');
      input.parentNode.querySelector('.select__dropdown').classList.toggle('select--open');
    });
  });

  const selectChoose = (item) => {
    let text = item.target.innerText,
      select = document.getElementById(`${id}`),
      currentText = select.querySelector('.select__current');

    currentText.innerText = text;
    select.classList.remove('select--open');
    select.querySelector('.select__dropdown').classList.remove('select--open');
  }

  selectItem.forEach(item => {
    item.addEventListener('click', selectChoose);
    item.addEventListener('keydown', (el) => {
      if (el.key === 'Enter') {
        selectChoose(el);
      }
    });
  });

  document.addEventListener('click', (el) => {
    const selectOpen = document.querySelector('.select--open');
    if (selectOpen) {
      const target = el.target;
      const select = document.getElementById(`${id}`);
      const itsSelect = target == select || select.contains(target);

      if (!itsSelect && select.classList.contains('select--open')) {
        select.classList.remove('select--open');
        select.querySelector('.select__dropdown').classList.remove('select--open');
      }
    }
  });
}

select();
