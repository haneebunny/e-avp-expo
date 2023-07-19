export const isEmpty = (obj) => {
  Object.values(obj).some((value) => !value === true);
};
