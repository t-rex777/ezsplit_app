export const getAvatarFallbackValue = (value: string): string => {
  const valueArr = value.match(/(^\w)|([ ]\w)/g);

  return valueArr === null
    ? ''
    : valueArr.slice(0, 2).join('').replace(' ', '');
};
