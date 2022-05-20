const normalizeDefinitions = (
  arrayDefinitions: readonly string[]
): Record<string, undefined> => {
  return arrayDefinitions.reduce((acc, key) => {
    acc[key] = void 0;
    return acc;
  }, {} as Record<string, undefined>);
};

export default normalizeDefinitions;
