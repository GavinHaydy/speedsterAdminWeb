import { createSlice } from '@reduxjs/toolkit';

import i18n from '@/locales/i18n.ts';

interface LangState {
  lang: string;
}

const initialState: LangState = {
  lang: 'zn',
};

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
      i18n.changeLanguage(action.payload).then();
    },
  },
});
// export const selectLang = (state: RootState) => state.;

export const { setLang } = langSlice.actions;
export default langSlice.reducer;
