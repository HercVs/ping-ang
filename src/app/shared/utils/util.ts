/**
 * Returns a compare function to be used by Array.sort(),
 * sorts an array of objects in ascending order by using
 * a property of the objects.
 * @param key  The property to use for sorting.
 * @returns  Comparing function to be used along with builtin sort().
 */
export function byProperty<T>(key: keyof T) {
	return function (a: T, b: T) {
		const valueA = a[key];
		const valueB = b[key];
		return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
	};
}
