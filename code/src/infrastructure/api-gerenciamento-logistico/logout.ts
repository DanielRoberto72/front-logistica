import axios from "axios";
import router from "next/router";

class Logout {
  async logout(username: string | null): Promise<any> {
    console.log(username);

    if (username == null) {
      sessionStorage.clear();
      router.push("/");
    } else {
      return axios
        .post("http://localhost:3001/api/v1/gerenciamento-logistico/logout", {
          email: username,
        })
        .then((response) => {
          return response.data;
        });
    }
  }
}

export default Logout;
