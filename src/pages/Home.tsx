import HeaderContainer from "@/components/organisms/HeaderContainer";
import { IAMService } from "@/services";
import { Text, TextSize, Input } from "@ginger-society/ginger-ui";
import { useEffect, useState } from "react";
import styles from './home.module.scss';
import { AccessibleApp, AppResponse } from "@/services/IAMService_client";
import { ENV_KEY } from "@/shared/references";
import { ENV_KEY_TYPE } from "@/shared/types";

const Home = () => {
  const [apps, setApps] = useState<AccessibleApp[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAccessibleApps = async () => {
    const apps_list = await IAMService.identityGetAccessibleApps();
    setApps(apps_list.filter(a => a.hasWebInterface));
  };

  useEffect(() => {
    fetchAccessibleApps();
  }, []);

  const openApp = (app: AppResponse) => {
    let urlToOpen;
    if (ENV_KEY as ENV_KEY_TYPE === 'dev') {
      urlToOpen = app.appUrlDev;
    } else if (ENV_KEY as ENV_KEY_TYPE === 'stage') {
      urlToOpen = app.appUrlStage;
    } else {
      urlToOpen = app.appUrlProd;
    }
    if (urlToOpen) {
      window.open(urlToOpen, '_blank');
    }
  }

  return (
    <>
      <HeaderContainer />
      <div className={styles.container}>
        <div className={styles.header}>
          <Text size={TextSize.XLarge}>Your apps</Text>
          <div style={{ width: '500px' }}>
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={({ target: { value } }) => setSearchQuery(value)}
            />
          </div>
        </div>
        <div className={styles['app-grid']}>
          {apps.filter((a) => a.name.toLowerCase().includes(searchQuery)).map((app, index) => (
            <div onClick={() => openApp(app)} key={index} className={styles['app-container']}>
              <img src={app.logoUrl || "https://www.gingersociety.org/img/ginger_icon.png"} width="100" alt={app.name} />
              <div>
                <Text size={TextSize.Large}>{app.name}</Text> <br />
                <Text>{app.description}</Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
