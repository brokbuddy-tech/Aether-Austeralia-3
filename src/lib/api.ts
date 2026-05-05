function getRequiredPublicEnv(name: string) {
  const value = (((globalThis as any).process?.env?.[name]) || '') as string;
  const normalized = value.trim();
  if (!normalized) {
    throw new Error(`Missing required public env variable: ${name}`);
  }
  return normalized;
}

export const ORG_SLUG = getRequiredPublicEnv('NEXT_PUBLIC_ORG_SLUG');

function normalizeApiBaseUrl(value: string) {
  const normalized = value.trim().replace(/\/+$/, '');
  if (!normalized) return '';
  if (/\/api$/i.test(normalized)) return normalized;
  if (/\/api\/public$/i.test(normalized)) return normalized.replace(/\/public$/i, '');
  return `${normalized}/api`;
}

const API_BASE_URL = normalizeApiBaseUrl(
  ((globalThis as any).process?.env?.NEXT_PUBLIC_API_URL) || 'http://localhost:4000'
);
const API_ORIGIN = API_BASE_URL.replace(/\/api$/i, '');
const TEMPLATE_HEX_CODE = getRequiredPublicEnv('NEXT_PUBLIC_TEMPLATE_HEX_CODE').toLowerCase();

function getPublicTemplateUrl(path = '') {
  const normalizedPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const publicTemplatePath = ['public', 'templates', ORG_SLUG, TEMPLATE_HEX_CODE]
    .filter(Boolean)
    .join('/');
  return `${API_BASE_URL}/${publicTemplatePath}${normalizedPath}`;
}

async function safeFetch(url: string, extraOpts?: RequestInit & { next?: any }, timeoutMs = 10000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const opts: RequestInit = { ...extraOpts, signal: controller.signal };

  if (typeof window !== 'undefined') {
    delete (opts as any).next;
  }

  try {
    return await fetch(url, opts);
  } catch {
    return new Response(null, { status: 503, statusText: 'Service Unavailable' });
  } finally {
    clearTimeout(timer);
  }
}

function getStringValue(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim().length > 0) return value.trim();
  }
  return undefined;
}

function getNumberValue(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string' && value.trim().length > 0) {
      const parsed = Number(value.replace(/,/g, ''));
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return undefined;
}

function normalizeListingDescription(description?: string) {
  const plainText = (description || '')
    .replace(/<\s*br\s*\/?>/gi, '\n')
    .replace(/<\/\s*(div|p|section|article|h[1-6])\s*>/gi, '\n\n')
    .replace(/<\/\s*li\s*>/gi, '\n')
    .replace(/<\s*li\b[^>]*>/gi, '- ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();

  return plainText || 'Property details coming soon.';
}

type ListingImage = {
  id?: string | null;
  url?: string | null;
  mediumUrl?: string | null;
  thumbnailUrl?: string | null;
  cdnUrl?: string | null;
  variants?: Record<string, string> | null;
};

type RawListing = {
  id: string;
  title?: string;
  description?: string;
  category?: string;
  propertyType?: string;
  transactionType?: string;
  readiness?: string;
  status?: string;
  price?: number | string;
  currency?: string;
  area?: string;
  subArea?: string;
  emirate?: string;
  streetAddress?: string;
  address?: string;
  bedrooms?: number | string | null;
  bathrooms?: number | string | null;
  builtUpArea?: number | string | null;
  areaM2?: number | string | null;
  landSize?: number | string | null;
  size?: number | string | null;
  carSpaces?: number | string | null;
  parkingSpaces?: number | string | null;
  parking?: number | string | null;
  garageSpaces?: number | string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  amenities?: string[];
  images?: ListingImage[];
  broker?: {
    firstName?: string;
    lastName?: string;
    phone?: string | null;
    email?: string | null;
    brokerProfile?: {
      displayName?: string | null;
      publicPhone?: string | null;
      publicEmail?: string | null;
      whatsapp?: string | null;
    } | null;
  } | null;
};

export type VelaProperty = {
  id: string;
  title: string;
  price: string;
  priceNumeric: number;
  location: string;
  address: string;
  beds: number;
  baths: number;
  cars: number;
  area: number;
  imageUrl: string;
  imageHint?: string;
  galleryImages: string[];
  agentName: string;
  agentPhone?: string;
  agentEmail?: string;
  agentWhatsapp?: string;
  tag: "New Listing" | "Auction" | "Exclusive" | "For Sale" | "For Rent" | "Sold" | "Record Price" | "Premium Office" | "Industrial" | "Medical/Consulting" | "Showroom/Warehouse" | "Retail" | "Development Site";
  description: string;
  amenities: string[];
  transactionType: 'SALE' | 'RENT';
  status: string;
  category: string;
  type: string;
  propertyType: string;
  latitude: number | null;
  longitude: number | null;
};

export type VelaPropertyResults = {
  properties: VelaProperty[];
  total: number;
  page: number;
  totalPages: number;
};

function toAbsoluteImageUrl(path: string) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}

function getPublicListingMediaUrl(
  image?: ListingImage | null,
  variant: 'thumbnail' | 'medium' | 'compressed' | 'original' = 'compressed'
) {
  if (!image?.id) return '';
  return getPublicTemplateUrl(`/images/${image.id}/view?variant=${variant}`);
}

function getListingImageUrl(image?: ListingImage | null) {
  if (!image) return '';
  const publicImageUrl = getPublicListingMediaUrl(image, 'compressed');
  if (publicImageUrl) return publicImageUrl;

  return toAbsoluteImageUrl(
    image.mediumUrl
      || image.thumbnailUrl
      || image.url
      || image.cdnUrl
      || image.variants?.medium
      || image.variants?.original
      || ''
  );
}

function getGalleryImages(images?: ListingImage[]) {
  return Array.from(
    new Set(
      (images || [])
        .map((image) => getListingImageUrl(image))
        .filter(Boolean)
    )
  );
}

function getTag(listing: RawListing): VelaProperty["tag"] {
  if (listing.status?.toUpperCase() === 'SOLD') {
    return (getNumberValue(listing.price) || 0) >= 5_000_000 ? 'Record Price' : 'Sold';
  }

  if (listing.transactionType?.toUpperCase() === 'RENT') {
    return 'For Rent';
  }

  if (listing.propertyType?.toUpperCase() === 'COMMERCIAL') {
    const category = (listing.category || '').toLowerCase();
    if (category.includes('office')) return 'Premium Office';
    if (category.includes('warehouse') || category.includes('industrial')) return 'Industrial';
    if (category.includes('medical')) return 'Medical/Consulting';
    if (category.includes('showroom')) return 'Showroom/Warehouse';
    if (category.includes('retail') || category.includes('shop')) return 'Retail';
    return 'Development Site';
  }

  if (listing.readiness?.toUpperCase() === 'OFFPLAN') return 'Auction';
  if ((getNumberValue(listing.price) || 0) >= 5_000_000) return 'Exclusive';
  return 'For Sale';
}

export function mapListingToVelaProperty(listing: RawListing): VelaProperty {
  const galleryImages = getGalleryImages(listing.images);
  const priceNumeric = getNumberValue(listing.price) || 0;
  const location = [listing.subArea, listing.area, listing.emirate].filter(Boolean).join(', ') || 'Australia';
  const address = getStringValue(listing.streetAddress, listing.address, listing.title, location) || 'Address on request';

  return {
    id: listing.id,
    title: getStringValue(listing.title, address) || 'Untitled Property',
    price: priceNumeric.toLocaleString('en-AU'),
    priceNumeric,
    location,
    address,
    beds: getNumberValue(listing.bedrooms) || 0,
    baths: getNumberValue(listing.bathrooms) || 0,
    cars: getNumberValue(listing.carSpaces, listing.parkingSpaces, listing.parking, listing.garageSpaces) || 0,
    area: getNumberValue(listing.areaM2, listing.builtUpArea, listing.landSize, listing.size) || 0,
    imageUrl: galleryImages[0] || 'https://picsum.photos/seed/vela-fallback/1200/800',
    imageHint: 'Australian premium property',
    galleryImages,
    agentName: getStringValue(
      listing.broker?.brokerProfile?.displayName,
      [listing.broker?.firstName, listing.broker?.lastName].filter(Boolean).join(' ')
    ) || 'Vela Armon Advisor',
    agentPhone: getStringValue(listing.broker?.brokerProfile?.publicPhone, listing.broker?.phone),
    agentEmail: getStringValue(listing.broker?.brokerProfile?.publicEmail, listing.broker?.email),
    agentWhatsapp: getStringValue(listing.broker?.brokerProfile?.whatsapp),
    tag: getTag(listing),
    description: normalizeListingDescription(listing.description),
    amenities: Array.isArray(listing.amenities) ? listing.amenities : [],
    transactionType: listing.transactionType?.toUpperCase() === 'RENT' ? 'RENT' : 'SALE',
    status: listing.status || 'ACTIVE',
    category: listing.category || 'Property',
    type: getStringValue(listing.category, listing.propertyType) || 'Property',
    propertyType: listing.propertyType || 'RESIDENTIAL',
    latitude: getNumberValue(listing.latitude) ?? null,
    longitude: getNumberValue(listing.longitude) ?? null,
  };
}

export async function getListings(params: Record<string, string | number | undefined> = {}): Promise<VelaPropertyResults> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const response = await safeFetch(
    `${getPublicTemplateUrl('/listings')}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`,
    { next: { revalidate: 120 } } as any
  );

  if (!response.ok) {
    return { properties: [], total: 0, page: 1, totalPages: 1 };
  }

  const data = await response.json();
  const rawListings = Array.isArray(data) ? data : (data.listings || []);

  return {
    properties: rawListings.map(mapListingToVelaProperty),
    total: data.total || rawListings.length,
    page: data.page || 1,
    totalPages: data.totalPages || 1,
  };
}

export async function getPropertyById(id: string): Promise<VelaProperty | null> {
  const response = await safeFetch(getPublicTemplateUrl(`/listings/${id}`), { next: { revalidate: 120 } } as any);
  if (!response.ok) return null;
  return mapListingToVelaProperty(await response.json());
}
