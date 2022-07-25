import { request } from "../utility/request";

export const useAnalyticsApi = (zuid) => {

    const dataApiUrl =  `${process.env.REACT_APP_SERVICE_GOOGLE_ANALYTICS_READ}/?zuid=${zuid}`;
    const domainApiUrl = `${process.env.REACT_APP_SERVICE_GOOGLE_DOMAINS}?zuid=${zuid}`

    const getChartData = (googleId, dateRange, type, filters = []) => {

        const pathFilter = filters.map(path => 'ga:pagePath==' + path).join(",");

        return request(dataApiUrl, {
            method: "POST",
            headers: {
              "content-type": "text/plain",
            },
            body: JSON.stringify({
              gaRequest: {
                reportRequests: [
                  {
                    viewId: googleId,
                    dateRanges: [{ startDate: dateRange.startDate, endDate: dateRange.endDate }],
                    metrics: [
                        
                      { expression: "ga:pageValue" },
                      { expression: "ga:exitRate" },
                      { expression: "ga:bounceRate" },
                      { expression: "ga:entrances" },
                      { expression: "ga:avgTimeOnPage" },
                      { expression: "ga:uniquePageviews" },
                      { expression: "ga:pageViews" },
                      
                    ],
                    dimensions: [
                        { name: "ga:date" },
                    ],
                    orderBys: [
                        {
                          fieldName: "ga:date",
                          orderType: "VALUE",
                          sortOrder: "ASCENDING",
                        },
                    ],
                    filtersExpression : pathFilter
                  },
                ],
              },
              type: type,
            }),
          })
    }

    const getContentPages = (googleId, dateRange, pageSize = 10) => {

        return request(dataApiUrl, {
            method: "POST",
            headers: {
              "content-type": "text/plain",
            },
            body: JSON.stringify({
              gaRequest: {
                reportRequests: [
                  {
                    viewId: googleId,
                    dateRanges: [{ startDate: dateRange.startDate, endDate: dateRange.endDate }],
                    metrics: [
                        { expression: "ga:pageValue" },
                        { expression: "ga:exitRate" },
                        { expression: "ga:bounceRate" },
                        { expression: "ga:entrances" },
                        { expression: "ga:avgTimeOnPage" },
                        { expression: "ga:uniquePageviews" },
                        { expression: "ga:pageViews" },
                    ],
                    dimensions: [{ name: "ga:pagePath" }],
                    orderBys: [
                      {
                        fieldName: "ga:pageViews",
                        sortOrder: "DESCENDING",
                      },
                    ],
                    pageSize: pageSize,
                  },
                ],
              },
              type: "bar",
            }),
          })

    }

    const getGaDomain = () => {
        return request(
            domainApiUrl,
            {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            }
        );
    };


    return { getChartData, getContentPages, getGaDomain }

}