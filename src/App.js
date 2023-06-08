import './App.css';
import { React, useState, useEffect } from 'react'
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {Box, Grid} from "@mui/material";
import { db } from "./utils/firebase";
import { onValue, ref } from "firebase/database";
import Image from "mui-image";
import MapPiece from "./components/MapPiece";

const theme = createTheme({
  palette: {
    primary: {
      main: '#080059',
    },
    secondary: {
      main: '#20b2aa',
    },
    info: {
      main: '#FFF7BC',
    },
    warning: {
      main: '#FFAD06',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
    ].join(','),
  },
});

function App() {
  const [currentPiece, setCurrentPiece] = useState(0);
  const [hydes, setHydes] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const getHydes = async () => {
      const query = ref(db, "/");

      return onValue(query, (snapshot) => {
        const data = snapshot.val();
        if (snapshot.exists()) {
          console.log(data)
          setHydes(data);
        }
      });
    }

    getHydes();
  }, [setHydes]);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize)
  })

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Grid container sx={{ backgroundColor: "#2167BD" }} alignItems="center">
          <Grid item xs={3} sx={{margin: 2}}>
            <Image
                src="/images/logo.png"
                alt="Worldwide Hydes Logo"
                fit="contain"
                sx={{maxHeight: 150}}>
            </Image>
          </Grid>
          <Grid item xs={9}>
          </Grid>
        </Grid>

          {
            screenWidth >= 800 ?
              <Grid container sx={{padding:0, width: 1445, margin: "auto"}} alignItems="center" display="flex">
                <Grid item xs={12} sx={{height: 900}}>
                  <Grid container sx={{padding:0}} alignItems="center" justifyContent="center">
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10} display="flex" alignItems="center" sx={{border: "solid black 2px"}}>
                      {
                        hydes.map((item, index) => (
                            <MapPiece id={index} data={item} key={index}>
                            </MapPiece>
                        ))
                      }
                    </Grid>
                    <Grid item xs={1}></Grid>
                  </Grid>
                </Grid>
              </Grid>
            :
              <Grid container sx={{padding:0}} alignItems="center">
                <Grid item xs={12} sx={{height: 1100}}>
                  <Grid container sx={{padding:0, width: "100%"}} alignItems="center">
                    <Grid item xs={1} sm={2} display="flex" justifyContent="right">
                      <Image
                          src="/images/left.png"
                          alt="Left"
                          fit="fill"
                          height="50px"
                          width="50px"
                          sx={{cursor: "pointer", position: "relative", right: -5}}
                          onClick={() => currentPiece > 0 ? setCurrentPiece(currentPiece - 1) : ""}
                      >
                      </Image>
                    </Grid>
                    <Grid item xs={10} sm={8} display="flex" alignItems="center" justifyContent="center">
                      <Box sx={{width: 300, border: "solid black 2px"}}>
                        <MapPiece id={currentPiece} data={hydes[currentPiece]} key={currentPiece}>
                        </MapPiece>
                      </Box>
                    </Grid>
                    <Grid item xs={1} sm={2} display="flex" justifyContent="left">
                      <Image
                          src="/images/right.png"
                          alt="Right"
                          fit="fill"
                          height="50px"
                          width="50px"
                          sx={{cursor: "pointer", position: "relative", left: -5}}
                          onClick={() => currentPiece < 3 ? setCurrentPiece(currentPiece + 1) : ""}
                      >
                      </Image>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
          }

        <Grid container sx={{pl:2, backgroundColor: "#2167BD"}} alignItems="center">
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <div className="buffer"></div>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
