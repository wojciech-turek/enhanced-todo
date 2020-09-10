import React from "react";
import { connect } from "react-redux";
import { Fade, ThemeProvider, Button, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import WorkIcon from "@material-ui/icons/Work";
import BlurOnIcon from "@material-ui/icons/BlurOn";
import ToDoTasks from "./ToDoTasks/ToDoTasks";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import AddTask from "../../components/AddTask/AddTask";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => {
  const drawerWidth = 240;
  return {
    root: {
      display: "flex",
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    toolbar: theme.mixins.toolbar,
    toolbarPos: {
      display: "flex",
      justifyContent: "space-between",
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      width: "100%",
      backgroundColor: theme.palette.background.default,
    },
    paper: {
      position: "absolute",
      minWidth: 300,
      outline: 0,
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  };
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
function ToDoPage() {
  const [newTaskOpen, setNewTaskOpen] = React.useState(false);
  const [newCategoryOpen, setNewCategoryOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#087F8C",
      },
      secondary: {
        main: "#E5625E",
      },
    },
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleTaskOpen = () => {
    setNewTaskOpen(!newTaskOpen);
  };

  const handleNewCatOpen = () => {
    setNewCategoryOpen(!newCategoryOpen);
  };

  let categories = ["All Tasks", "Work", "Home", "Other"];

  const drawer = (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {categories.map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index === 0 ? <FormatListBulletedIcon /> : null}
              {index === 1 ? <WorkIcon /> : null}
              {index === 2 ? <HomeWorkIcon /> : null}
              {index === 3 ? <BlurOnIcon /> : null}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>
          <Button color="primary" variant="contained" onClick={handleTaskOpen}>
            Add new task
          </Button>
          <Modal
            open={newTaskOpen}
            onClose={handleTaskOpen}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Fade in={newTaskOpen}>
              <div className={classes.paper} style={modalStyle}>
                <AddTask categories={categories} cancel={handleTaskOpen} />
              </div>
            </Fade>
          </Modal>
        </ListItem>
        <ListItem>
          <Button
            color="primary"
            variant="contained"
            onClick={handleNewCatOpen}
          >
            Add new category
          </Button>
          <Modal
            open={newCategoryOpen}
            onClose={handleNewCatOpen}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Fade in={newCategoryOpen}>
              <div className={classes.paper} style={modalStyle}>
                <Alert severity="error">Currently not available</Alert>
              </div>
            </Fade>
          </Modal>
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    <Fade in={true} timeout={400}>
      <div className={classes.root}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolbarPos}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                ToDo App
              </Typography>
              <Button color="secondary" variant="contained">
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
              <Drawer
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true,
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <ToDoTasks />
          </main>
        </ThemeProvider>
      </div>
    </Fade>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoPage);
