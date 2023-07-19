// Object 비어있는 게 하나라도 있는지 확인. 비어있는 게 있다면  true
export const isEmpty = (obj) => {
  Object.values(obj).some((value) => !value === true);
};

// 숫자 이외의 문자를 제거
export const restrictToNumbers = (input) => {
  const numbersOnly = input.replace(/\D/g, "");
  return numbersOnly;
};
