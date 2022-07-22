
import { useState, useEffect } from 'react'
import { TextField, InputAdornment, Popper, Paper,Autocomplete, Box, Typography, Divider } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import SearchBarFilterMenu from './SearchBarFilterMenu';
import { useFetchWrapper } from '../../../services/useFetchWrapper';

export default function SearchBar({ zuid, token }){

    const { searchItems } = useFetchWrapper(zuid, token)
    const [search, setSearch] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [anchor, setAnchorEl] = useState(null);
    const [data, setData] = useState(null)
    const focus = event => {
        setAnchorEl(event.currentTarget);
    };
    const blur = () => {
        setAnchorEl(null);
    };
    const id = "popperMenu";

    useEffect(() => {
        setIsTyping(true)
        if(search === '') {
            setData(null)
            setIsTyping(false)
            return;
        }

        const delayDebounce = setTimeout(async () => {
            
            const result = await searchItems(search)
            setData(result.data)
            setIsTyping(false)
        }, 2000)

        
        return () => clearTimeout(delayDebounce)

    }, [search])

    const onChange = async (event) => {
        
        const filterItem = event.target.value
        console.log(filterItem)
        
        if(filterItem === '') return setData(null)

        const result = await searchItems(filterItem)
        console.log(result.data)
        setData(result.data)

    }

    const onMenuClick = (data) => {
        console.log(data)
    }

    return (
        <>
            <Box>
                <TextField
                    sx={{
                        width : "600px"
                    }}
                    aria-describedby={id}
                    size="small"
                    placeholder="Search Pages"
                    onFocus={focus}
                    onBlur={blur}
                    onChange={(event) => setSearch(event.target.value)}
                    inputProps={{
                        autoComplete: 'off'
                     }}
                     />
                <Popper
                    id={id}
                    open={Boolean(anchor)}
                    placement="bottom-start"
                    anchorEl={anchor}
                    disablePortal>
                    <SearchBarFilterMenu data={data} isTyping={isTyping} onMenuClick={onMenuClick} />
                </Popper>
            </Box>
        </>
    )

}