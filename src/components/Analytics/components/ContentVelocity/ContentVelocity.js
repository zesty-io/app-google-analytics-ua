import { Component } from "react";
//import { Card, CardHeader, CardContent } from "@zesty-io/core/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent'

export const ContentVelocity = () => {

  return (
    <Card>
        <CardHeader>
          <h2>
            <FontAwesomeIcon icon={faChartLine} />
            Content Velocity
          </h2>
        </CardHeader>
        <CardContent>
          <table>
            <tr>
              <td>Published Last 7 date</td>
              <td />
            </tr>
            <tr>
              <td>Published Last 30 date</td>
              <td />
            </tr>
            <tr>
              <td>Total Pageviews</td>
              <td />
            </tr>
          </table>
        </CardContent>
      </Card>
  )

}
