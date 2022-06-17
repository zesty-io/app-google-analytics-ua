import cx from "classnames";
import moment from "moment";
import { useState, useEffect } from 'react' 
// import { ContentVelocity } from "./components/ContentVelocity";
import { PageviewTraffic } from "./components/PageviewTraffic";
import { InboundTraffic } from "./components/InboundTraffic";
import { SocialTraffic } from "./components/SocialTraffic";
import { TopPerforming } from "./components/TopPerforming";
import { RecentlyEdited } from "./components/RecentlyEdited";
import { GoogleAuthOverlay } from "./components/GoogleAuthOverlay";
import { fetchRecentItems } from "../../utility/user";
import shelldata from "./shelldata";
import styles from "./Analytics.less";
import { request } from '../../utility/request'

export default function Analytics(state) {

  const [recentlyEditedItems, setRecentlyEditedItems] = useState([])
  const [favoriteModels, setFavoriteModels] = useState([])
  const [loading, setLoading] = useState(true)
  const [webEngineOn, setWebEngineOn] = useState(true)
  const [gaAuthenticated, setGaAuthenticated] = useState(Boolean(state.instance.google_profile_id))
  const [gaLegacyAuth, setGaLegacyAuth] = useState(false)
  const [domainSet, setDomainSet] = useState(Boolean(
    state.instance.domains &&
    state.instance.domains[0] &&
    state.instance.domains[0].domain
  ))

    useEffect(()=> {
     
      if (state.instance.google_profile_id) {
        const start = moment().subtract(120, "days").format("YYYY-MM-DD");
        fetchRecentItems(state.instance.user.ZUID, state.instance.ZUID, start)
          .then((res) => {
            if (res && res.data) {
              setRecentlyEditedItems(getLastEditedItems(res.data))
              setFavoriteModels(getFavoriteModels(res.data))
              setLoading(false)
            } else {
              setLoading(false)
            }
          });
       }
    }, [])

    const fetchRecentItems = (userZUID, instanceZUID, start) => {
      return request(
        `https://${instanceZUID + process.env.REACT_APP_API_INSTANCE}search/items?q=${userZUID}&order=created&dir=DESC&start_date=${start}`
      )
    }

    const setGALegacyStatus = (status) => {
      setGaLegacyAuth(status)
    };
    /**
      Group items by model
      [
        [contentModelZUID, [item, item, ...]]
      ]
    **/
    const getFavoriteModels = (items) => {
      const grouped = items.reduce((acc, item) => {
        if (acc[item.meta.contentModelZUID]) {
          acc[item.meta.contentModelZUID].push(item);
        } else {
          acc[item.meta.contentModelZUID] = [item];
        }
        return acc;
      }, {});

      const sorted = Object.keys(grouped)
        .filter((item) => grouped[item][0].web.metaTitle)
        .map((contentModelZUID) => {
          return [contentModelZUID, grouped[contentModelZUID].slice(0, 3)];
        })
        .sort((a, b) => {
          if (a[1].length < b[1].length) {
            return 1;
          }
          if (a[1].length > b[1].length) {
            return -1;
          }
          return 0;
        });

      // Top three most edited models
      return sorted.slice(0, 3);
    }

    const getLastEditedItems = (items) => {
      return [...items]
        .sort((a, b) => {
          if (a.meta.updatedAt < b.meta.updatedAt) {
            return 1;
          }
          if (a.meta.updatedAt > b.meta.updatedAt) {
            return -1;
          }
          return 0;
        })
        .slice(0, 5);
    }

      return (
        <section className={styles.Dashboard}>
          <div className={styles.container}>
            <div
              className={cx(
                styles.columns,
                styles.graphs,
                styles.analyticsContainer
              )}
            >
              {(!gaAuthenticated || gaLegacyAuth) && (
                <GoogleAuthOverlay
                  gaLegacyAuth={gaLegacyAuth}
                  domainSet={domainSet}
                  gaAuthenticated={gaAuthenticated}
                  user={state.instance.user}
                  instance={state.instance}
                />
              )}
              {/* TODO add Google Auth Modal here */}
              <div className={cx(styles.column, styles.primary)}>
                <PageviewTraffic
                  setGALegacyStatus={setGALegacyStatus}
                  instanceZUID={state.instance.ZUID}
                  profileID={state.instance.google_profile_id}
                  data={shelldata.shellBarData()}
                  domainSet={domainSet}
                />
              </div>

              <div className={styles.column}>
                <InboundTraffic
                  setGALegacyStatus={setGALegacyStatus}
                  instanceZUID={state.instance.ZUID}
                  profileID={state.instance.google_profile_id}
                  data={shelldata.shellDoughnutData()}
                  domainSet={domainSet}
                />
                <SocialTraffic
                  setGALegacyStatus={setGALegacyStatus}
                  instanceZUID={state.instance.ZUID}
                  profileID={state.instance.google_profile_id}
                  data={shelldata.shellDoughnutData()}
                  domainSet={domainSet}
                />
              </div>
            </div>

            <div className={styles.columns}>
              {/*<div className={styles.column}>
              <ContentVelocity />
            </div>*/}
              <div className={cx(styles.column)}>
                <RecentlyEdited
                  items={recentlyEditedItems}
                  loading={loading}
                />
              </div>
              <div className={cx(styles.column, styles.recent)}>
                <TopPerforming
                  instanceZUID={state.instance.ZUID}
                  profileID={state.instance.google_profile_id}
                />
              </div>
            </div>
          </div>
        </section>
      );
  }
// );
