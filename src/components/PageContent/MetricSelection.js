
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
        <Link underline="none" aria-describedby={id} onClick={handleClick}>
          <Typography sx={{ fontWeight : "bold", cursor : "pointer" }}>Metrics</Typography>
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

                        const isItemSelected = selectedMetrics.includes(metrics.label);
                        const labelId = `enhanced-table-checkbox-${i}`;

                        return (
                            <FormControlLabel control={<Checkbox color="secondary" onChange={(event) => onSelect(event, metrics)} checked={isItemSelected} inputProps={{  'aria-labelledby': labelId, }}  />} label={metrics.label} />
                        )
                    })}
                </FormGroup>
            </Box>
        </Popover>
      </div>
    );

}