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
      <Header
        brandName="Ginger Society"
        user={{ name: "Jane Doe", email: "jane.doe@example.com" }}
        icon={<span>Icon</span>}
        onLogout={() => alert("Logout clicked")}
      />
    </>
  );
};

export default Home;
