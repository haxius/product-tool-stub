/*
 * Degrees to Radians
 * 
 * Formula
 * ==============================================
 * r = a * (PI / 180)
 * where a is an arbitrary number of degrees
 */
export const deg2Rad = d => d * (Math.PI / 180);

/*
 * Radians to Degrees
 * 
 * Formula
 * ==============================================
 * r = a * (180 / PI)
 * where a is an arbitrary number of radians
 */
export const rad2Deg = r => r * (180 / Math.PI);
