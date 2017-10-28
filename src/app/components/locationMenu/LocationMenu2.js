'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Treebeard} from 'react-treebeard';
{/*
const data = {
    "toggled": true,
    "active" : true,
    "children": [
        {
            "toggled": true,
            "children": [
                {
                    "children": [
                        {
                            "id": "2727a57d-7c0f-42f2-9798-373c1a89e17d",
                            "name": "Jimmy George Indoor Stadium"
                        }
                    ],
                    "id": 21,
                    "name": "Vellayambalam"
                },
                {
                    "children": [
                        {
                            "id": "90fd6ea8-9ed4-4a2f-8ca5-f9c6f14acbaa",
                            "name": "Stones and Feathers"
                        }
                    ],
                    "id": 24,
                    "name": "kumarapuram"
                },
                {
                    "id": "f949f14c-45eb-450d-a305-ca46afc7cb0c",
                    "name": "Love All Badminton"
                },
                {
                    "children": [
                        {
                            "id": "eeec167d-3a36-4c3c-9bf2-95031b90e9ab",
                            "name": "Seasons"
                        },
                        {
                            "id": "522c1647-1443-4f9f-8d58-ee5532a39a20",
                            "name": "Condor Daffodils"
                        }
                    ],
                    "id": 31,
                    "name": "Kuruvankonam"
                },
                {
                    "id": "0f8f700b-d450-46bc-a00b-ce38af8bfe3c",
                    "name": "Sri Padmanabha Royal Indoor Courts"
                }
            ],
            "id": 1,
            "name": "Thiruvananthapuram"
        },
        {
            "toggled": true,
            "children": [
                {
                    "children": [
                        {
                            "id": "2d9f27e5-7565-4e28-9307-3bb3d9bfa6d3",
                            "name": "Tiger 5 , Manyata"
                        }
                    ],
                    "id": 20,
                    "name": "Hebbal"
                },
                {
                    "children": [
                        {
                            "id": "d1f2af6e-8930-497e-92ce-ea7d480a3a2e",
                            "name": "Kick On Sweat On"
                        },
                        {
                            "id": "2fe41fb7-1ade-4388-89a4-3ac7f6823f86",
                            "name": "Namma Shuttle"
                        },
                        {
                            "id": "87670aa0-75f6-4eb8-8f10-d422f0feef8c",
                            "name": "Sporthood HSR"
                        }
                    ],
                    "id": 6,
                    "name": "HSR Layout"
                },
                {
                    "children": [
                        {
                            "id": "a2d3c8eb-ae59-4c8a-830d-d85dbf7b3944",
                            "name": "Active Arena"
                        }
                    ],
                    "id": 5,
                    "name": "Marathahalli"
                },
                {
                    "children": [
                        {
                            "id": "dfa8a9b4-50e9-48f8-b74f-e1e24f8715aa",
                            "name": "Sportzbase"
                        }
                    ],
                    "id": 4,
                    "name": "Electronic City"
                },
                {
                    "children": [
                        {
                            "id": "091fc088-e05f-4bff-bc53-629c80767dbf",
                            "name": "Play Arena"
                        },
                        {
                            "id": "a2c9ba6e-7bc1-458c-839e-8e5de43ce826",
                            "name": "Sports Central"
                        },
                        {
                            "id": "ec2a8118-c8c8-468a-bcd7-e3ddb314a612",
                            "name": "Magnum Arena"
                        }
                    ],
                    "id": 3,
                    "name": "Sarjapur"
                },
                {
                    "children": [
                        {
                            "children": [],
                            "id": 9,
                            "name": "Football Alley"
                        }
                    ],
                    "id": 7,
                    "name": "BTM Layout"
                },
                {
                    "children": [
                        {
                            "id": "5d29f9de-f7b2-4c22-b7fb-bb4d577587c7",
                            "name": "Sporthood Whitefield"
                        }
                    ],
                    "id": 26,
                    "name": "Whitefield"
                },
                {
                    "children": [
                        {
                            "id": "8f479e78-2511-494b-aa80-c3ef8b0ad617",
                            "name": "Sporthood Koramangala"
                        }
                    ],
                    "id": 28,
                    "name": "Koramangala"
                }
            ],
            "id": 2,
            "name": "Bengaluru"
        }
    ],
    "name": "SportHood",
    "id": 0
};
*/}

class LocationMenu2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }
    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }
    render(){
        console.log("Nikhilesh - LocationMenu2.render");
        console.log(this.props.data);
        return (
            <Treebeard
                data={this.props.data}
                onToggle={this.onToggle}
            />
        );
    }
}

export default LocationMenu2;