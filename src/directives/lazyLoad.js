export default {
  inserted(el, binding) {
    // 解构指令的参数
    // 由于指令声明时不带参数声明，因此，最好在指令顶部先声明传进来的参数，然后使用本地变量
    const { delay } = binding.value;
    console.log('delay', delay);
    const reservedDisplay = el.style.display;
    el.style.display = 'none';
    setTimeout(() => {
      el.style.display = reservedDisplay;
    }, delay || 500);
  },
};
