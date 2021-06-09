import '../css/index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';
import Home from './Home/Home';
import Header from './Header';
import AddNote from './AddNote';
import NoteDetails from './NoteDetails';


function App() {
  const { notesState } = useNotes();

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="app-container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/addNote" component={AddNote} />

            {notesState && notesState.data.map(note => 
              <Route path={`/notes/${note.id}`} key={note.id} component={() => 
                <NoteDetails note={note} />
              } />
            )}
          </Switch>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
