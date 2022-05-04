export default function reducer(state, { type, payload }) {
  switch (type) {
    case "color":
      return { ...state, ...payload };
    default:
      return state;
  }
}
