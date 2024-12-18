import router from "@/shared/router";
import {
  Button,
  ButtonType,
  Input,
  Text,
  TextSize,
  TextColor,
  useSnackbar,
  SnackbarTimer,
  AuthContext
} from "@ginger-society/ginger-ui";
import styles from "./login.module.scss";

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppResponse } from "@/services/IAMService_client";
import { IAMService } from "@/services";

const RegisterationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const { user } = useContext(AuthContext);
  const [error, setError] = useState<string>();
  const { app_id } = useParams<{ app_id: string }>();
  const [appData, setAppData] = useState<AppResponse>();

  const { show } = useSnackbar();

  useEffect(() => {
    const fetchAppData = async () => {
      if (app_id) {
        const app_data = await IAMService.identityGetAppByClientId({
          clientId: app_id,
        });
        if (!app_data.allowRegistration) {
          show(
            "This app does not allow registration , Navigating to login!. Please contact your admin if you need access and you dont have it",
            SnackbarTimer.Long
          );
          router.navigate(`/${app_id}/login`);
        }
        setAppData(app_data);
      }
    };
    fetchAppData();
  }, [app_id, show]);

  const signUp = async () => {
    if (password !== rePassword) {
      setError("Passwords do not match");
      return;
    }
    if (!app_id) {
      return;
    }
    try {
      await IAMService.identityRegister({
        registerRequest: {
          email,
          password,
          appId: app_id,
        },
      });
      setEmail("");
      setPassword("");
      setRePassword("");
      show(
        "Account creation request generated successfully , Please open the email we sent and click to verify your identity",
        SnackbarTimer.Long
      );
    } catch (err) {
      setError("Registration failed");
    }
  };

  useEffect(() => {
    if (user) {
      router.navigate("/");
    }
  }, [user]);

  const signIn = () => {
    router.navigate(`/${app_id}/register/login`);
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
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          placeholder="Password.."
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          value={rePassword}
          label="Confirm Password"
          type="password"
          placeholder="Please re-enter the password"
          onChange={(e) => setRePassword(e.target.value)}
        />
        <Text color={TextColor.Danger}>{error}</Text>
        <div className={styles["btn-group"]}>
          <Button
            label="Create account"
            type={ButtonType.Primary}
            onClick={signUp}
          />
        </div>
        <Text>You can also try the following options </Text>
        <div className={styles["secondary-action-group"]}>
          <Button
            label={<Text underline>Sign in</Text>}
            type={ButtonType.Tertiary}
            onClick={() => router.navigate(`/${app_id}/login`)}
          />
          <Button
            label={<Text underline>Reset password</Text>}
            type={ButtonType.Tertiary}
            onClick={resetPassword}
          />
        </div>
        {appData?.tncLink && (
          <Text>
            By Signing up you agree to our{" "}
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

export default RegisterationPage;
