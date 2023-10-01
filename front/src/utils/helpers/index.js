export function getPercent(total, percent) {
   const result = (100 * percent) / total
   return result === 0 ? result : 100 - result
}
