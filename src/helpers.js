export const has = obj => prop => Object.prototype.hasOwnProperty.call(obj, prop);

export const linearGradient = (deg, a, b) => `linear-gradient(${deg}deg, ${a}, ${b})`;
