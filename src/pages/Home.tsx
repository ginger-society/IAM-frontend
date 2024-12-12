import HeaderContainer from "@/components/organisms/HeaderContainer";
import { IAMService } from "@/services";
import { Text, TextSize, Input } from "@ginger-society/ginger-ui";
import { useEffect, useState } from "react";
import styles from './home.module.scss';
import { AccessibleApp } from "@/services/IAMService_client";

const initialData = {
  total_count: 6,
  data: [
    {
      client_id: "metadata-db-runtime",
      name: "Metadata DB Studio",
      logo_url: "https://www.gingersociety.org/img/ginger-db.png",
      disabled: false,
      group_id: 44,
      tnc_link: null,
      allow_registration: false,
      id: 3
    },
    {
      client_id: "iam-db-runtime",
      name: "IAM DB Studio",
      logo_url: "https://www.gingersociety.org/img/ginger-db.png",
      disabled: false,
      group_id: 43,
      tnc_link: null,
      allow_registration: false,
      id: 4
    },
    {
      client_id: "iam-admin-staging",
      name: "IAM Admin",
      logo_url: "https://www.gingersociety.org/img/ginger_icon.png",
      disabled: false,
      group_id: null,
      tnc_link: null,
      allow_registration: false,
      id: 6
    },
    {
      client_id: "dev-portal-staging",
      name: "Dev Portal",
      logo_url: "https://www.gingersociety.org/img/ginger-dev-portal-icon.png",
      disabled: false,
      group_id: null,
      tnc_link: "https://www.gingersociety.org/terms-of-use/",
      allow_registration: true,
      id: 1
    },
    {
      client_id: "dev-machine",
      name: "Developer's machine",
      logo_url: null,
      disabled: false,
      group_id: null,
      tnc_link: null,
      allow_registration: false,
      id: 2
    },
    {
      client_id: "db-compose-test-env",
      name: "DB Compose Test Env",
      logo_url: "https://www.gingersociety.org/img/ginger_icon.png",
      disabled: false,
      group_id: null,
      tnc_link: null,
      allow_registration: false,
      id: 5
    }
  ]
};

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
            />
          </div>
        </div>
        <div className={styles['app-grid']}>
          {apps.map((app, index) => (
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
