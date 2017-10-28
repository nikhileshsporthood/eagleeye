import React              from 'react';
import InfinityMenu from "react-infinity-menu";
import "react-infinity-menu/src/infinity-menu.css";
import LocationNode 	  from './LocationNode';

var location_tree = [
	{
		name: "menu1", /*require*/
		id: 0, /*require*/
		isOpen: true, /*require*/
		selected: true,
		customComponent: LocationNode,
		children: [
			{
				name: "submenu1",
				id: 1,
				isOpen: false,
				selected: false,
				customComponent: LocationNode,
				children: [
					{
						name: "item1-1",
						selected: false,
						customComponent: LocationNode,
						id: 2
					},
					{
						name: "item1-2",
						selected: false,
						customComponent: LocationNode,
						id: 3
					}
				]
			},
			{
				name: "submenu2",
				id: 4,
				isOpen: false,
				selected: false,
				customComponent: LocationNode,
				children: [
					{
						name: "item2-1",
						selected: false,
						customComponent: LocationNode,
						id: 5
					}
				]
			}
		]
	},
	{
		name: "menu2", /*require*/
		id: 6, /*require*/
		isOpen: false, /*require*/
		selected: false,
		customComponent: LocationNode,
		children: [
			{
				name: "item3-1",
				selected: false,
				customComponent: LocationNode,
				id: 7
			}
		]
	}
];

class LocationMenu extends React.Component {

	  constructor (props) {
	  	super(props);
	    this.state = {
	      tree: location_tree,
	      selected: 0
	    };
	    this.onNodeMouseClick = this.onNodeMouseClick.bind(this);
	    this.onLeafMouseClick = this.onLeafMouseClick.bind(this);
	    this.setSelected = this.setSelected.bind(this);
	  }	

	onNodeMouseClick(event, tree, node, level, keyPath) {

		console.log( tree ); // Prints the leaf id
		console.log( node); // Prints the leaf id
		console.log( keyPath);
		// console.log( node.name ); // Prints the leaf name
		this.setSelected(tree,null,node.id);	
		this.setState({
			tree: tree
		});	
	}

	onLeafMouseClick(event, leaf) {
		var treeCopy = this.state.tree.slice()
		this.setSelected(treeCopy,null,leaf.id);
		this.setState({
			tree: treeCopy
		});		
		console.log( leaf.id ); // Prints the leaf id
		console.log( leaf.name ); // Prints the leaf name
	}

	onLeafMouseUp(event, leaf) {
		console.log( leaf.id ); // Prints the leaf id
		console.log( leaf.name ); // Prints the leaf name
	}

	onLeafMouseDown(event, leaf) {
		console.log( leaf.id ); // Prints the leaf id
		console.log( leaf.name ); // Prints the leaf name
	}

	setSelected(tree,curr,selectedId){
		console.log(tree);
		if(curr==null){
			curr = tree[0];//first node.
		}
		console.log(curr);
		curr.selected = (curr.id == selectedId);
		console.log("Id " + curr.id + " Selected: " + curr.selected);
		if (!curr.children) {
			return;
		}else{//Note
			for (var i = curr.children.length - 1; i >= 0; i--) {
				this.setSelected(tree,curr.children[i],selectedId);
			};
		}
		return tree;
	}

	render() {
		return (
			<InfinityMenu
				tree={location_tree}
				onNodeMouseClick={this.onNodeMouseClick}
				onLeafMouseClick={this.onLeafMouseClick}/*optional*/
				/*onLeafMouseDown={this.onLeafMouseDown} optional*/
				/*onLeafMouseUp={this.onLeafMouseUp} optional*/
				maxLeaves={20}/*optional*/
			/>
		);
	}
}
export default LocationMenu;