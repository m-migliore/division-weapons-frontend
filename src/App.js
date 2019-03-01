import React, { Component } from 'react';
import './App.css';
import Weapon from './components/Weapon'
import AddWeapon from './components/AddWeapon'
import EditWeapon from './components/EditWeapon'

class App extends Component {
  state = {
    weapons: [],
    weaponId: "",
    addWeapon: false,
    editWeapon: false,
  }

  componentDidMount() {
    this.refreshWeapons()
  }

  refreshWeapons = () => {
    fetch("http://localhost:4000/api/v1/weapons")
    .then(res => res.json())
    .then(data => {
      this.setState({
        weapons: data,
        addWeapon: false,
        editWeapon: false
      })
    })
  }

  addWeapon = weapon => {
    fetch("http://localhost:4000/api/v1/weapons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(weapon)
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        weapons: [...this.state.weapons, data],
        addWeapon: false
      })
    })
  }

  editWeapon = (weaponId,weapon) => {
    fetch(`http://localhost:4000/api/v1/weapons/${weaponId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(weapon)
    })
    .then(res => res.json())
    .then(data => {
      let updatedWeapons = [...this.state.weapons]
      const targetWeapon = updatedWeapons.find(weapon => weapon.id === data.id)
      const updatedWeaponIndex = updatedWeapons.indexOf(targetWeapon)
      updatedWeapons[updatedWeaponIndex] = data
      this.setState({
        weapons: updatedWeapons,
        editWeapon: false
      })
    })
  }

  toggleAddForm = () => {
    this.setState({
      addWeapon: !this.state.addWeapon
    })
  }

  showEditForm = weaponId => {
    this.setState({
      weaponId,
      editWeapon: true
    })
  }

  hideEditForm = () => {
    this.setState({
      editWeapon: false
    })
  }

  render() {
    const favoriteWeapons = this.state.weapons.filter(weapon => weapon.favorite)
    const otherWeapons = this.state.weapons.filter(weapon => !weapon.favorite)

    return (
      <div className="App">
        {/* {this.state.addWeapon ? <AddWeapon addWeapon={this.addWeapon} hideAddForm={this.hideAddForm}/> : <button onClick={this.showAddForm}>Add Weapon</button>} */}
        {this.state.addWeapon ? <AddWeapon addWeapon={this.addWeapon} toggleAddForm={this.toggleAddForm}/> : <button onClick={this.toggleAddForm}>Add Weapon</button>}
        {this.state.editWeapon ?
          <EditWeapon
            editWeapon={this.editWeapon}
            hideEditForm={this.hideEditForm}
            weaponId={this.state.weaponId}
          />
          :
          null
        }
        <h2>Favorite Weapons</h2>
        {favoriteWeapons.length > 0 ?
          favoriteWeapons.map(weapon => {
            return <Weapon
                    key={weapon.id}
                    weapon={weapon}
                    showEditForm={this.showEditForm}
                    editWeapon={this.editWeapon}
                   />
          })
          :
          <p>No Favorite Weapons</p>
        }
        <h2>Weapons</h2>
        {otherWeapons.length > 0 ?
          otherWeapons.map(weapon => {
            return <Weapon
                    key={weapon.id}
                    weapon={weapon}
                    showEditForm={this.showEditForm}
                    editWeapon={this.editWeapon}
                   />
          })
          :
          <p>No Weapons</p>
        }

      </div>
    );
  }
}

export default App;
