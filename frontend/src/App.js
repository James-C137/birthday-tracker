import './App.css';

// Contexts
import { SidebarProvider } from './contexts/sidebar/sidebarContext';

// import Person from './components/Person/Person';
import Navbar from './components/Navbar/Navbar';
import PeopleList from './components/PeopleList/PeopleList';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="app">
      <SidebarProvider>
        <Navbar />
        <Sidebar />
        <PeopleList />
      </SidebarProvider>
    </div>
  );
}

export default App;
