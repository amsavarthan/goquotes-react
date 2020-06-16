import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import {
  Card,
  CardContent,
  IconButton,
  LinearProgress,
  Tooltip,
  Snackbar,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SyncRoundedIcon from "@material-ui/icons/SyncRounded";
import GitHubIcon from "@material-ui/icons/GitHub";
import FileCopyRoundedIcon from "@material-ui/icons/FileCopyRounded";

function App() {
  const themes = [
    "#1abc9c",
    "#2ecc71",
    "#3498db",
    "#9b59b6",
    "#34495e",
    "#16a085",
    "#27ae60",
    "#2980b9",
    "#8e44ad",
    "#2c3e50",
    "#f1c40f",
    "#e67e22",
    "#e74c3c",
    "#f39c12",
    "#c0392b",
  ];

  const [quote, setQuote] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [backgroundColor, setBgColor] = useState(themes[0]);
  const [quoteWidth, setQuoteWidth] = useState(null);

  const changeTheme = () => {
    let index = Math.floor(Math.random() * themes.length);
    setBgColor(themes[index]);
  };

  const getQuote = () => {
    setLoading(true);
    Axios.get("https://goquotes-api.herokuapp.com/api/v1/random?count=1").then(
      (Response) => {
        changeTheme();
        setQuote(Response.data.quotes);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    getQuote();
    window.innerWidth >= 800 ? setQuoteWidth("40%") : setQuoteWidth("70%");
    window.addEventListener("resize", () => {
      window.innerWidth >= 800 ? setQuoteWidth("40%") : setQuoteWidth("70%");
    });
    return () => {
      window.addEventListener("resize", () => {
        window.innerWidth >= 800 ? setQuoteWidth("40%") : setQuoteWidth("70%");
      });
    };
  }, []);

  return (
    <div className="main" style={{ backgroundColor: backgroundColor }}>
      <Card
        style={{ maxWidth: quoteWidth, maxHeight: "70%", overflow: "auto" }}
      >
        {loading && <LinearProgress />}
        <CardContent>
          <div id="card-top">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              opacity="5%"
            >
              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
            </svg>
            {!loading && (
              <div>
                <CopyToClipboard
                  text={quote.map((e) => decodeURI(e.author))}
                  onCopy={() => setOpen(true)}
                >
                  <Tooltip title="Copy">
                    <IconButton
                      id="copy"
                      aria-label="refresh"
                      style={{ opacity: "30%" }}
                    >
                      <FileCopyRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </CopyToClipboard>

                <Tooltip title="Refresh">
                  <IconButton
                    aria-label="refresh"
                    style={{ opacity: "30%" }}
                    onClick={getQuote}
                  >
                    <SyncRoundedIcon />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </div>
          <p id="quote" width="100%">
            {quote === null
              ? "Please be patient everything needs some time."
              : quote.map((e) => `"${decodeURI(e.text)}"`)}
          </p>
          <p
            id="author"
            width="100%"
            style={{ fontSize: "calc(8px + 2vmin)", opacity: "50%" }}
          >
            -{" "}
            {quote === null ? (
              "Developer"
            ) : (
              <span style={{ fontStyle: "italic" }}>
                {quote.map((e) => `${decodeURI(e.author)}`)}
              </span>
            )}
          </p>
        </CardContent>
      </Card>
      <div style={{ marginTop: "10px" }}>
        <Tooltip title="GitHub">
          <IconButton
            aria-label="github"
            href="https://github.com/lvamsavarthan/goquotes-api"
          >
            <GitHubIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Live API Documentation">
          <IconButton aria-label="api" href="https://goquotes.docs.apiary.io/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              viewBox="0 0 24 24"
              opacity="50%"
              width="28px"
              height="28px"
            >
              <g>
                <rect fill="none" height="24" width="24" />
                <path d="M14,12l-2,2l-2-2l2-2L14,12z M12,6l2.12,2.12l2.5-2.5L12,1L7.38,5.62l2.5,2.5L12,6z M6,12l2.12-2.12l-2.5-2.5L1,12 l4.62,4.62l2.5-2.5L6,12z M18,12l-2.12,2.12l2.5,2.5L23,12l-4.62-4.62l-2.5,2.5L18,12z M12,18l-2.12-2.12l-2.5,2.5L12,23l4.62-4.62 l-2.5-2.5L12,18z" />
              </g>
            </svg>
          </IconButton>
        </Tooltip>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        message="Quote copied to clipboard!"
        autoHideDuration={1000}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

export default App;
