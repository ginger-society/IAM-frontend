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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(AuthContext);
  const [error, setError] = useState<string>();
  const signUp = async () => {};

  useEffect(() => {
    if (user) {
      router.navigate("/");
    }
  }, [user]);

  const signIn = async () => {};

  return (
    <div className={styles["page-container"]}>
      <div className={styles["form-container"]}>
        <div className={styles["app-details-container"]}>
          <img width={200} src="/ginger-db.png" />
          <Text size={TextSize.Large}>GingerDB Studio</Text>
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
          <Button label="Sign in" type={ButtonType.Primary} onClick={signIn} />
          <Text>Or</Text>
          <Button label="Sign Up" onClick={signUp} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
