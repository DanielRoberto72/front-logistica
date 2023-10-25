import styles from "../styles/login.module.css";
import { useState } from "react";
import ErrorModal from "../components/alerts/errorModal";
import LoadingModal from "@/components/alerts/loadingModal";
import Auth from "@/infrastructure/api-gerenciamento-logistico/auth";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { GetServerSideProps } from "next";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      const testeEmail = emailRegex.test(email);
      if (!testeEmail) {
        setLoginError(true);
      }
    } catch (error) {
      setLoginError(true);
    }
    const autenticacao = new Auth();
    try {
      const autenticate = await autenticacao.auth(email, password);
      setCookie(undefined, "user", autenticate.email, {
        // Tempo de vida do cookie em segundos (1 hora)
        maxAge: 3600,
        path: "/",
        // Apenas sobre HTTPS
        // secure: true,
        // Não acessível via JavaScript no cliente
        // httpOnly: true,
        sameSite: "strict",
      });
      setCookie(undefined, "nivel", autenticate.nivel, {
        // Tempo de vida do cookie em segundos (1 hora)
        maxAge: 3600,
        path: "/",
        // Apenas sobre HTTPS
        // secure: true,
        // Não acessível via JavaScript no cliente
        // httpOnly: true,
        sameSite: "strict",
      });
      router.push("/mfa");
    } catch (error) {
      setLoginError(true);
    }
    setLoading(false);
  };

  return (
    <>
      {loginError == true ? <ErrorModal /> : false}
      {loading == true ? <LoadingModal /> : false}
      <main className="min-h-screen flex flex-row">
        <div className="bg-blue-600 w-5/12 flex flex-col justify-between">
          <img
            className="mx-auto h-8 m-2 w-auto"
            src="/assets/surf-logo.png"
            alt="Surf Logo"
          />

          <img src="/assets/login-acess.png" alt="Login" />
        </div>
        <div className="min-h-screen flex flex-col justify-center w-7/12 ">
          <div className="mt-6 sm:mx-auto sm:max-w-md">
            <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-14">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="w-96 mt-4 mb-4 text-center text-xl font-medium text-gray-900">
                  Gerenciamento Logistico
                </h2>
                <h2 className="w-96 mt-4 mb-4 text-center text-2xl font-medium text-gray-900">
                  Faça Login
                </h2>
              </div>
              <form className="space-y-6" method="POST">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="username"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="exemplo@surf.com.br"
                      className="appearance-none block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Senha
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="********"
                      maxLength={16}
                      className="appearance-none block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={login}
                    className="w-96 flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Acessar
                  </button>
                </div>
                <div className="mt-6 w-96">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        {" "}
                        Devops Surf ©{new Date().getFullYear()}
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
