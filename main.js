import { fromEvent, map, tap } from 'rxjs';

document.addEventListener('DOMContentLoaded', () => {
  const decreaseElement = document.querySelector('.upper__inner--decrease');
  const incrementElement = document.querySelector('.upper__inner--increase');
  const upperInner = document.querySelector('.upper__inner');
  const numberElement = document.querySelector('.number');

  let counter = 1;

  const decreaseClick$ = fromEvent(decreaseElement, 'click');
  const increaseClick$ = fromEvent(incrementElement, 'click');

  decreaseClick$
    .pipe(
      map(() => ({
        value: counter === 1 ? 0 : -1,
        direction: 'b',
      }))
    )
    .subscribe(changeValue);

  increaseClick$
    .pipe(
      map(() => ({
        value: counter === 12 ? 0 : 1,
        direction: 'f',
      }))
    )
    .subscribe(changeValue);

  function changeValue({ value, direction }) {
    counter += value;
    if (value !== 0) {
      numberElement.innerHTML = counter;
      upperInner.classList.add('animation');
      upperInner.setAttribute('direction', direction);

      setTimeout(() => {
        upperInner.classList.remove('animation');
        upperInner.removeAttribute('direction');
      }, 100);
    }
  }
});
