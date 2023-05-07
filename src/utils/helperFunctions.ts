export const toSlug = (value: string) => {
  return value.toLowerCase().split(" ").join("-");
};

/**
 *
 * @param slug string that shows current location
 * @param array list having data, here playlist
 * @param key to check the key of data object
 * @returns boolean showing the slug is present in the array with the given key
 */
export const checkIfSlugPresent = (slug: string, array: any[], key: string) => {
  const refactoredSlug = slug.replaceAll("/", "").replaceAll("-", " ");
  const hasSlug = array.some(
    (each) => each[key].toLowerCase() === refactoredSlug
  );
  return hasSlug;
};
