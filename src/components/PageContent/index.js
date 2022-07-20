import React, { useEffect, useState } from "react";
import { useDateRange } from "../../context/DateRangeContext";
import { useGoogle } from "../../context/GoogleContext";
import shelldata from "../ui/ShellData/shelldata";
import { Box } from "@mui/material";
import { PageContentTable } from "./PageContentTable";
import { PageContentGraph } from "./PageContentGraph";
import { useNotify } from "../../context/SnackBarContext";
import { useAnalyticsApi } from "../../services/useAnalyticsApi";
import { PageContentTableSummary } from "./PageContentTableSummary";

export default function PageContent({ instance }) {

  const { getChartData, getContentPages } = useAnalyticsApi(instance.ZUID)
  const notify = useNotify();
  const dateRange = useDateRange();
  const { googleDetails } = useGoogle();
  const [selectedPagePath, setSelectedPagePath] = useState([]);
  const [chartData, setChartData] = useState(shelldata.shellBarData);
  const [googleData, setGoogleData] = useState([]);
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    if (googleDetails) {

      try {
        setLoading(true)
        const data = await getChartData(googleDetails.defaultProfileId, dateRange, "bar", selectedPagePath);
        const tableData = await getContentPages(googleDetails.defaultProfileId, dateRange)
        setChartData(data.chartJSData);
        setTableData(tableData)
        setGoogleData(data.googleData);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        notify.current.error(error.message);

      }
    }
  }, [googleDetails, selectedPagePath, dateRange]);

  const onCheckChange = (event, name) => {
    if (event.target.checked)
      return setSelectedPagePath([...selectedPagePath, name]);
    setSelectedPagePath(selectedPagePath.filter((site) => site !== name));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: "column",
        }}
      >
        
        <PageContentGraph selectedPath={selectedPagePath} data={chartData} isLoading={loading} />
        <PageContentTableSummary selectedPath={selectedPagePath} data={tableData.googleData} tableData={googleData} isLoading={loading} />
        <PageContentTable selectedPagePath={selectedPagePath} tableData={tableData} onCheckChange={onCheckChange} isLoading={loading} />
          
      </Box>
    </>
  );
}
