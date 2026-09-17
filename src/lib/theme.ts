const HEX_COLOR_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

export function sanitizeHex(value: unknown): string | null {
  return typeof value === 'string' && HEX_COLOR_RE.test(value) ? value : null
}

export function themeCssVars(vars: Record<string, string | null | undefined>): string {
  return Object.entries(vars)
    .map(([key, value]) => [key, sanitizeHex(value)] as const)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ')
}

export function pageThemeStyle(
  pageTheme?: { headingColor?: string | null; bodyColor?: string | null } | null,
): Record<string, string> | undefined {
  const vars: Record<string, string> = {}
  const heading = sanitizeHex(pageTheme?.headingColor)
  const body = sanitizeHex(pageTheme?.bodyColor)
  if (heading) vars['--color-ink'] = heading
  if (body) vars['--color-body'] = body
  return Object.keys(vars).length > 0 ? vars : undefined
}
