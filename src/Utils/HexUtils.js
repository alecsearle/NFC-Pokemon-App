/**
 * Convert a string to a byte array
 * @param {string} str - The string to convert
 * @returns {Array<number>} - The byte array
 */
export function strToBytes(str) {
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}

/**
 * Convert bytes to a hexadecimal string
 * @param {Array<number>} bytes - The byte array to convert
 * @returns {string} - The hexadecimal string
 */
export function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
}

/**
 * Convert a hexadecimal string to bytes
 * @param {string} hex - The hexadecimal string
 * @returns {Array<number>} - The byte array
 */
export function hexToBytes(hex) {
  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }
  return bytes;
}
