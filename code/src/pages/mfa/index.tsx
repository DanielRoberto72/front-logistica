import styles from "../../styles/login.module.css";
import { useEffect, useState } from "react";
import ValidateMfa from "@/infrastructure/api-gerenciamento-logistico/validateMfa";
import LoadingModal from "@/components/alerts/loadingModal";
import ErrorModal from "@/components/alerts/errorModal";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { GetServerSideProps } from "next";

export default function Login() {
  const router = useRouter();
  const [validationCode, setValidationCode] = useState("");
  const [user, setUser] = useState<string | null>(null);
  const [mfaError, setMfaError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const { ["user"]: user } = parseCookies();
    setUser(user);
  }, []);

  const validateMFA = async () => {
    setLoading(true)
    const mfa = new ValidateMfa();
    try {
      const isAutenticated = await mfa.validateMfa(user, validationCode);
      setCookie(undefined, "token", isAutenticated.token, {
        maxAge: 3600, // Tempo de vida do cookie em segundos (1 hora)
        path: "/",
        // secure: true, // Apenas sobre HTTPS
        // httpOnly: true, // Não acessível via JavaScript no cliente
        sameSite: "strict",
      });
      setCookie(undefined, "mfa", "true", {
        maxAge: 3600, // Tempo de vida do cookie em segundos (1 hora)
        path: "/",
        // secure: true, // Apenas sobre HTTPS
        // httpOnly: true, // Não acessível via JavaScript no cliente
        sameSite: "strict",
      });
      setLoading(false)
      router.push("/dashboard");
    } catch (error) {
      setLoading(false)
      const cookies = parseCookies();
      for (const cookieName in cookies) {
        destroyCookie(null, cookieName);
      }
      setMfaError(true)
    }
  };

  return (
    <>
      {mfaError == true ? <ErrorModal /> : false}
      {loading == true ? <LoadingModal /> : false}
      <main className={styles.bgBackgound}>
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-2 lg:px-8 ">
          <div className="mt-6 sm:mx-auto sm:max-w-md">
            <div className="bg-white py-8 px-4 drop-shadow-2xl sm:rounded-lg sm:px-14">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                  className="mx-auto h-12 mt-2 w-auto"
                  src="/assets/surf.gif"
                  alt="Surf Logo"
                />
                <h2 className="mt-4 mb-4 text-center text-2xl font-medium text-gray-900">
                  MFA
                </h2>
              </div>
              <form className="space-y-6" method="POST">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Código de Verificação
                  </label>
                  <div className="mt-2">
                    <input
                      id="validationCode"
                      name="validationCode"
                      type="validationCode"
                      onChange={(e) => setValidationCode(e.target.value)}
                      required
                      placeholder="1234567-8678-1578-8966-aaaaaa"
                      className="appearance-none block w-80 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={validateMFA}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Entrar
                  </button>
                </div>
                <div className="mt-6">
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["user"]: user } = parseCookies(ctx);
  if (!user) {
    const cookies = parseCookies(ctx);
    for (const cookieName in cookies) {
      console.log(cookieName);
      destroyCookie(ctx, cookieName);
    }
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
