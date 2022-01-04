function Player (
      name = 'Set a name', 
      playerNo = null, 
      isHost = false, 
      isReady = false, 
      localId = null, //stored in local storage
      isBot = false,
      score = 0, 
) 
  {
    this.name = name;
    this.localId = localId;
    this.playerNo = playerNo;
    this.isHost = isHost;
    this.isBot = isBot;
    this.isReady = isReady;
    this.score = score;
  }

export default Player;



