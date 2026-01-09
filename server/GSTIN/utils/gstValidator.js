
const gstRegex =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const validateGST = (gst) => {
  if (!gst) {
    return { valid: false, error: "GST number is required" };
  }

  gst = gst.toUpperCase();

  // STEP 1: FORMAT CHECK (REGEX)
  if (!gstRegex.test(gst)) {
    return { valid: false, error: "Invalid GST format" };
  }

  // STEP 2: CHECKSUM VALIDATION
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let factor = 2;
  let sum = 0;

  // Loop from 2nd last character to first
  for (let i = gst.length - 2; i >= 0; i--) {
    const codePoint = chars.indexOf(gst[i]);

    let digit = factor * codePoint;
    factor = factor === 2 ? 1 : 2;

    digit = Math.floor(digit / 36) + (digit % 36);
    sum += digit;
  }

  const checkCodePoint = (36 - (sum % 36)) % 36;
  const expectedChecksum = chars[checkCodePoint];
  const actualChecksum = gst[gst.length - 1];

  if (expectedChecksum !== actualChecksum) {
    return { valid: false, error: "GST checksum mismatch" };
  }

  // GST IS VALID
  return { valid: true };
};

module.exports = { validateGST };
