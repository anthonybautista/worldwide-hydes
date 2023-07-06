import { React, useState } from 'react'
import {Box, Dialog, DialogContent, styled, Typography} from '@mui/material';
import '../App.css';
import Image from "mui-image";
import CharacterDialogTitle from "./CharacterDialog";

export default function MapPiece(props) {
    const [open, setOpen] = useState(false);
    const [tokenId, setTokenId] = useState(false);
    const [hydeInfo, setHydeInfo] = useState(false);
    const id = props.id;
    const hydes = props.data;

    const CharacterDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(0),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
        '& .MuiPaper-root': {
            backgroundColor: "transparent",
            backgroundImage: `${getFolder()}`,
            backgroundRepeat: "no-repeat",
            boxShadow: 'none',
            width: 280,
            height: 407,
        }
    }));

    const handleClickOpen = (id, hyde) => {
        setTokenId(id);
        setHydeInfo(hyde);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getPins = () => {
        if (hydes) {
            //https://stackoverflow.com/questions/26795643/how-to-convert-object-containing-objects-into-array-of-objects
            const arrayOfObj = Object.entries(hydes["hydes"]).map((e) => ( { [e[0]]: e[1] } ));
            //console.log(parseInt(Object.keys(arrayOfObj[0])))
            //console.log(Object.values(arrayOfObj[0])[0].location)
            return arrayOfObj;
        } else {
            return []
        }
    }

    const getName = () => {
        console.log(hydeInfo)
        if (hydeInfo) {
            return isHyde(hydeInfo.location.timezone) ? hydeInfo["hydeName"] : hydeInfo["humanName"];
        }
        return ""
    }

    const isHyde = (modifier) => {
        const currentHour = ((Date.now() / 1000) % (24 * 60 * 60)) / 3600;
        const modifiedHour = currentHour + modifier;
        return (modifiedHour >= 0 && modifiedHour < 6) || (modifiedHour >= 24 && modifiedHour < 30);
    }

    const getFolder = () => {
        if (hydeInfo) {
            if (isHyde(hydeInfo.location.timezone)) {
                return 'url("images/hyde-folder.png")';
            }
        }
        return 'url("images/human-folder.png")';
    }

    return (
        <Box>
            <Box sx={{position: "absolute"}}>
                {
                    getPins().map((item, index) => (
                        <Box key={index}>
                            <Image
                                src={isHyde(Object.values(item)[0].location.timezone) ? `images/blue-pin.png` : `images/red-pin.png`}
                                alt={`Red Pin`}
                                fit="contain"
                                height="25px"
                                width="25px"
                                sx={{zIndex: 1, left: Object.values(item)[0].location.x, top: Object.values(item)[0].location.y}}
                                onClick={() => { handleClickOpen(parseInt(Object.keys(item)), Object.values(item)[0]) }}
                            >
                            </Image>
                        </Box>
                    ))
                }
            </Box>
            <Box sx={{position: "relative"}}>
                <Image
                    src={`images/map/${id}.png`}
                    alt={`Map Piece ${id}`}
                    fit="contain"
                    height="900px"
                    width="300px"
                >
                </Image>
            </Box>
            <CharacterDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <CharacterDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {`Token ID # ${tokenId}`}
                </CharacterDialogTitle>
                <DialogContent>
                    <Image
                        src={`https://api.worldwidehydes.com:5000/api/image/${tokenId}`}
                        alt={`Hyde ${tokenId}`}
                        fit="contain"
                        height="155px"
                        width="155px"
                        sx={{marginTop: 1.2, marginLeft: 6.5}}
                    >
                    </Image>
                    <Typography gutterBottom sx={{marginTop: 3, marginLeft: 11.5}}>
                        {getName()}
                    </Typography>
                    <Typography gutterBottom sx={{marginTop: -0.8, marginLeft: 14}}>
                        {`${hydeInfo ? hydeInfo.location.name : ""}`}
                    </Typography>
                    <Typography gutterBottom sx={{marginTop: -0.7, marginLeft: 15.5}}>
                        {`${hydeInfo ? hydeInfo.owner : ""}`}
                    </Typography>
                </DialogContent>
            </CharacterDialog>
        </Box>
    )
}