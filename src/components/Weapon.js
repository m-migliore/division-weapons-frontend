import React, { Component } from 'react';

class Weapon extends Component {
  handleEdit = e => {
    console.log("edit");
    console.log(e.target.dataset.id)
    this.props.showEditForm(e.target.dataset.id)
  }

  handleDelete = e => {
    console.log("delete")
    this.props.deleteWeapon(e.target.dataset.id)
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
        <button onClick={this.handleEdit} data-id={weapon.id}>Edit</button>
        <button onClick={this.handleDelete} data-id={weapon.id}>Delete</button>
      </div>
    );
  }

}

export default Weapon;
