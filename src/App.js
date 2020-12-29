import React, { useState } from "react";
import "./App.css";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core";
import PageMap from "./PageMap";
import PageHistory from "./PageHistory";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [casesType, setCasesType] = useState("cases");

  return (
    <div className="app">
      {/* Header */}
      <div className="app__header">
        <h1 className="title">COVID Tracker 🦠</h1>

        <AppBar position="static" color="default">
          <Tabs selectionFollowsFocus
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Real-time Heatmap" {...a11yProps(0)} />
            <Tab label="Activity Dashboard" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
      </div>

      {/* Body */}
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <PageMap casesType={casesType} setCasesType={setCasesType} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <PageHistory casesType={casesType} setCasesType={setCasesType} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

export default App;
