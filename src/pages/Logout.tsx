import router from "@/shared/router";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const LogoutPage = () => {
  const { app_id } = useParams<{ app_id: string }>()

  useEffect(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.navigate(`${app_id}/login`)
  }, [app_id])

  return <>Clearing session. Please wait</>
}

export default LogoutPage;