import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function EntranceSelector({ data, value, onChange}){
    return (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          value={value === null ? data[-1] : value}
          onChange={(event, newValue) => onChange(newValue)}
          options={data}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} size="small" label="Filter By Entrance" />}
        />
      );
}