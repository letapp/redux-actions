import createAction from './createAction';
import isUndefined from './utils/isUndefined';
import isPlainObject from './utils/isPlainObject';

let asyncActionTypes = ['start', 'success', 'error'];

export default function createAsyncActions(actionType, actionOptions) {
  if (actionType.includes('/')) {
    const actionIndex = actionType.lastIndexOf('/') + 1;
    const moduleName = actionType.substring(0, actionIndex);
    const actionName = actionType.substring(actionIndex, actionType.length);
    actionType = [moduleName, actionName.toUpperCase()].join('');
  }

  const action = createAction(actionType);

  asyncActionTypes.forEach(type => {
    const asyncType = [actionType, type.toUpperCase()].join('_');
    const actionTypeLower = type.toLowerCase();

    let payloadCreator;
    let metaCreator;

    if (
      !isUndefined(actionOptions) &&
      isPlainObject(actionOptions) &&
      isPlainObject(actionOptions[type])
    ) {
      const options = actionOptions[type];

      payloadCreator = options.payloadCreator;
      metaCreator = options.metaCreator;
    }

    action[actionTypeLower] = createAction(
      asyncType,
      payloadCreator,
      metaCreator
    );
  });

  return action;
}

createAsyncActions.asyncActionTypes = asyncActionTypes;

createAsyncActions.setTypes = ({ start, success, error }) => {
  asyncActionTypes = [start, success, error];
  createAsyncActions.asyncActionTypes = asyncActionTypes;
};
