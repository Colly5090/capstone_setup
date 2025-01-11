import { create } from "zustand";

const useScroll = create((set) => ({
  refs: {},
  setRef: (key, ref) =>
    set((state) => ({
      refs: { ...state.refs, [key]: ref },
    })),
  scrollTo: (key) => {
    set((state) => {
      const ref = state.refs[key];
      if (ref?.current) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
      return state;
    });
  },
}));

export default useScroll;
