"use client"

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    return () => {
      router.push("/sign-in");
    }
  }

  const handleRegister = () => {
    return () => {
      router.push("/sign-up");
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
       <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to SecureFlow</h1>
        <p className="text-lg">Effortless and secure access for all your needs.</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleLogin()}
          className="px-6 py-3 bg-white text-blue-600 rounded-md shadow-lg hover:bg-blue-100 hover:shadow-xl transition duration-200"
        >
          Login
        </button>
        <button
          onClick={handleRegister()}
          className="px-6 py-3 bg-blue-700 text-white rounded-md shadow-lg hover:bg-blue-800 hover:shadow-xl transition duration-200"
        >
          Register
        </button>
      </div>
    </div>
  );
}