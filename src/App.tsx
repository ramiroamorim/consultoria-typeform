import MailingListForm from './MailingListForm';


function App() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      
      
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        height: '100vh',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <MailingListForm />
      </div>
    </div>
  );
}

export default App;
