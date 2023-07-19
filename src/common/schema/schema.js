import * as yup from "yup";

export const signUpSchema = yup.object({
  phoneNumber: yup.string().required("필수 입력 항목입니다."),
  email: yup

    .string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "올바르지 않은 이메일 형식입니다."
    )
    .required("필수 입력 항목입니다."),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()_+\-=\[\]{};':"<>?,./\\]{8,}$/,
      "영문, 숫자를 포함해 최소 8자를 입력해주세요."
    )
    .required("필수 입력 항목입니다."),
  confirmPassword: yup

    .string()
    .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
    .required("필수 입력 항목입니다."),
  nickname: yup.string().max(12).required("필수 입력 항목입니다."),
});
