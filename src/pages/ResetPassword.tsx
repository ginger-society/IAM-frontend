import { AuthContext } from "@/shared/AuthContext";
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
} from "@ginger-society/ginger-ui";
import styles from "./login.module.scss";

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppResponse } from "@/services/IAMService_client";
import { IAMService } from "@/services";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState<string>();
  const { token } = useParams<{ token: string }>();
  const [appData, setAppData] = useState<AppResponse>();
  const { app_id } = useParams<{ app_id: string }>();

  const { show } = useSnackbar();

  const updatePassword = async () => {
    if (password !== rePassword) {
      setError("Confirm password does not match , please try again");
      return;
    }

    if (!token) {
      show(
        "Something is not right!. Are you sure you have followed the correct link",
        SnackbarTimer.Medium
      );
      return;
    }

    try {
      await IAMService.identityResetPassword({
        resetPasswordRequest: {
          token: token,
          newPassword: password,
        },
      });
      setPassword("");
      setRePassword("");
      show(
        "Password updated successfully, You can login now.",
        SnackbarTimer.Long
      );
      router.navigate(`/${app_id}/login`);
    } catch (error) {
      setError("Unable to update password. Please try again");
    }
  };

  return (
    <div className={styles["page-container"]}>
      <div className={styles["form-container"]}>
        <div className={styles["app-details-container"]}>
          <img width={200} src={appData?.logoUrl} />
          <Text size={TextSize.Large}>{appData?.name}</Text>
        </div>
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
            label="Update password"
            type={ButtonType.Primary}
            onClick={updatePassword}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
