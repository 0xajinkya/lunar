import { Snowflake } from "@theinternetfolks/snowflake";

/**
 * Generates a uniqueSnowflake ID.
 *
 * This function wraps the `Snowflake.generate()` utility to produce
 * globally unique identifiers that are sortable by creation time.
 *
 * Commonly used for naming files, entity IDs, or S3 keys.
 *
 * @function getId
 * @returns {string} A unique Snowflake ID as a string.
 *
 * @example
 * const id = getId(); // "879139442085453824"
 */
export const getId = () => Snowflake.generate();