import React, { Component } from 'react';

class Weapon extends Component {
  handleEdit = () => {
    console.log("edit");
  }

  handleDelete = () => {
    console.log("delete")
  }

  render() {
    const weapon = this.props.weapon

    return (
      <div className="weapon">
        <h3>{weapon.name}</h3>
        <h4>DPS: {weapon.dps}</h4>
        <p><strong>Damage:</strong> {weapon.damage}</p>
        <p><strong>RPM:</strong> {weapon.rpm}</p>
        <p><strong>Mag</strong> {weapon.mag}</p>
        <button onClick={this.handleEdit}>Edit</button>
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }

}

export default Weapon;
