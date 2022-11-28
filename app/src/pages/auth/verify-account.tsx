import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import { success } from '../../components/common/message';
import { VerticalSpace } from '../../components/common/space';
import AuthForm from '../../components/common/auth-form';
import { GREEN_PRIMARY } from '../../styles/colors';

import auth0Service from '../../services/auth0';

interface IMatchParams {
  email: string;
}

interface Props extends RouteComponentProps<IMatchParams> {}

const VerifyAccount: React.FC<Props> = (props) => {
  const history = useHistory();
  const [err, setErr] = useState({});
  const { email } = props.match.params;
  const onSubmit = async (values: { [key: string]: string }) => {
    let code = '';
    Object.keys(values).map((key) => (code += values[key]));
    try {
      const data = await auth0Service.verifyAccount({ email, code: parseInt(code) });
      success(data.message);
      history.push('/login');
    } catch (e) {
      setErr({ ...e.response.data });
    }
  };
  return (
    <AuthForm
      heading="Autenticate your account"
      buttonText="Confirm"
      subHeading={
        <>
          <div>Please confirm your account</div>
          <div>by entering the authorisation code sent to</div>
          <div className="green">{email}</div>
        </>
      }
      onSubmit={onSubmit}
      isVerifyAccount
      err={err}
      setErr={setErr}
    >
      <>
        <VerticalSpace height={32} />
        <div>It may take a minute to receive the code.</div>
        <VerticalSpace height={7} />
        <div>
          Haven't received it? <span style={{ color: GREEN_PRIMARY }}>Resend a new code</span>
        </div>
      </>
    </AuthForm>
  );
};

export default VerifyAccount;
