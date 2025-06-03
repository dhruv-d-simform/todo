import { useSelector, useDispatch } from 'react-redux'; // eslint-disable-line @typescript-eslint/no-restricted-imports
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
