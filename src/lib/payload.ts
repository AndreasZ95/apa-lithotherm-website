import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function getPayloadClient() {
  return getPayload({ config: await configPromise })
}

export function imageUrl(image: unknown): string | null {
  if (image && typeof image === 'object' && 'url' in image && typeof image.url === 'string') {
    return image.url
  }

  return null
}

export function relationTitle(relation: unknown): string {
  if (relation && typeof relation === 'object' && 'name' in relation && typeof relation.name === 'string') {
    return relation.name
  }

  return ''
}
