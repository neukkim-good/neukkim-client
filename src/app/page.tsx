"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpNickname, setSignUpNickname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });

    if (!res.ok) {
      console.error("로그인 실패", await res.text());
      return;
    }

    const data = await res.json();
    const { user_id, nickname, token } = data;

    setUser({
      user_id,
      nickname,
      token,
      email: "",
      password: "",
    });

    sessionStorage.setItem("token", data.token);
    router.replace("/main");
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
        nickname: signUpNickname,
      }),
    });

    if (!res.ok) {
      console.error("회원가입 실패", await res.text());
      return;
    }
    const data = await res.json();
    console.log("회원가입 성공:", data);

    setSignUpEmail("");
    setSignUpPassword("");

    setIsLogin(true);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          {isLogin ? "로그인 화면" : "회원가입 화면"}
        </h1>
        <p className="text-gray-500 mt-2">
          {isLogin
            ? "이 부분 코드 잘 작성해주세요~"
            : "회원가입 코드 작성해주세요~"}
        </p>
      </header>

      <main className="w-full max-w-sm bg-white shadow-md rounded-lg p-8">
        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                이메일
              </label>
              <input
                type="email"
                id="loginemail"
                value={loginEmail}
                placeholder="example@email.com"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="loginpassword"
                value={loginPassword}
                placeholder="비밀번호를 입력하세요"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              로그인
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUpSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                이메일
              </label>
              <input
                type="email"
                id="signupemail"
                value={signUpEmail}
                placeholder="example@email.com"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                onChange={(e) => setSignUpEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                닉네임
              </label>
              <input
                type="text"
                id="signupnickname"
                value={signUpNickname}
                placeholder="홍길동"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                onChange={(e) => setSignUpNickname(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="signuppassword"
                value={signUpPassword}
                placeholder="비밀번호를 입력하세요"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                onChange={(e) => setSignUpPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호 확인
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                placeholder="비밀번호를 다시 입력하세요"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              회원가입
            </button>
          </form>
        )}

        <div className="text-sm text-center text-gray-600 mt-4">
          {isLogin ? "계정이 없으신가요?" : "이미 계정이 있으신가요?"}{" "}
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "회원가입 하기" : "로그인 하기"}
          </button>
        </div>
      </main>
    </div>
  );
}
