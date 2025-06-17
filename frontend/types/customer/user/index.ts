//準備棄用

export interface Order {
  id: number
  orderNumber: string
  createdAt: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  amount: number
  productId: string
  Product?: {
    name: string
    productId: string
  }
  Card?: {
    iccid: string
  }
}

export interface User {
  id: number
  name: string
  email: string
  Group?: { name: string }
  orderCount?: number
  note: string
  orders: Order[]
  totalSpent?: number
}

export interface ApiResponse<T> {
  code: number
  message: string
  data?: T
}

export interface EsimOrderStatusResponse {
  code: number
  message: string
  data?: {
    order?: {
      orderState?: string
      orderNumber?: string
      created?: string
      updated?: string
    }
    esim?: {
      ICCID?: string
      PHONE_NUMBER?: string
      ACCESS_POINT_NAME?: string
      RECHARGABLE?: string
      ACTIVATION_CODE?: string
      QR_CODE?: string
      LOCAL_PROFILE_ASSISTANT?: string
    }
    providerInfo?: {
      esim?: {
        smdpCode?: string
        status?: string
        installationDate?: string
      }
      packages?: Array<{
        activationDate?: string
        expirationDate?: string
        totalAllowanceMb?: number
        usedMb?: number
      }>
    }
  }
}

export interface Product {
  id: number
  productId: string
  name: string
  productCategory: 'esim_realtime' | 'esim_addon'
  enabled: boolean
  createdAt: string
  updatedAt: string
  Details: {
    providerName: string
    providerLogo: string
    retailPrice: number
    currencyCode: string
    regions: string[]
    countries: string[]
    productDetails: {
      PLAN_DATA_LIMIT: number
      PLAN_VALIDITY: number
      PLAN_DATA_UNIT: string
      HOTSPOT: number
    }
  }
}

export interface OrderResponse {
  result: {
    id?: string
    orderId?: string
  }
} 