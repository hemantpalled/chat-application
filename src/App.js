import './App.css';
import './static/common.css'
import {ChatProvider} from './contexts/ChatContext';
import ChatPage from './pages/ChatPage';


function App() {
  return (
    <ChatProvider>
    <div className="App"> 
      <header className="App-header">
        <ChatPage/>
      </header>
    </div>
    </ChatProvider>
  );
}



export default App;