//防抖 节流
export function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    // console.log(args);
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func(this, args)
    }, delay)
  }
}