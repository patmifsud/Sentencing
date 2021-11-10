

import {
   Logo,SpeechBubble,PlayerPannel,Heading
 } from "./uiIndex";

function ComponentLibrary() {

  return (
    <>
      <header>
         <Logo />
         <SpeechBubble/>
      </header>

      <aside>
         <PlayerPannel />
      </aside>

      <main>
         <section class="start">
            <Heading text="hey" />
        </section>
        <section class="right">
          
        </section>
      </main>
      
    </>
  );
}

export default ComponentLibrary;
