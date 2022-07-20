
import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from "@mui/material/Link"
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import Box from '@mui/material/Box'

export default function MetricSelection({ metrics, selectedMetrics, onSelect }){

    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  
    return (
      <div>
        <Link aria-describedby={id} onClick={handleClick} sx={{ padding : 0, cursor : "pointer"}} color="secondary">
          <Typography sx={{ fontWeight : "bold" }}>{selectedMetrics ? selectedMetrics : "Select a Metric"}</Typography>
        </Link>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
            <Box p={4}>
                <FormGroup>
                    {metrics.map((metrics, i) => {

                        const isItemSelected = selectedMetrics ? metrics.label === selectedMetrics : false;
                        const labelId = `enhanced-table-checkbox-${i}`;

                        return (
                            <FormControlLabel control={<Checkbox color="secondary" onChange={(event) => onSelect(event, metrics.label)} checked={isItemSelected} inputProps={{  'aria-labelledby': labelId, }}  />} label={metrics.label} />
                        )
                    })}
                </FormGroup>
            </Box>
        </Popover>
      </div>
    );

}