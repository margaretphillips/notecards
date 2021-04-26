import React, { Component } from 'react';
import axios from 'axios'

//containers
import Header from './containers/layouts/Header/Header'
import Content from './containers/layouts/Content/Content'

//supporting data
import Notes from './server/data/notes.json'
import Categories from './server/data/categories.json'
import Priorities from './server/data/priorities.json'
import Themes from './server/data/themes.json'

class App extends Component {

  state = {
    action: 'show',
    editname: false,
    noteconfig: 'view',
    title: 'NoteCards',
    note: [],
    notes: Notes,
    categories: Categories,
    priorities: Priorities,
    themes: Themes,
    category: 1
  }

  componentDidMount() {
    this.setState({ notes: this.state.notes.sort((a, b) => a.priority > b.priority ? 1 : -1) })
  }
  setCategory = (event) => {
    this.setState({ category: event.target.options.selectedIndex + 1 });
  }
  toggleNameHandler = () => {
    const editname = !this.state.editname
    this.setState({ editname: editname });
  }
  editNameHandler = (event) => {
    this.setState({ title: event.target.value });
  }
  noteDeleteHandler = (id) => {
    const notes = this.state.notes.filter((f) => f.id !== parseInt(id))
    const url = 'http://localhost:3001'

    axios.delete(`${url}/notes/${id}`).then(() => {
      this.setState({ notes: notes, noteconfig: 'view' });
    })

  }
  noteEditHandler = (id) => {
    let note = this.state.notes.filter((f) => f.id === parseInt(id))[0]
    this.setState({ note: note });
  }

  setnoteconfig = (event) => {

    let id = event.target.id
    let name = event.target.attributes['name'].nodeValue

    switch (name) {
      case "trash":
        this.noteDeleteHandler(id)
        break;
      case "edit":
        this.noteEditHandler(id)
        this.setState({ noteconfig: "edit" });
        break;
      case "update":
        this.setState({ noteconfig: "view" });
        break;
      case "view":
        this.setState({ noteconfig: "view" });
        break;
      case "expand":
        this.noteEditHandler(id)
        this.setState({ noteconfig: "expand" });
        break;
      case "add":
        this.setState({ noteconfig: "add" });
        break;
      case "edit_title":
        this.toggleNameHandler()
        break;
      case "save_title":
        this.toggleNameHandler()
        break;
      default:
        console.log('No Action', name)
    }

  }

  render() {
    return (
      <div className="container-fluid bg-dark p-3 m-0">
        <Header
          clicked={this.setnoteconfig}
          changed={this.setCategory}
          //changed={this.editNameHandler}
          editname={this.state.editname}
          title={this.state.title}
          categories={this.state.categories} />
        <Content clicked={this.setnoteconfig}
          changed={this.setnoteconfig}
          noteconfig={this.state.noteconfig}
          notes={this.state.notes}
          note={this.state.note}
          categories={this.state.categories}
          priorities={this.state.priorities}
          themes={this.state.themes}
          category={this.state.category}
        />
      </div>
    );
  }
}

export default App;
