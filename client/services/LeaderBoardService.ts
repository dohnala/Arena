import { Observable  } from 'rxjs';

export type LeaderBoardPlayerState = {
    id: integer;
    rank: integer;
    name: string;
    score: integer;    
}

export type LeaderBoardState = {
    top5: LeaderBoardPlayerState[];
    currentPlayer: LeaderBoardPlayerState;
}

const leaderBoardObservable = new Observable<LeaderBoardState>(subscriber => {
    subscriber.next({
        top5: [
            {id: 1, rank: 1, name: "Nfiveee", score: 1500},
            {id: 2, rank: 2, name: "Nullpointer", score: 800},
            {id: 3, rank: 3, name: "Joe", score: 500},
            {id: 4, rank: 4, name: "Restt", score: 50},
            {id: 5, rank: 5, name: "Angmar", score: 0},
        ],
        currentPlayer: {id: 5, rank: 5, name: "Angmar", score: 0},
    });

    setTimeout(() => {
        subscriber.next({
            top5: [
                {id: 1, rank: 1, name: "Nfiveee", score: 1500},
                {id: 2, rank: 2, name: "Nullpointer", score: 800},
                {id: 3, rank: 3, name: "Joe", score: 500},
                {id: 4, rank: 4, name: "Restt", score: 50},
                {id: 6, rank: 5, name: "Next", score: 20},
            ],
            currentPlayer: {id: 5, rank: 8, name: "Angmar", score: 0},
        });
      }, 5000);
  });

export const leaderBoardService = {
    getLeaderBoard: () => leaderBoardObservable,
};
