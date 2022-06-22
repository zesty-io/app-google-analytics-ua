export const getPageTraffic = (userId, profileId) => {

    return fetch(`http://localhost:7373/getPageViewData/?user_id=${userId}`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          gaRequest: {
            reportRequests: [
              {
                viewId: profileId,
                dateRanges: [
                  {
                    startDate: "2015-06-01",
                    endDate: "2022-06-22",
                  },
                ],
                metrics: [
                  { expression: "ga:sessions" },
                  { expression: "ga:pageviews" },
                ],
                dimensions: [
                  { name: "ga:date" },
                  { name: "ga:dayOfWeekName" },
                  { name: "ga:month" },
                  { name: "ga:day" },
                  { name: "ga:year" },
                ],
                orderBys: [
                  {
                    fieldName: "ga:date",
                    orderType: "VALUE",
                    sortOrder: "ASCENDING",
                  },
                ],
              },
            ],
          },
          type: "bar",
          excludeLabelDimensions: [0],
        })
      }).then( async (result) => {
        const resultJson = await result.json()
        console.log(resultJson)
        return resultJson
      })

}

export const getInboundTraffic = (userId, profileId) => {

    return fetch(
        `http://localhost:7373/getPageViewData/?zuid=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type":  'application/json',
          },
          body: JSON.stringify({
            gaRequest: {
              reportRequests: [
                {
                  viewId: profileId,
                  dateRanges: [{ startDate: "2015-06-01",
                  endDate: "2022-06-22" }],
                  metrics: [{ expression: "ga:sessions" }],
                  dimensions: [{ name: "ga:medium" }],
                  dimensionFilterClauses: [
                    {
                      filters: [
                        {
                          dimensionName: "ga:medium",
                          not: true,
                          expressions: ["(not set)"],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            type: "pie",
          }),
        }
      ).then( async (result) => {
        const resultJson = await result.json()
        console.log(resultJson)
        return resultJson
      })

}

export const getSocialTraffic = (userId, profileId) => {
    return fetch(
        `http://localhost:7373/getPageViewData/?zuid=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gaRequest: {
              reportRequests: [
                {
                  viewId: profileId,
                  dateRanges: [{ startDate: "2015-06-01",
                  endDate: "2022-06-22", }],
                  metrics: [{ expression: "ga:sessions" }],
                  dimensions: [{ name: "ga:socialNetwork" }],
                  dimensionFilterClauses: [
                    {
                      filters: [
                        {
                          dimensionName: "ga:socialNetwork",
                          not: true,
                          expressions: ["(not set)"],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            type: "pie",
          }),
        }
      ).then( async (result) => {
        const resultJson = await result.json()
        console.log(resultJson)
        return resultJson
      })
}
