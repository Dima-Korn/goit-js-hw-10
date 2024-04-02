import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const delayInput = document.querySelector('input[name="delay"]');
delayInput.style.display = 'flex';
delayInput.style.flexDirection = 'column';
delayInput.style.marginTop = '8px';
delayInput.style.marginBottom = '8px';

const fulfilledState = document.querySelector('input[value="fulfilled"]');
const rejectedState = document.querySelector('input[value="rejected"]');

const formBox = document.querySelector('form');
formBox.style.display = 'flex';
formBox.style.flexDirection = 'column';
formBox.style.paddingBlockStart = '24px';
formBox.style.paddingLeft = '156px';

const fieldset = document.querySelector('fieldset');
fieldset.classList.add('radio-field');
fieldset.style.boxSizing = 'border-box';
fieldset.style.display = 'flex';
fieldset.style.justifyContent = 'space-evenly';
fieldset.style.padding = '0px 48px 8px 48px';
fieldset.style.maxWidth = '360px';
fieldset.style.height = '64px';

fieldset.style.borderRadius = '4px';
fieldset.style.margin = '0 0 24px 0';

const submitBtn = document.querySelector('button[type="submit"]');
submitBtn.classList.add('time-setter')
submitBtn.style.background= '#4e75ff';
submitBtn.style.width = '360px';
submitBtn.style.height = '40px';
submitBtn.style.borderRadius = '8px';
submitBtn.style.padding = '8px 16px';

submitBtn.addEventListener('click', function onButtonClick(event) {
  event.preventDefault();

  const delay = parseInt(delayInput.value);

  const myPromise = new Promise((resolve, reject) => {
    if (fulfilledState.checked) {
      setTimeout(() => resolve(delay), delay);
    } else if (rejectedState.checked) {
      setTimeout(() => reject(delay), delay);
    } else {
      reject(new Error('Choose promise state: fulfilled or rejected'));
    }
  });

  myPromise.then(
    () => {
        iziToast.success({
            title: 'OK',
            message: `✅ Fulfilled promise in ${delay}ms`
        });
    },
    () => {
        iziToast.error({
            title: 'Error',
            message: `❌ Rejected promise in ${delay}ms`
        });
    }
);
});
