import { isFSA } from 'flux-standard-action';
import createAsyncActions from '../src/createAsyncActions';

const type = 'TYPE';
const startType = 'TYPE_START';
const successType = 'TYPE_SUCCESS';
const errorType = 'TYPE_ERROR';

const defaultTypes = {
  start: 'START',
  success: 'SUCCESS',
  error: 'ERROR'
};

const changedTypes = {
  start: 'BEGIN',
  success: 'OK',
  error: 'FAILED'
};

const changedStartType = 'TYPE_BEGIN';
const changedSuccessType = 'TYPE_OK';
const changedErrorType = 'TYPE_FAILED';

describe('Default async action types', () => {
  beforeAll(() => {
    createAsyncActions.setTypes(defaultTypes);
  });

  test('returns a valid FSA', () => {
    const actionCreator = createAsyncActions(type);
    const foobar = { foo: 'bar' };
    const action = actionCreator(foobar);
    expect(isFSA(action)).toBeTruthy();
  });

  test('returns a type string', () => {
    const actionCreator = createAsyncActions(type);
    expect(String(actionCreator)).toEqual(type);
  });

  test('creates default async actions constants set', () => {
    const actionCreator = createAsyncActions(type);

    expect(String(actionCreator.start)).toEqual(startType);
    expect(String(actionCreator.success)).toEqual(successType);
    expect(String(actionCreator.error)).toEqual(errorType);
  });

  test('each async action returns a valid FSA', () => {
    const actionCreator = createAsyncActions(type);
    const foobar = { foo: 'bar' };

    const startAction = actionCreator.start(foobar);
    expect(isFSA(startAction)).toBeTruthy();

    const successAction = actionCreator.success(foobar);
    expect(isFSA(startAction)).toBeTruthy();

    const errorAction = actionCreator.error(foobar);
    expect(isFSA(startAction)).toBeTruthy();
  });

  test('should use actionOptions', () => {
    const actionCreator = createAsyncActions(type, {
      start: {
        payloadCreator: b => b
      },
      success: {
        payloadCreator: b => b
      },
      error: {
        payloadCreator: b => b
      }
    });

    const foobar = { foo: 'bar' };

    const startAction = actionCreator.start(foobar);
    expect(isFSA(startAction)).toBeTruthy();

    const successAction = actionCreator.success(foobar);
    expect(isFSA(startAction)).toBeTruthy();

    const errorAction = actionCreator.error(foobar);
    expect(isFSA(startAction)).toBeTruthy();
  });

  test('should use only provided actionOptions', () => {
    const actionCreator = createAsyncActions(type, {
      error: {
        payloadCreator: b => b
      }
    });

    const foobar = { foo: 'bar' };

    const startAction = actionCreator.start(foobar);
    expect(isFSA(startAction)).toBeTruthy();

    const successAction = actionCreator.success(foobar);
    expect(isFSA(startAction)).toBeTruthy();

    const errorAction = actionCreator.error(foobar);
    expect(isFSA(startAction)).toBeTruthy();
  });

  test('should not use a non-plain object as actionOptions', () => {
    class ActionOptions {
      constructor() {
        this.start = {
          payloadCreator: p => p + 1
        };
      }
    }

    const actionOptions = new ActionOptions();

    const actionCreator = createAsyncActions(type, actionOptions);

    const payload = 0;

    expect(actionCreator.start(payload)).toEqual({
      type: startType,
      payload: 0
    });
  });
});

describe('Default async action types', () => {
  beforeAll(() => {
    createAsyncActions.setTypes(changedTypes);
  });

  test('creates new async actions constants set', () => {
    const actionCreator = createAsyncActions(type);

    expect(String(actionCreator.begin)).toEqual(changedStartType);
    expect(String(actionCreator.ok)).toEqual(changedSuccessType);
    expect(String(actionCreator.failed)).toEqual(changedErrorType);
  });
});
