export const formatNumber = (n) => {
  return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const currencyMask = (e) => {
  let { value } = e.target;
    e.target.value = formatNumber(value);
    return e;
};