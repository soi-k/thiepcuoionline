export function toCsv(rows, columns) {
  const escape = (val) => `"${String(val ?? '').replace(/"/g, '""')}"`
  const header = columns.map((c) => escape(c.label)).join(',')
  const lines = rows.map((row) => columns.map((c) => escape(row[c.key])).join(','))
  return [header, ...lines].join('\n')
}
