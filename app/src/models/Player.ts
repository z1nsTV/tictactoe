class Player {
  constructor(
    public name: string,
    public score: number,
    public color: string
  ) {}

  public static createPlayers(names: string[], colors: string[]): Player[] {
    let players: Player[] = [];
    for (let i = 0; i < names.length; i++) {
      players.push(new Player(names[i], 0, colors[i]));
    }
    return players;
  }
}

export { Player };
