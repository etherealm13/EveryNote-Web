import {
  MODAL_SHOW,
  MODAL_HIDE
} from '../actions/types';

const INITIAL_STATE = {
  modalShow: false,
  error: '',
  loading: false,
  editing: false,
  title: '',
  settings: null,
  data: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODAL_SHOW:
      return { ...state, modalShow: true, type: action.payload, data: action.data };
    case MODAL_HIDE:
      return { ...INITIAL_STATE, modalShow: false };
    default:
    return state;
  }
};
