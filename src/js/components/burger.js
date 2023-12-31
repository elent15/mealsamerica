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
