import { IAMService } from "@/services";
import router from "@/shared/router";
import { SnackbarTimer, useSnackbar } from "@ginger-society/ginger-ui";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ConfirmRegistration = () => {
  const { show } = useSnackbar();

  const { registration_token, app_id } = useParams<{
    registration_token: string;
    app_id: string;
  }>();

  const checkConfirmation = async () => {
    if (!registration_token) {
      return;
    }
    await IAMService.identityRegisterationConfirmation({
      registrationToken: registration_token,
    });

    show(
      "Account registered successfully , Redirecting you to login",
      SnackbarTimer.Medium
    );

    setTimeout(() => {
      router.navigate(`/${app_id}/login`);
    }, SnackbarTimer.Medium);
  };

  useEffect(() => {
    checkConfirmation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app_id, registration_token, show]);

  return <>Checking, Please wait</>;
};

export default ConfirmRegistration;
