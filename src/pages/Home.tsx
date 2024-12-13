import HeaderContainer from "@/components/organisms/HeaderContainer";
import { IAMService } from "@/services";
import { Text, TextSize, Input } from "@ginger-society/ginger-ui";
import { useEffect, useState } from "react";
import styles from './home.module.scss';
import { AccessibleApp } from "@/services/IAMService_client";

const Home = () => {
  const [apps, setApps] = useState<AccessibleApp[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAccessibleApps = async () => {
    const apps = await IAMService.identityGetAccessibleApps();
    setApps(apps);
  };

  useEffect(() => {
    fetchAccessibleApps();
  }, []);

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
            <div key={index} className={styles['app-container']}>
              <img src={app.logoUrl || "https://www.gingersociety.org/img/ginger_icon.png"} width="100" alt={app.name} />
              <div>
                <Text size={TextSize.Large}>{app.name}</Text> <br />
                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, possimus facere sit volu?</Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
