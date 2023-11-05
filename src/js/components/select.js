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
