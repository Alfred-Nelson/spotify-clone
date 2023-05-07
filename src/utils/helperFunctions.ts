export const toSlug = (value: string) => {
  return value.toLowerCase().split(" ").join("-");
};

/**
 *
 * @param slug string that shows current location
 * @param array list having data, here playlist
 * @param key to check the key of data object
 * @returns the value found with title = slug
 */
export const findPlaylistFromSlug = (slug: string, array: any[], key: string) => {
  const refactoredSlug = slug.replaceAll("/", "").replaceAll("-", " ");
  const valueFound = array.find(
    (each) => each[key].toLowerCase() === refactoredSlug
  );
  return valueFound;
};


/**
 * calculates total mins by time/60
 * calculates remaining secs by time%60
 * 
 * @param time the time in seconds
 * @returns time in mm:ss format
 */
export const convertToTime = (time: number) => {
    const mins = String(Math.floor(time / 60))
    const seconds = String(time % 60) 
    const formattedTime = `${mins}:${seconds}`
    return(formattedTime)
}
