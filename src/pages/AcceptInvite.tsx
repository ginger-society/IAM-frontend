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

import { useState } from "react";
import { useParams } from "react-router-dom";
import { AppResponse } from "@/services/IAMService_client";
import { IAMService } from "@/services";

const AcceptInvite = () => {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState<string>();
  const { token } = useParams<{ token: string }>();

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
      await IAMService.identityAcceptInvite({
        invitationToken: token,
        acceptInviteRequest: {
          password,
        },
      });
      setPassword("");
      setRePassword("");
      show(
        "Thank you accepting. Your password has been updated successfully, You can login now.",
        SnackbarTimer.Long
      );
      router.navigate('/login')
    } catch (error) {
      setError("Unable to accept invite. May be the invitation has expired. Please reach out to your support team");
    }
  };

  return (
    <div className={styles["page-container"]}>
      <div className={styles["form-container"]}>
        <Text size={TextSize.Large}>Invitation</Text>
        <Text>You have been invited to join our platform. Please create your password. Your username is your emailID </Text>
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

        <Text>
          By Accepting this request you agree to our{" "}
          <Text color={TextColor.Info} underline>
            <a href={"https://gingersociety.org/terms-of-use"} style={{ color: 'var(--info-color)' }} target="_blank">
              Terms of use
            </a>
          </Text>
        </Text>

        <div className={styles["btn-group"]}>
          <Button
            label="Accept Invite and Update password"
            type={ButtonType.Primary}
            onClick={updatePassword}
          />
        </div>
      </div>
    </div >
  );
};

export default AcceptInvite;
