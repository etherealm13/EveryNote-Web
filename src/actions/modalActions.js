import {
  MODAL_SHOW,
  MODAL_HIDE,
  LOADING,
  FORM_RESET
} from './types';

export function showModal(type,data) {
  return (dispatch) => {
    dispatch({
      type: MODAL_SHOW,
      payload: type,
      data: data
    });
  };
}

export function hideModal() {
  return (dispatch) => {
    dispatch({
      type: MODAL_HIDE
    });
  };
}
