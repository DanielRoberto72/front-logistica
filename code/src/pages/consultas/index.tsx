import Header from "@/components/header";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";

export default function Consulta() {
  const router = useRouter();

  const [pedidoInput, setPedidoInput] = useState('');
  const [nomeInput, setNomeInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  const handleSearch = async () => {
    console.log(pedidoInput, nomeInput, emailInput)
  }

  return (
    <>
      <Header page="Consultas"></Header>
      <form>
        <div className="space-y-12 p-6">
          <div className="border-b border-gray-900/10 pb-2">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Consultar envio de chip
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Número do pedido
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="pedido"
                    id="pedido"
                    onChange={(e) => setPedidoInput(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nome do cliente
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="nome"
                    id="nome"
                    onChange={(e) => setNomeInput(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6 p-8">
              
              <button
                type="button"
                onClick={handleSearch}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
