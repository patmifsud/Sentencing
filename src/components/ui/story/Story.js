import React from "react"


function Story({data}) {

  // story = text and playerNo

  return (
    <div className="write-story">
        {(data && data.story) && data.story.map((sentence, index) =>  
          <span key={`s${index}`} > {sentence.text} </span>
        )}
    </div>
  );
}

export default Story;