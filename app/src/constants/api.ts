const { NODE_ENV } = process.env;

interface IEnvApi {
  production: string;
  test: string;
  development: string;
}

const envApi: IEnvApi = {
  production: 'http://190.2.134.199:8080',
  test: 'http://190.2.134.199:8080',
  // development: 'http://190.2.134.199:8080',
  development: 'http://localhost:8080',
};

export default envApi[NODE_ENV];
