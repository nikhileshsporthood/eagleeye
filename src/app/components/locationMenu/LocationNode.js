import React              from 'react';

class LocationNode extends React.Component {
    render() {
    	console.log("Nik - LocationNode.render");
    	console.log(this.props);
        return (
            <div className={this.props.selected?"selected":"not"} key={this.props.key} onClick={this.props.onClick}>
                <label>{this.props.name}</label>
            </div>
        );
    }
}

export default LocationNode;