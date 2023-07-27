// Object 비어있는 게 하나라도 있는지 확인. 비어있는 게 있다면  true
export const isEmpty = (obj) => {
  Object.values(obj).some((value) => !value === true);
};

// 숫자 이외의 문자를 제거
export const restrictToNumbers = (input) => {
  const numbersOnly = input.replace(/\D/g, "");
  return numbersOnly;
};

// time 시간 템플릿
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secondsRemaining
    .toString()
    .padStart(2, "0")}`;
};
