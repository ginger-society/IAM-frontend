import { IAMService } from "@/services";
import router from "@/shared/router";
import { useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "@ginger-society/ginger-ui";


const LogoutPage = () => {
  const { app_id } = useParams<{ app_id: string }>()
  const { checkSession } = useContext(AuthContext);

  const invalidateTokens = useCallback(async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      await IAMService.identityLogout({ logoutRequest: { refreshToken } })
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    checkSession && checkSession();
    router.navigate(`/${app_id}/login`)
  }, [app_id])

  useEffect(() => {
    invalidateTokens();
  }, [app_id, invalidateTokens])

  return <>Clearing session. Please wait</>
}

export default LogoutPage;