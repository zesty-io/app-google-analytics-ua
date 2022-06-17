import { request } from "./request";
import { notify } from "./notify";

export function fetchRecentItems(userZUID, start) {
    return (dispatch) => {
      return request(
        `${process.env.API_INSTANCE}/search/items?q=${userZUID}&order=created&dir=DESC&start_date=${start}`
      ).then((res) => {
        if (res.status === 200) {
          dispatch({
            type: "FETCH_ITEMS_SUCCESS",
            payload: res.data
              .filter((item) => {
                if (item.meta && item.web && item.data) {
                  return true;
                } else {
                  console.error("Broken item", item);
                  return false;
                }
              }) // We only allow items which include meta, web & data
              .reduce((acc, item) => {
                acc[item.meta.ZUID] = item;
                return acc;
              }, {}),
          });
        }
  
        if (res.status === 400) {
          dispatch(
            notify({
              message: `There was an issue fetching recent items: ${res.error}`,
              kind: "error",
            })
          );
        }
  
        return res;
      });
    };
  }
  