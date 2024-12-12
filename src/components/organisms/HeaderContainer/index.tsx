import React, { useContext, useEffect, useState } from "react";
import {
  Header,
  AuthHeartBeat,
  HeaderPositionEnum,
  AuthContext, AuthContextInterface
} from "@ginger-society/ginger-ui";
import styles from "./header.module.scss";
import { IAMService } from "@/services";

import router from "@/shared/router";
import { ValidateTokenResponse } from "@/services/IAMService_client";
import { APP_ICON, ORG_NAME } from "@/shared/constants";

interface HeaderContainerProps {
  children?: React.ReactNode;
}

const HeaderContainer: React.FC<HeaderContainerProps> = ({ children }) => {

  const { user, clearSession } = useContext<AuthContextInterface<ValidateTokenResponse>>(AuthContext);

  const logOut = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        await IAMService.identityLogout({ logoutRequest: { refreshToken } });
      }
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");
      clearSession && clearSession();
      router.navigate('/login')
    } catch (err) {
      console.error(err);
    }
  };

  const navigateToHome = () => {
    router.navigate(`/home`);
  };

  const refreshTokenFn = async (refreshToken: string) => {
    const tokens = await IAMService.identityRefreshToken({
      refreshTokenRequest: { refreshToken },
    });
    return tokens.accessToken;
  };


  return (
    <>
      {user && (
        <>
          <AuthHeartBeat refreshTokenFn={refreshTokenFn} />
          <Header
            position={HeaderPositionEnum.Fixed}
            brandName={
              <span onClick={navigateToHome} className={styles["home-link"]}>
                <strong>{ORG_NAME}</strong>
              </span>
            }
            user={{
              name: user?.firstName || user.sub.split("@")[0],
              email: user?.sub,
            }}
            icon={
              <img
                className={styles["icon"]}
                src={APP_ICON}
              ></img>
            }
            onLogout={logOut}
            showThemeSwitcher={true}
            arbitaryContent={children}
          />
        </>
      )}
    </>
  );
};

export default HeaderContainer;
