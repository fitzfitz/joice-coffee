export type State = {
  isFirstLaunched: boolean;
};

export type Action = {
  setIsFirstLaunched: (isFirstLaunched: boolean) => void;
};
