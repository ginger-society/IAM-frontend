import { AuthContext } from "@/shared/AuthContext";
import router from "@/shared/router";
import {
  Button,
  ButtonType,
  Input,
  Text,
  TextSize,
  TextColor,
} from "@ginger-society/ginger-ui";
import styles from "./login.module.scss";

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { IAMService } from "@/services";
import { AppResponse } from "@/services/IAMService_client";
import { ENV_KEY } from "@/shared/references";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(AuthContext);
  const [error, setError] = useState<string>();
  const { app_id } = useParams<{ app_id: string }>();

  const [loading, setLoading] = useState<boolean>(false);

  const [appData, setAppData] = useState<AppResponse>();

  useEffect(() => {
    const fetchAppData = async () => {
      if (app_id) {
        const app_data = await IAMService.identityGetAppByClientId({
          clientId: app_id,
        });

        setAppData(app_data);
      }
    };
    fetchAppData();
  }, [app_id]);

  const signUp = async () => {
    router.navigate(`/${app_id}/register`);
  };

  useEffect(() => {
    if (user) {
      router.navigate("/");
    }
  }, [user]);

  const signIn = async () => {
    if (!app_id) {
      return;
    }
    setLoading(true);
    const tokens = await IAMService.identityLogin({
      loginRequest: {
        email: email,
        password: password,
        clientId: app_id,
      },
    });

    setLoading(false);

    const returnUrls = {
      dev: appData?.appUrlDev,
      stage: appData?.appUrlStage,
      prod: appData?.appUrlProd,
    };
    console.log(returnUrls.dev, returnUrls.stage, returnUrls.prod);

    window.location.href = `${returnUrls[ENV_KEY]}${tokens.accessToken}/${tokens.refreshToken}`;
  };

  const resetPassword = () => {
    router.navigate(`/${app_id}/request-password-link`);
  };

  return (
    <div className={styles["page-container"]}>
      <div className={styles["form-container"]}>
        <div className={styles["app-details-container"]}>
          {appData?.logoUrl && <img width={200} src={appData?.logoUrl} />}
          <Text size={TextSize.Large}>{appData?.name}</Text>
        </div>
        <Input label="Email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          label="Password"
          type="password"
          placeholder="Password.."
          onChange={(e) => setPassword(e.target.value)}
        />
        <Text color={TextColor.Danger}>{error}</Text>
        <div className={styles["btn-group"]}>
          <Button
            label="Sign in"
            type={ButtonType.Primary}
            onClick={signIn}
            loading={loading}
          />
        </div>
        <Text>You can also try the following options </Text>
        <div className={styles["secondary-action-group"]}>
          {appData?.allowRegistration && (
            <Button
              label={<Text underline>Sign Up</Text>}
              type={ButtonType.Tertiary}
              onClick={signUp}
            />
          )}
          <Button
            label={<Text underline>Reset password</Text>}
            type={ButtonType.Tertiary}
            onClick={resetPassword}
          />
        </div>
        {appData?.tncLink && (
          <Text>
            By Signing in you agree to our{" "}
            <Text color={TextColor.Info} underline>
              <a href={appData?.tncLink} style={{ color: 'var(--info-color)' }} target="_blank">
                Terms of use
              </a>
            </Text>
          </Text>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
