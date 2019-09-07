import React from 'react'
import { connect } from 'react-redux'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { PAGES } from '../config'

const SideBar = (props) => (
    <Drawer
        open={props.openSideBar}
        onClose={e => props.closeSideBar()}>
        <List>
            {Object.keys(PAGES).map((k, index) => (
                <div className={index===0?"display-none":""}>
                    <ListItem button key={index+1} onClick={e => props.changePage(k)} style={{padding: '16px 80px 16px 50px'}}>
                        <ListItemText primary={k} />
                    </ListItem>
                </div>
            ))}
        </List>
    </Drawer>
)

const mapStateToProps = (state) => ({
    openSideBar: state.general.openSideBar
})

const mapDispatchToProps = (dispatch) => ({
    closeSideBar: () => dispatch({ type: 'ON_CLOSE_SIDEBAR' }),
    changePage: (page) => dispatch({ type: 'ON_CHANGE_PAGE', page: page })
})

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)