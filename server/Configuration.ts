import { leaderBoardSize } from "./Constants";
import { WorldSettings } from "./World";

export const worldSettings: WorldSettings = {
    bounds: {
        position: {x: -1024, y: -1024},
        width: 2048,
        height: 2048
    },
    collectibleCount: 20,
    collectiblePoints: 10,
    collectibleSpawnOffset: 50,
    leaderBoardSize: leaderBoardSize, 
}
