import { message } from 'antd';

const info = (text: string) => {
  message.info({
    content: text,
  });
};

const success = (text: string) => {
  message.success({
    content: text,
  });
};

const error = (text: string) => {
  message.error({
    content: text,
  });
};

export { info, success, error };
