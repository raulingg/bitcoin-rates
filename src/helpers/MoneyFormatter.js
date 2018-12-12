const formatDollarsToCents = value => {
  let hold = `${value}`.replace(/[^\d.-]/g, '');

  if (hold && hold.includes('.')) {
    hold = hold.substring(0, hold.indexOf('.') + 3);
  }

  return hold ? Math.round(parseFloat(hold) * 100) : 0;
};

const formatCentsToDollars = value => {
  let hold = `${value}`.replace(/[^\d.-]/g, '');
  hold = parseFloat(hold);
  return hold ? hold / 100 : 0;
};

export default {
  format: amount => formatCentsToDollars(formatDollarsToCents(amount)),
};
