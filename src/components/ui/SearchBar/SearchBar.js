
import { useState, useEffect, useCallback } from 'react'
import { TextField, InputAdornment, Popper, Paper,Autocomplete, Box, Typography, Divider, ClickAwayListener } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import SearchBarFilterMenu from './SearchBarFilterMenu';
import { useFetchWrapper } from '../../../services/useFetchWrapper';

import { useNavigate } from 'react-router-dom';

export default function SearchBar({ zuid, token }){

    const navigate = useNavigate()
    const { searchItems } = useFetchWrapper(zuid, token)
    const [isTyping, setIsTyping] = useState(false)
    const [anchor, setAnchorEl] = useState(null);
    const [data, setData] = useState(null)
    const [selectedData, setSelectedData] = useState("")

    const focus = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const id = "popperMenu";

    const onMenuClick = (url) => {
        navigate(url)
        handleClose()
    }

    const handleChange = async (event) => {
        setIsTyping(true)
        
        const searchItem = event.target.value
        setSelectedData(searchItem)

        if(searchItem === "") return

        const result = await searchItems(searchItem)
        const filteredResult = formatResult(result)
        setData(filteredResult)
        setIsTyping(false)
    }

    const formatResult = (result) => {

        return result.data.filter(value => value.web.path !== null).map(value => value.web)

    }

    const debounce = (func) => {
        let timer;
        return function (...args){
            const context = this;
            if(timer) clearTimeout(timer)
            timer = setTimeout(() => {
                timer = null
                func.apply(context, args)
            }, 500)
        }
    }

    const optimizeSearch = useCallback(debounce(handleChange), [])

    return (
        <>
            <Box>
                <ClickAwayListener onClickAway={handleClose}>
                    <span>
                        <TextField
                            sx={{
                                width : "600px"
                            }}
                            aria-describedby={id}
                            size="small"
                            placeholder="Search Pages"
                            onFocus={focus}
                            onChange={optimizeSearch}
                            inputProps={{
                                autoComplete: 'off'
                            }}
                            />
                        {selectedData !== "" && (
                            <Popper
                                id={id}
                                open={Boolean(anchor)}
                                placement="bottom-start"
                                anchorEl={anchor}
                                disablePortal>
                                <SearchBarFilterMenu data={data} isTyping={isTyping} onMenuClick={onMenuClick} />
                            </Popper>
                        )}
                        
                    </span>
                </ClickAwayListener>
            </Box>
        </>
    )

}