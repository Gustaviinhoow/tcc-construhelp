import React from 'react';
import clsx from 'clsx';
import { Drawer, Button, Icon, List, Divider, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Drawer do Material UI

import '../css/Header.css';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        menu: false
    });

    const toggleDrawer = (anchor, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = anchor => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Button variant="contained" color="primary" className={classes.margin + " btn-addWorkspace"}>
                Add Workspace
            </Button>
            <List>
                {['Workspace 1', 'Workspace 2', 'Workspace 3'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Settings', 'Logout'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} className={text === "Logout" ? "logoutOption" : ""} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div className="headerApp">
            {['menu'].map(anchor => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                        <Icon className="iconMenu">menu</Icon>
                    </Button>
                    <Drawer anchor={"left"} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
            <h3 className="titleHeader">ConstruHelp</h3>
        </div>
    );
}
