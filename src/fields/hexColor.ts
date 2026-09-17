import type { Field } from 'payload'

export const hexColorField = (name: string, label: string, placeholder: string): Field => ({
  name,
  type: 'text' as const,
  label,
  admin: {
    placeholder,
    width: '33%',
    components: {
      Field: '/components/admin/ColorPickerField#ColorPickerField',
    },
  },
  validate: (value: unknown) => {
    if (!value) return true
    if (typeof value === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) return true
    return 'ใส่เป็นรหัสสีแบบ hex เช่น #c9962b'
  },
})
