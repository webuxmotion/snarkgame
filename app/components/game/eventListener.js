import { ChooseAnswerEventListener } from "./pages/ChooseAnswer";
import { ChoosePlayersCountEventListener } from "./pages/ChoosePlayersCount";
import { ChoosePlayersNamesEventListener, ChoosePlayersNamesChangeEventListener } from "./pages/ChoosePlayersNames";
import { ShakeDiceEventListener } from "./pages/ShakeDice";

export const eventListener = (event) => {
    ChoosePlayersCountEventListener(event);
    ChoosePlayersNamesEventListener(event);
    ShakeDiceEventListener(event);
    ChooseAnswerEventListener(event);
}

export const changeEventListener = (event) => {
    ChoosePlayersNamesChangeEventListener(event);
}