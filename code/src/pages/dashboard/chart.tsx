'use client';

import { Card, AreaChart, Title, Text } from '@tremor/react';

export default function Example(props: any) {
  return (
    <Card className="mt-8">
      <Title>Ganhos</Title>
      <Text>Comparação de valores entre as MVNOs</Text>
      <AreaChart
        className="mt-4 h-80"
        data={props.data}
        categories={['Sales', 'Profit', 'Profit2']}
        index="Month"
        colors={['indigo', 'fuchsia', 'blue']}
        valueFormatter={(number: number) =>
          `$ ${Intl.NumberFormat('us').format(number).toString()}`
        }
        yAxisWidth={60}
      />
    </Card>
  );
}
