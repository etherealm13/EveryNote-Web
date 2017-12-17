import {
  MODAL_SHOW,
  MODAL_HIDE
} from '../actions/types';

const INITIAL_STATE = {
    modal: {
      modalShow: false,
      data: null,
    }
};

export default (state = INITIAL_STATE.modal, action) => {
  switch (action.type) {
    case MODAL_SHOW:
      return { ...state, modalShow: true, type: action.payload, data: action.data, posts: action.posts };
    case MODAL_HIDE:
      return { ...state, modalShow: false };
    default:
    return { ...state };
  }
};
