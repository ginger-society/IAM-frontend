import router from "@/shared/router";
import {
  Button,
  ButtonType,
  Input,
  Text,
  TextSize,
  TextColor,
  AuthContext
} from "@ginger-society/ginger-ui";
import styles from "./login.module.scss";

import { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { IAMService } from "@/services";
import { AppResponse } from "@/services/IAMService_client";
import { ENV_KEY } from "@/shared/references";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, checkSession, loading: authContextLoading, isAuthenticated } = useContext(AuthContext);
  const [error, setError] = useState<string>();
  const { app_id } = useParams<{ app_id: string }>();

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const [appData, setAppData] = useState<AppResponse>();

  useEffect(() => {
    const fetchAppData = async () => {
      if (app_id) {
        const app_data = await IAMService.identityGetAppByClientId({
          clientId: app_id,
        });

        setAppData(app_data);
      } else {
        setAppData({ name: 'Identity App', allowRegistration: false, logoUrl: 'https://www.gingersociety.org/img/ginger_icon.png' })
      }
    };
    fetchAppData();
    setErrorMsg('');

    checkSession && checkSession().then(() => {

    });
  }, [app_id, checkSession]);

  const signUp = async () => {
    router.navigate(`/${app_id}/register`);
  };

  const returnUrls = useMemo(() => {
    return {
      dev: `${appData?.appUrlDev}${appData?.redirectionPath}`,
      stage: `${appData?.appUrlStage}${appData?.redirectionPath}`,
      prod: `${appData?.appUrlProd}${appData?.redirectionPath}`,
    }
  }, [appData])



  useEffect(() => {
    const getTokenAndRedirect = async (appId: string) => {
      if (!user || !isAuthenticated || authContextLoading) {
        setErrorMsg('')
        return;
      }
      try {

        const tokens = await IAMService.identityGenerateAppTokens({ appId });
        window.location.href = `${returnUrls[ENV_KEY]}${tokens.accessToken}/${tokens.refreshToken}${router.state.location.search}`;
      } catch (error) {
        isAuthenticated && setErrorMsg('Access Denied!')
      }

    }


    if (user) {
      if (app_id) {
        checkSession && checkSession().then(() => {
          getTokenAndRedirect(app_id);
        })
      } else {
        router.navigate("/home");
      }
    }
  }, [app_id, authContextLoading, checkSession, isAuthenticated, returnUrls, user]);

  const signIn = async () => {
    setErrorMsg('')
    setLoading(true);
    try {
      const tokens = await IAMService.identityLogin({
        loginRequest: {
          email: email,
          password: password,
          clientId: app_id,
        },
      });
      if (app_id) {

        localStorage.setItem('access_token', tokens.iamTokens.accessToken)
        localStorage.setItem('refresh_token', tokens.iamTokens.refreshToken)
        if (tokens.appTokens) {
          window.location.href = `${returnUrls[ENV_KEY]}${tokens.appTokens.accessToken}/${tokens.appTokens.refreshToken}${router.state.location.search}`;
        }

      } else {
        localStorage.setItem('access_token', tokens.iamTokens.accessToken)
        localStorage.setItem('refresh_token', tokens.iamTokens.refreshToken)
        checkSession && checkSession()
        router.navigate('/home')
      }
    } catch (error) {
      setErrorMsg('Access Denied!')
    }
    setLoading(false);
  };

  const resetPassword = () => {
    router.navigate(`/${app_id}/request-password-link`);
  };

  return (
    <>
      {authContextLoading && <Text>Checking session , Please wait...</Text>}
      {!authContextLoading && isAuthenticated && <Text>Session is valid, Taking you back to the app {errorMsg && ` - Error : ${errorMsg}`}</Text>}
      {!authContextLoading && !isAuthenticated && <div className={styles["page-container"]}>
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
            <Text color={TextColor.Danger}>{errorMsg}</Text>
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
      </div>}
    </>
  );
};

export default LoginPage;
