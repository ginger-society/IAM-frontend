import HeaderContainer from "@/components/organisms/HeaderContainer";
import { IAMService } from "@/services";
import { Header } from "@ginger-society/ginger-ui";
import { useCallback, useEffect } from "react";

const Home = () => {
  const fetchStatus = async () => {
    const data = await IAMService.routesIndex();
    console.log(data);
  };
  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <>
      <HeaderContainer />
    </>
  );
};

export default Home;
