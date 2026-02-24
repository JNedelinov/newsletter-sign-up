const rules = {
  email: 'required|email',
};

const toggleCardsVisibility = () => {
  document.querySelector('article.subs-card').classList.toggle('hidden');
  document.querySelector('article.conf-card').classList.toggle('hidden');
};

const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  console.log('here');
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  const validation = new Validator(data, rules);

  if (validation.fails()) {
    const {
      errors: { errors },
    } = validation;

    for (const field in errors) {
      const input = form.querySelector(`input[name=${field}]`);
      const label = form.querySelector(`label[name=${field}]`);
      const errPlaceholderSpan = label.querySelector('.err-placeholder');

      input.classList.add('error');
      errPlaceholderSpan.classList.add('err-msg');

      const errMsg = errors[field][0];
      errPlaceholderSpan.textContent = errMsg;
    }
  } else {
    form
      .querySelectorAll('.error')
      .forEach((el) => el.classList.remove('error'));
    form.querySelectorAll('.err-msg').forEach((el) => {
      el.classList.remove('err-msg');
      el.querySelector('.err-placeholder').textContent = '';
    });

    form.querySelectorAll('input').forEach((input) => (input.value = ''));

    toggleCardsVisibility();
  }
});

form.querySelectorAll('input').forEach((input) =>
  input.addEventListener('change', (e) => {
    if (e.target.value === '' && e.target.classList.contains('error')) {
      e.target.classList.remove('error');
      const errPlaceholderSpan =
        e.target.parentElement.querySelector('.err-msg');
      errPlaceholderSpan.textContent = '';
      errPlaceholderSpan.classList.remove('err-msg');
    }
  }),
);

document
  .querySelector('article.conf-card footer .btn')
  .addEventListener('click', () => {
    toggleCardsVisibility();
  });
