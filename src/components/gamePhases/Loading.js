import './phases.css';

function Loading() {
// time out, if it eleapses, say the game may have ended 
// or the link ay have been broken, link back to the homepage

   return (
      <div className="loading phase-container" style={{opacity : 0.1 }}>
         <h3>Loading</h3>
      </div>
      );
    }

export default Loading;