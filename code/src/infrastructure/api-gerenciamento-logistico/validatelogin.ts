import axios from "axios";

class ValidateLogin {
  async validateLogin(email: string | null, token: string): Promise<any> {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios
      .post("http://localhost:3001/api/v1/gerenciamento-logistico/validateLogin", {
        email: email,
      }, { headers })
      .then((response) => {
        return response.data;
      });
  }
}

export default ValidateLogin;
