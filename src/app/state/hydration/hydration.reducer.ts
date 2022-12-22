import { Action, ActionReducer } from "@ngrx/store";
import * as HydrationActions from "./hydration.actions";
import { RootState } from "./../app.state";
// здесь после двоеточия описывается тип action
// это guard для Action тип только для hydrateSuccess
function isHydrateSuccess(
  action: Action
): action is ReturnType<typeof HydrationActions.hydrateSuccess> {
  return action.type === HydrationActions.hydrateSuccess.type;
}
// Это хук между action -> meta reducer -> reducer
// принимает reducer и возвращает новый reducer
// like action -> meta reducer -> reducer
// на любой action возвращает state
export const hydrationMetaReducer = (
  reducer: ActionReducer<RootState>
): ActionReducer<RootState> => {
  // функция с параметрами (state, action) это и есть редьюсер
  // редьюсер должен вернуть новый state, поэтому тут сразу описание
  return (state, action) => {
    if (isHydrateSuccess(action)) {
      return action.state;
    } else {
      // тут action уже HydrationActions.hydrateFailure
      console.log('вызов action с action type=',action.type);
      // вызов функции редьюсера с action HydrationActions.hydrateFailure
      return reducer(state, action);
    }
  };
};