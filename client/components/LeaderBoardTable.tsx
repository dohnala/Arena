import React from 'react'
import { Observable, Subscription } from 'rxjs';
import { LeaderBoard, LeaderBoardItem } from '../../server/Types';

export type Props = {
    size: number;
    leaderBoard: LeaderBoard;
    leaderboardObservable: Observable<LeaderBoard>;    
};

export class LeaderBoardTable extends React.Component<Props, LeaderBoard> {
    subscription: Subscription = Subscription.EMPTY;
    
    constructor(props: Props) {
        super(props);

        this.state = this.props.leaderBoard;
    }

    public isCurrentPlayer(player: LeaderBoardItem): boolean {
        return player.id === this.state.player.id;
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
        const leaderboardRows = this.state.top.map((player) =>
            <tr key={player.id} className={`${this.isCurrentPlayer(player) ? "current-player" : ""}`}>
                <td className="rank"><div className="text-start">{player.rank}</div></td>
                <td className="name"><div className="text-truncate">{player.name}</div></td>
                <td className="score"><div className="text-end">{player.score}</div></td>
            </tr>      
        );    

        const player = this.state.player;

        return ( 
        <div id="leader-board" className="overlay position-absolute top-0 end-0 card card-transparent mt-2 me-2 p-1">
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
                    {player.rank > this.props.size && 
                        <tr key={player.id} className="current-player border-top">
                            <td className="rank"><div className="text-start">{player.rank}</div></td>
                            <td className="name"><div className="text-truncate">{player.name}</div></td>
                            <td className="score"><div className="text-end">{player.score}</div></td>
                        </tr>     
                    }
                </tbody>
            </table>    
        </div>
      );
    }
  }
