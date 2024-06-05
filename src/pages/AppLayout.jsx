import Sidebar from "../components/Sidebar";
import Map from "../components/Map";

import styles from "./AppLayout.module.css";
function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar className={styles.Sidebar} />
      <Map className={styles.map} />
    </div>
  );
}

export default AppLayout;
