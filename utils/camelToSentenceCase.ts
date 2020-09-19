export default (str: string): string => {
  const temp = str.replace(/([A-Z])(?=[A-Z][a-z])|([a-z])(?=[A-Z])/g, "$& ");
  return temp.charAt(0).toUpperCase() + temp.slice(1);
};
