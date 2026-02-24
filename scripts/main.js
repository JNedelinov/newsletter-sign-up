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

  // Grab the form data and turn it into a plain JavaScript object
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  const validation = new Validator(data, rules);

  if (validation.fails()) {
    // Pull out the nested 'errors' object from the validation results
    const {
      errors: { errors },
    } = validation;

    for (const field in errors) {
      const input = form.querySelector(`input[name=${field}]`);
      const label = form.querySelector(`label[name=${field}]`);

      // Find the specific error span inside this field's label
      const errPlaceholderSpan = label.querySelector('.err-placeholder');

      input.classList.add('error');
      errPlaceholderSpan.classList.add('err-msg');

      // Grab the first error message for this field and display it
      const errMsg = errors[field][0];
      errPlaceholderSpan.textContent = errMsg;
    }
  } else {
    document.querySelector('article.conf-card span.conf-email').textContent =
      data.email;

    form
      .querySelectorAll('.error')
      .forEach((el) => el.classList.remove('error'));
    form.querySelectorAll('.err-msg').forEach((el) => {
      el.classList.remove('err-msg');
      // Look inside the former error element to clear the text
      el.querySelector('.err-placeholder').textContent = '';
    });

    toggleCardsVisibility();
    form.querySelectorAll('input').forEach((input) => (input.value = ''));
  }
});

form.querySelectorAll('input').forEach((input) =>
  input.addEventListener('change', (e) => {
    // Check if the input is now empty and currently has an error
    if (e.target.value === '' && e.target.classList.contains('error')) {
      e.target.classList.remove('error');

      // Find the error message span next to the input (sharing the same parent)
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
