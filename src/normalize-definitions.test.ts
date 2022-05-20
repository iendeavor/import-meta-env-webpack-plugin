import normalizeDefinitions from "./normalize-definitions";

test("empty array", () => {
  const definitions = [] as const;

  const result = normalizeDefinitions(definitions);

  expect(result).toEqual({});
});

test("non-empty array", () => {
  const definitions = ["FOO", "BAR"];

  const result = normalizeDefinitions(definitions);

  expect(result).toEqual({
    FOO: undefined,
    BAR: undefined,
  });
});
