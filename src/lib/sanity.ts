import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '588hzbh4',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})
//hika
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export interface Product {
  _id: string
  nombre: string
  descripcion?: string
  precio: number
  imagen?: {
    asset: {
      _ref: string
    }
  }
  unidades?: number
}
