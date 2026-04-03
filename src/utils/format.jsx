export const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString()}`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
