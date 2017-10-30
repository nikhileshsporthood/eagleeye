'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Treebeard} from 'react-treebeard';

class LocationMenu2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {}; //TODO - Fix it.
        this.onToggle = this.onToggle.bind(this);
    }
    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });//TODO - Fix it.
        this.props.reloadData(node.id);
    }
    render(){
        return (
            <Treebeard
                data={this.props.data}
                onToggle={this.onToggle}
            />
        );
    }
}

export default LocationMenu2;