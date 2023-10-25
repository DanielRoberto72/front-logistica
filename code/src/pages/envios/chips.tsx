import Header from "@/components/header";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Form } from "@/components/form";

const mvnos = [
  {
    pedido: 9999,
    produto: 5,
    imageUrl: "/assets/envios/correios-logo.png",
    quantidade: 1,
    dtPedido: "2023-01-23 00:00:00",
    sku: "sku1",
    item: "item 1",
  },
  {
    pedido: 9999,
    produto: 5,
    imageUrl: "/assets/envios/mega-logo.png",
    quantidade: 1,
    dtPedido: "2023-01-23 00:00:00",
    sku: "sku1",
    item: "item 1",
  },
  {
    pedido: 9999,
    produto: 5,
    imageUrl: "/assets/envios/pernambucanas-logo.png",
    quantidade: 1,
    dtPedido: "2023-01-23 00:00:00",
    sku: "sku1",
    item: "item 1",
  },
  {
    pedido: 9999,
    produto: 5,
    imageUrl: "/assets/envios/flamengo-logo.png",
    quantidade: 1,
    dtPedido: "2023-01-23 00:00:00",
    sku: "sku1",
    item: "item 1",
  },
  {
    pedido: 9999,
    produto: 5,
    imageUrl: "/assets/envios/boticario-logo.png",
    quantidade: 1,
    dtPedido: "2023-01-23 00:00:00",
    sku: "sku1",
    item: "item 1",
  },
  {
    pedido: 9999,
    produto: 5,
    imageUrl: "/assets/envios/Uber-logo.png",
    quantidade: 1,
    dtPedido: "2023-01-23 00:00:00",
    sku: "sku1",
    item: "item 1",
  },
];

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Chips() {
  const router = useRouter();
  const id = router.query.id;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header page="Chips vendidos"></Header>
      <main className=" mt-2 mx-2">
        <ul role="list">
          {mvnos.map((mvno) => (
            <li
              key={mvno.pedido}
              className="overflow-hidden rounded-xl border border-gray-200 mb-2"
            >
              <div className=" flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                <img
                  src={mvno.imageUrl}
                  alt={mvno.item}
                  className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                />
                #{mvno.pedido}
                <div className="text-sm font-medium leading-6 text-gray-900">
                  {mvno.produto}
                </div>
                <div className="text-sm font-medium leading-6 text-gray-900">
                  {mvno.item}
                </div>
                <div className="text-sm font-medium leading-6 text-gray-900">
                  {mvno.sku}
                </div>
              </div>
              <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">
                    Data da Compra: {mvno.dtPedido}
                  </dt>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dd className="flex items-start gap-x-2">
                    <div className="font-medium text-gray-900">Quantidade</div>
                    <div className="rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset">
                      {mvno.quantidade}
                    </div>
                  </dd>
                  <dt className="text-gray-500">
                    <a
                      onClick={() => setOpen(true)}
                      className="w-16 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-normal text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Enviar
                    </a>
                  </dt>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </main>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Detalhes do pedido
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <Form></Form>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
