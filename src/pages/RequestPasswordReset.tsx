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

const RequestPasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const { app_id } = useParams<{ app_id: string }>();

  const { show } = useSnackbar();

  const requestResetLink = async () => {
    if (email.length === 0) {
      setError("Email is needed!. Where else I will get to know who you are?");
      return;
    }

    try {
      await IAMService.identityRequestPasswordReset({
        requestPasswordRequest: { emailId: email },
      });

      show(
        "Password reset link has been sent to you successfully, Please check email.",
        SnackbarTimer.Medium
      );
      setError("");
      setEmail("");
    } catch (error) {
      setError(
        "Please try again later!. Unable to process your request as of now. Please check the email ID if it is correct."
      );
    }
  };

  const navigateToSignIn = () => {
    router.navigate(`/${app_id}/login`);
  };

  return (
    <div className={styles["page-container"]}>
      <div className={styles["form-container"]}>
        <Input
          label="Registered email ID"
          value={email}
          placeholder="We will send you the reset link on this email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Text color={TextColor.Danger}>{error}</Text>
        <div className={styles["btn-group"]}>
          <Button
            label="Get the reset link"
            type={ButtonType.Primary}
            onClick={requestResetLink}
          />
          <Button
            label={<Text underline>Go to Sing in</Text>}
            type={ButtonType.Tertiary}
            onClick={navigateToSignIn}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestPasswordResetPage;
