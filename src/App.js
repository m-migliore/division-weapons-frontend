import React, { Component } from 'react';
import './App.css';
import Weapon from './components/Weapon'
import AddWeapon from './components/AddWeapon'

class App extends Component {
  state = {
    weapons: [],
    addWeapon: false
  }

  componentDidMount() {
    this.refreshWeapons()
  }

  refreshWeapons = () => {
    fetch("http://localhost:4000/api/v1/weapons")
    .then(res => res.json())
    .then(data => {
      this.setState({
        weapons: data
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

  showAddForm = () => {
    this.setState({
      addWeapon: true
    })
  }

  hideAddForm = () => {
    this.setState({
      addWeapon: false
    })
  }

  render() {
    const favoriteWeapons = this.state.weapons.filter(weapon => weapon.favorite)
    const otherWeapons = this.state.weapons.filter(weapon => !weapon.favorite)

    return (
      <div className="App">
        {this.state.addWeapon ? <AddWeapon  addWeapon={this.addWeapon} hideAddForm={this.hideAddForm}/> : <button onClick={this.showAddForm}>Add Weapon</button>}
        <h2>Favorite Weapons</h2>
        {favoriteWeapons.length > 0 ? favoriteWeapons.map(weapon => <Weapon weapon={weapon}/>) : <p>No Favorite Weapons</p>}
        <h2>Weapons</h2>
        {otherWeapons.length > 0 ? otherWeapons.map(weapon => <Weapon weapon={weapon}/>) : <p>No Weapons</p>}

      </div>
    );
  }
}

export default App;
