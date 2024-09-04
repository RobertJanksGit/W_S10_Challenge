import React, { useReducer } from "react";
import { useCreateOrderMutation } from "../state/ordersApi";
import { useDispatch } from "react-redux";

const CHANGE_INPUT = "CHANGE_INPUT";
const CHANGE_CHECKED = "CHANGE_CHECKED";
const RESET_FORM = "RESET_FORM";

const initialFormState = {
  // suggested
  fullName: "",
  size: "",
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    }
    case CHANGE_CHECKED: {
      const { checked, name } = action.payload;
      return { ...state, [name]: checked };
    }
    case RESET_FORM:
      return initialFormState;
    default:
      return state;
  }
};

export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialFormState);
  const sliceDispatch = useDispatch();
  const [
    createOrder,
    { error: createOrderError, isLoading: createOrderLoading },
  ] = useCreateOrderMutation();

  const onChangeInput = ({ target: { name, value } }) => {
    dispatch({ type: CHANGE_INPUT, payload: { name, value } });
  };
  const onChangeCheckbox = ({ target: { name, checked } }) => {
    dispatch({ type: CHANGE_CHECKED, payload: { name, checked } });
  };
  const resetForm = () => {
    dispatch({ type: RESET_FORM });
  };
  const onSubmit = (evt) => {
    evt.preventDefault();
    const toppings = [];
    for (let i = 0; i < 6; i++) {
      if (state[i]) {
        toppings.push(i);
      }
    }
    const { fullName, size } = state;
    setTimeout(() => {});
    createOrder({ fullName, size, toppings })
      .unwrap()
      .then(() => {
        resetForm();
      })
      .catch((err) => {});
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Pizza Form</h2>
      {createOrderLoading && <div className="pending">Order in progress</div>}
      {createOrderError && (
        <div className="failure">{createOrderError.data.message}</div>
      )}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <br />
          <input
            onChange={onChangeInput}
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={state.fullName}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label>
          <br />
          <select
            onChange={onChangeInput}
            data-testid="sizeSelect"
            id="size"
            name="size"
            value={state.size}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input
            onChange={onChangeCheckbox}
            data-testid="checkPepperoni"
            name="1"
            type="checkbox"
            checked={state[1]}
          />
          Pepperoni
          <br />
        </label>
        <label>
          <input
            onChange={onChangeCheckbox}
            data-testid="checkGreenpeppers"
            name="2"
            type="checkbox"
            checked={state[2]}
          />
          Green Peppers
          <br />
        </label>
        <label>
          <input
            onChange={onChangeCheckbox}
            data-testid="checkPineapple"
            name="3"
            type="checkbox"
            checked={state[3]}
          />
          Pineapple
          <br />
        </label>
        <label>
          <input
            onChange={onChangeCheckbox}
            data-testid="checkMushrooms"
            name="4"
            type="checkbox"
            checked={state[4]}
          />
          Mushrooms
          <br />
        </label>
        <label>
          <input
            onChange={onChangeCheckbox}
            data-testid="checkHam"
            name="5"
            type="checkbox"
            checked={state[5]}
          />
          Ham
          <br />
        </label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  );
}
