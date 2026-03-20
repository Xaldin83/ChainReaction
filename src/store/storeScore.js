import { create } from "zustand";
export const useScore = create((set) => ({
    scoreX: 0,
    scoreY: 0,
    increaseScoreX: () => set((state) => ({scoreX: state.scoreX +1})),
    increaseScoreY: () => set((state) => ({scoreY: state.scoreY +1})),
    resetScoreX: () => set(() => ({scoreX: 0})),
    resetScoreY: () => set(() => ({scoreY: 0}))
}))