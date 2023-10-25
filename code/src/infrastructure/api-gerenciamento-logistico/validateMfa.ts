import axios from "axios";

class ValidateMfa {
  async validateMfa(email: string | null, mfa: string): Promise<any> {
    return axios
      .post("http://localhost:3001/api/v1/gerenciamento-logistico/validateMfa", {
        email: email,
        mfa: mfa,
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default ValidateMfa;
