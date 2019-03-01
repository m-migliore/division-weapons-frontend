import React, { Component } from 'react';

class EditWeapon extends Component {
  state = {
    name: "",
    damage: "",
    rpm: "",
    mag: "",
    level: "",
    favorite: false
  }

  componentDidMount() {
    fetch(`http://localhost:4000/api/v1/weapons/${this.props.weaponId}`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        name: data.name,
        damage: data.damage,
        rpm: data.rpm,
        mag: data.mag,
        level: data.level,
        favorite: data.favorite
      })
    })

  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.editWeapon(this.props.weaponId, this.state)
  }

  handleChange = e => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value

    this.setState({
      [e.target.name]: value
    })
  }

  render() {
    return (
      <div className="add-weapon">
        <button onClick={this.props.hideEditForm}>X</button>
        <h1>Edit Weapon</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" onChange={this.handleChange} name="name" value={this.state.name}/>
          </div>
          <div className="form-group">
            <label>Damage</label>
            <input type="number" onChange={this.handleChange} name="damage" value={this.state.damage}/>
          </div>
          <div className="form-group">
            <label>RPM</label>
            <input type="number" onChange={this.handleChange} name="rpm" value={this.state.rpm}/>
          </div>
          <div className="form-group">
            <label>Mag</label>
            <input type="number" onChange={this.handleChange} name="mag" value={this.state.mag}/>
          </div>
          <div className="form-group">
            <label>Level</label>
            <input type="number" onChange={this.handleChange} name="level" value={this.state.level}/>
          </div>
          <div className="form-group">
            <label>Favorite</label>
            <input type="checkbox" onChange={this.handleChange} name="favorite" checked={this.state.favorite}/>
          </div>
          <button type="submit">Edit Weapon</button>
        </form>
      </div>
    );
  }

}

export default EditWeapon;
