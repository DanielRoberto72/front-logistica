import axios from "axios";

class Dashboard {
  async dashboard(token: string): Promise<any> {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios
      .get("http://localhost:3001/api/v1/gerenciamento-logistico/dashboard", { headers })
      .then((response) => {
        return response.data;
      });
  }

  async grafico(token: string): Promise<any> {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios
      .get("http://localhost:3001/api/v1/gerenciamento-logistico/dashboard/grafico", { headers })
      .then((response) => {
        return response.data;
      });
  }
}

export default Dashboard;
