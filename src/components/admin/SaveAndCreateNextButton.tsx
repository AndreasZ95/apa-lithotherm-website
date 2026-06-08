'use client'

import type { SaveButtonClientProps } from 'payload'
import { FormSubmit, useDocumentInfo, useEditDepth, useForm, useFormModified, useHotkey, useOperation, useTranslation } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

export function SaveAndCreateNextButton({ label: labelProp }: SaveButtonClientProps) {
  const { collectionSlug, uploadStatus } = useDocumentInfo()
  const { submit } = useForm()
  const modified = useFormModified()
  const operation = useOperation()
  const editDepth = useEditDepth()
  const router = useRouter()
  const { t } = useTranslation()
  const ref = useRef<HTMLButtonElement>(null)

  const label = labelProp || t('general:save')
  const disabled = (operation === 'update' && !modified) || uploadStatus === 'uploading'

  const handleSubmit = async () => {
    if (uploadStatus === 'uploading') return

    const wasCreating = operation === 'create'
    const result = await submit()

    if (wasCreating && collectionSlug && result?.res?.ok) {
      setTimeout(() => {
        router.push(`/admin/collections/${collectionSlug}/create`)
      }, 150)
    }
  }

  useHotkey(
    {
      cmdCtrlKey: true,
      editDepth,
      keyCodes: ['s'],
    },
    (event) => {
      event.preventDefault()
      event.stopPropagation()

      if (!disabled) {
        ref.current?.click()
      }
    },
  )

  return (
    <FormSubmit buttonId="action-save" disabled={disabled} onClick={handleSubmit} ref={ref} size="medium" type="button">
      {label}
    </FormSubmit>
  )
}

