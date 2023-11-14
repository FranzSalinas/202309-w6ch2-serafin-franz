import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ApiRepo } from '../services/api.repo';
import { useCallback, useMemo } from 'react';
import * as ac from '../slice/got.slice';

export function useCharacters() {
  const { characters } = useSelector(
    (state: RootState) => state.characterState
  );
  const dispatch = useDispatch();

  const repo = useMemo(() => new ApiRepo(), []);

  const loadCharacters = useCallback(async () => {
    try {
      const loadedCharacters = await repo.getCharacters();

      dispatch(ac.loadCharacters(loadedCharacters));
    } catch (error) {
      console.log((error as Error).message);
    }
  }, [repo]);

  return {
    loadCharacters,
    characters,
  };
}
