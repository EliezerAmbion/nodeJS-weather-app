const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
let message1 = document.querySelector('.message1');
let message2 = document.querySelector('.message2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;

  message1.textContent = 'Loading...';
  message2.textContent = '';

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(typeof data.error);
        message1.textContent = data.error;
      }

      message1.textContent = data.location;
      message2.textContent = data.forecast;
    });
  });
});
