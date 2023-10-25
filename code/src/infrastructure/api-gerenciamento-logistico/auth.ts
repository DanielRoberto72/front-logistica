import axios from "axios";

class Auth {
  async auth(username: string, password: string): Promise<any> {
    return axios
      .post("http://localhost:3001/api/v1/gerenciamento-logistico/auth", {
        email: username,
        senha: password,
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default Auth;
