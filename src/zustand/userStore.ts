import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
    name: string;
    changeName: (newName: string) => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            name: 'Guest',
            changeName: (newName) => {
                set({ name: newName });
            },
        }),
        {
            name: 'user-storage',
        }
    )
);
