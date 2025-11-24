import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind classes
 * @param {...any} inputs - Class values to merge
 * @returns {string} Merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format Ethereum address for display
 * @param {string} address - Full Ethereum address
 * @param {number} chars - Number of characters to show on each side
 * @returns {string} Formatted address (e.g., "0x1234...5678")
 */
export function formatAddress(address, chars = 4) {
  if (!address) return "";
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Format token amount with decimals
 * @param {bigint|string} amount - Token amount
 * @param {number} decimals - Number of decimals
 * @param {number} precision - Decimal places to show
 * @returns {string} Formatted amount
 */
export function formatTokenAmount(amount, decimals = 18, precision = 4) {
  if (!amount) return "0";
  const divisor = BigInt(10 ** decimals);
  const whole = amount / divisor;
  const remainder = amount % divisor;
  const decimal = Number(remainder) / Number(divisor);
  return `${whole}.${decimal.toFixed(precision).slice(2)}`;
}

/**
 * Format date for display
 * @param {Date|string|number} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format date with time
 * @param {Date|string|number} date - Date to format
 * @returns {string} Formatted date and time string
 */
export function formatDateTime(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export function truncate(text, length = 50) {
  if (!text) return "";
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
}

