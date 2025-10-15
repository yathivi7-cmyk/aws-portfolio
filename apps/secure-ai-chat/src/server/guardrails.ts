/**
 * Basic moderation function for chat messages.  Returns true if
 * the message is allowed and false if it contains prohibited
 * content.  Banned words can be extended as needed.
 */
const bannedWords = ['hack', 'malicious', 'abuse'];

export function isAllowedMessage(msg: string): boolean {
  const lower = msg.toLowerCase();
  return !bannedWords.some((w) => lower.includes(w));
}