

export function generateUniqueId(prefix) {
  return crypto.getRandomValues(new Uint32Array(2)).join('-');
}

export function isRequired(error) {
  throw new Error(error);
}

