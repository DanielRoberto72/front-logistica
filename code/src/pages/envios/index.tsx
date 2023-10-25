import Header from "@/components/header";
import ValidateLogin from "@/infrastructure/api-gerenciamento-logistico/validatelogin";
import { GetServerSideProps } from "next";
import { destroyCookie, parseCookies } from "nookies";

const mvnos = [
  {
    mvno: "Correios",
    pending: 5,
    imageUrl: "/assets/envios/correios-logo.png",
    lastSend: "2023-01-23 00:00:00",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    mvno: "Mega",
    pending: 6,
    imageUrl: "/assets/envios/mega-logo.png",
    lastSend: "2023-01-23 00:00:00",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    mvno: "Pernambucanas",
    pending: 7,
    imageUrl: "/assets/envios/pernambucanas-logo.png",
    lastSend: "2023-01-23 00:00:00",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    mvno: "Flamengo",
    pending: 1,
    imageUrl: "/assets/envios/flamengo-logo.png",
    lastSend: "2023-01-23 00:00:00",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    mvno: "Boticario",
    pending: 2,
    imageUrl: "/assets/envios/boticario-logo.png",
    lastSend: "2023-01-23 00:00:00",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    mvno: "Uber",
    pending: 10,
    imageUrl: "/assets/envios/Uber-logo.png",
    lastSend: "2023-01-23 00:00:00",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <>
      <Header page="Envios"></Header>
      <main className=" mt-2 mx-2">
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
        >
          {mvnos.map((mvno) => (
            <li
              key={mvno.mvno}
              className="overflow-hidden rounded-xl border border-gray-200"
            >
              <div className=" flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                <img
                  src={mvno.imageUrl}
                  alt={mvno.mvno}
                  className="h-20 w-20 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                />
                <div className="text-sm font-medium leading-6 text-gray-900">
                  {mvno.mvno}
                </div>
                <a
                  href={`envios/chips/?id=${mvno.mvno}`}
                  className="w-16 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-normal text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Acessar
                </a>
              </div>
              <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Ultimo Envio</dt>
                  <dd className="text-gray-700">{mvno.lastSend}</dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Envios</dt>
                  <dd className="flex items-start gap-x-2">
                    <div className="font-medium text-gray-900">Pendentes</div>
                    <div className="rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset">
                      {mvno.pending}
                    </div>
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  var nivel = 0;
  const loginValidate = new ValidateLogin();
  const { ["user"]: user } = parseCookies(ctx);
  const { ["mfa"]: mfa } = parseCookies(ctx);
  const { ["token"]: token } = parseCookies(ctx);
  if (!user || !mfa || !token) {
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

  try {
    const permissoesEnvios = [1, 2];
    const login = await loginValidate.validateLogin(user, token);
    nivel = parseInt(login.nivel);
    console.log(nivel);
    if (!permissoesEnvios.includes(nivel)) {
      console.log("Não tem permissão");
      return {
        redirect: {
          destination: "/dashbaord",
          permanent: false,
        },
      };
    }
  } catch (error) {
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

  try {
    // pegar infos das MVNOs
    return {
      // retornar props das MVNOs
      props: {},
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};
