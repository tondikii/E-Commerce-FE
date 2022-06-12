import "intl";
import "intl/locale-data/jsonp/en";

export const rupiah = (amount) => {
  return new Intl.NumberFormat("id-ID").format(amount);
};