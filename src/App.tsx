import MailingListForm from './MailingListForm';

function App() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#f5f5f5',
      padding: '0'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        height: '100vh',
        backgroundColor: 'white'
      }}>
        <MailingListForm />
      </div>
    </div>
  );
}

export default App;
