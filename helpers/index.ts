
export const compose = (...functions) => args => functions.reduceRight((arg, fn) => fn(arg), args);
export const alt = (fn1, fn2) => (val) => fn1(val) || fn2(val);

export const isEmpty = (s) => !s || !s.trim();
export const trim = (s) => s.trim();
export const replaceSpacesBy = (simbol) => (s) => s.replace(/\s/g, simbol);
export const replaceSpacesByPlus = replaceSpacesBy("+")

/*eslint no-prototype-builtins: */
export const flattenObject = (ob) => {
  const toReturn = {};

  for (const i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    if (typeof ob[i] == "object") {
      const flatObject = flattenObject(ob[i]);
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        const separator = i + x;
        toReturn[separator] = flatObject[x];
      }
    } else {
      let separator = i;
      if (i === "0") {
        separator = "";
      }
      toReturn[separator] = ob[i];
    }
  }
  return toReturn;
};
