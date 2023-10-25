import Header from "@/components/header";
import { Card, Metric, Text, Title, BarList, Flex, Grid } from "@tremor/react";
import Chart from "./chart";
import { GetServerSideProps } from "next";
import { destroyCookie, parseCookies } from "nookies";
import ValidateLogin from "@/infrastructure/api-gerenciamento-logistico/validatelogin";
import DashboardApi from "@/infrastructure/api-gerenciamento-logistico/dashboard";

export default function Dashboard(props: any) {
  
  const dadosChart = props.dataG;
  return (
    <>
      <Header page="Dashboard"></Header>
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
          {props.data.map((item: any) => (
            <Card key={item.category}>
              <Title>{item.category}</Title>
              <Flex
                justifyContent="start"
                alignItems="baseline"
                className="space-x-2"
              >
                <Metric>{item.stat}</Metric>
                <Text></Text>
              </Flex>
              <Flex className="mt-6">
                <Text>Mvno</Text>
                <Text className="text-right">Quantidade</Text>
              </Flex>
              <BarList
                data={item.data}
                valueFormatter={(number: number) =>
                  Intl.NumberFormat("us").format(number).toString()
                }
                className="mt-2"
              />
            </Card>
          ))}
        </Grid>
        <Chart data={dadosChart}></Chart>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  var nivel = 0;
  const loginValidate = new ValidateLogin();
  const getDashboard = new DashboardApi();
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
    const permissoesDashboard = [1, 2];
    const login = await loginValidate.validateLogin(user, token);
    nivel = parseInt(login.nivel);
    console.log(nivel);
    if (!permissoesDashboard.includes(nivel)) {
      console.log("Não tem permissão");
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
    const data = await getDashboard.dashboard(token);
    const dataG = await getDashboard.grafico(token);
    return {
      props: { data, dataG, nivel },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};
