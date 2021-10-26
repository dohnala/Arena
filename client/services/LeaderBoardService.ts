import { Observable  } from 'rxjs';

export type LeaderBoardPlayerState = {
    id: integer;
    rank: integer;
    nick: string;
    score: integer;    
}

export type LeaderBoardState = {
    top5: LeaderBoardPlayerState[];
    currentPlayer: LeaderBoardPlayerState;
}

const leaderBoardObservable = new Observable<LeaderBoardState>(subscriber => {
    subscriber.next({
        top5: [
            {id: 1, rank: 1, nick: "Nfiveee", score: 1500},
            {id: 2, rank: 2, nick: "Nullpointer", score: 800},
            {id: 3, rank: 3, nick: "Joe", score: 500},
            {id: 4, rank: 4, nick: "Restt", score: 50},
            {id: 5, rank: 5, nick: "Angmar", score: 0},
        ],
        currentPlayer: {id: 5, rank: 5, nick: "Angmar", score: 0},
    });

    setTimeout(() => {
        subscriber.next({
            top5: [
                {id: 1, rank: 1, nick: "Nfiveee", score: 1500},
                {id: 2, rank: 2, nick: "Nullpointer", score: 800},
                {id: 3, rank: 3, nick: "Joe", score: 500},
                {id: 4, rank: 4, nick: "Restt", score: 50},
                {id: 6, rank: 5, nick: "Next", score: 20},
            ],
            currentPlayer: {id: 5, rank: 8, nick: "Angmar", score: 0},
        });
      }, 5000);
  });

export const leaderBoardService = {
    getLeaderBoard: () => leaderBoardObservable,
};
