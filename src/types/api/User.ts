export interface User {
  user_id: string; // 고유 식별자
  email: string; // 사용자 이메일
  nickname: string; // 사용자 닉네임
  password: string; // 사용자 비밀번호
  token: string; // 인증 토큰
}
