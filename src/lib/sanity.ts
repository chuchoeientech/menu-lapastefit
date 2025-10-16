import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Configuración de Sanity
// Usa variables de entorno para mayor seguridad
const config = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '588hzbh4',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01', // Usa la fecha actual o más reciente
  useCdn: true, // Para mejor rendimiento
  //token: import.meta.env.VITE_SANITY_API_TOKEN || 'TU_API_TOKEN',
};

// Crear cliente de Sanity
export const client = createClient(config);

// Configurar constructor de URLs de imágenes
const builder = imageUrlBuilder(client);

// Función helper para generar URLs de imágenes
export const urlFor = (source: any) => builder.image(source);

// Tipos TypeScript para los productos
export interface SanityProduct {
  _id: string;
  nombre: string;
  precio: number | null;
  descripcion?: string | null;
  imagen?: any;
  unidades?: number | null;
}

// Función para obtener todos los productos
export async function getProducts(): Promise<SanityProduct[]> {
  try {
    const query = `*[_type == "products"] | order(nombre asc) {
      _id,
      nombre,
      precio,
      descripcion,
      imagen,
      unidades
    }`;
    
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.error('Error fetching products from Sanity:', error);
    throw error;
  }
}

// Función para obtener un producto por slug
export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
  try {
    const query = `*[_type == "products" && slug.current == $slug][0] {
      _id,
      nombre,
      precio,
      descripcion,
      imagen,
      unidades
    }`;
    
    const product = await client.fetch(query, { slug });
    return product;
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    throw error;
  }
}
