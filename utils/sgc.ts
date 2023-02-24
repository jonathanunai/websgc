// capitalize each word in a string
export function formatDate(date: string): string {
  const [y, m, d] = date.split('-')
  const months = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ]
  return `${months[Number(m) - 1]} ${y}`
}
export function percentage(points: number): number {
  return Math.round(points * 10)
}
