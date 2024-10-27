import crypto from 'crypto';

/**
 * Validates the Telegram init data.
 *
 * @param initData - The init data string from Telegram.
 * @param BOT_TOKEN - The bot token used to verify the init data.
 * @returns A boolean indicating whether the init data is valid.
 *
 */
export function validateInitData(initData: string, BOT_TOKEN: string): boolean {
  // Parse the query string into key-value pairs
  const parsedData = new URLSearchParams(initData);
  const hash = parsedData.get('hash');

  if (!hash) {
    console.error('Hash not found in initData');
    return false;
  }

  parsedData.delete('hash');

  // Convert the iterator to an array and sort the parameters
  const sortedParams = Array.from(parsedData.entries())
    .map(([key, value]) => `${key}=${value}`)
    .sort()
    .join('\n');

  // Compute the secret key
  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(BOT_TOKEN)
    .digest();

  // Compute the HMAC SHA-256 hash
  const computedHash = crypto
    .createHmac('sha256', secretKey)
    .update(sortedParams)
    .digest('hex');

  // Compare hashes
  return computedHash === hash;
}

export default validateInitData;
