import React from 'react'
import { Observable, Subscription } from 'rxjs';
import { LeaderBoardPlayerState, LeaderBoardState } from '../services/LeaderBoardService';

export type Props = {
    leaderboardObservable: Observable<LeaderBoardState>;    
};

export class LeaderBoard extends React.Component<Props, LeaderBoardState> {
    subscription: Subscription = Subscription.EMPTY;
    
    constructor(props: Props) {
        super(props);
    }

    state =  {
        top5: [{id: 1, rank: 1, nick: "", score: 0}],
        currentPlayer: {id: 1, rank: 1, nick: "", score: 0},
    };

    public isCurrentPlayer(player: LeaderBoardPlayerState): boolean {
        return player.id === this.state.currentPlayer.id;
    }

    componentDidMount() {
        this.subscription = this.props.leaderboardObservable.subscribe(state => {
            this.setState(state);
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        const leaderboardRows = this.state.top5.map((player) =>
            <tr key={player.id} className={`${this.isCurrentPlayer(player) ? "current-player" : ""}`}>
                <td className="rank"><div className="text-start">{player.rank}</div></td>
                <td className="name"><div className="text-truncate">{player.nick}</div></td>
                <td className="score"><div className="text-end">{player.score}</div></td>
            </tr>      
        );    

        const currentPlayer = this.state.currentPlayer;

        return ( 
        <div id="leader-board" className="position-absolute top-0 end-0 card mt-2 me-2 p-1">
            <table className="table table-borderless table-sm mb-0" cellSpacing="0">
                <thead>
                    <tr>
                        <th className="rank"><div className="text-start">#</div></th>
                        <th className="name"><div className="text-truncate">Name</div></th>
                        <th className="score"><div className="text-end">Score</div></th>
                    </tr>    
                </thead>
                <tbody>
                    {leaderboardRows}
                    {currentPlayer.rank > 5 && 
                        <tr key={currentPlayer.id} className="current-player border-top">
                            <td className="rank"><div className="text-start">{currentPlayer.rank}</div></td>
                            <td className="name"><div className="text-truncate">{currentPlayer.nick}</div></td>
                            <td className="score"><div className="text-end">{currentPlayer.score}</div></td>
                        </tr>     
                    }
                </tbody>
            </table>    
        </div>
      );
    }
  }
