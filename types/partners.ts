export interface Partner {
    id: string
    name: string
    location: string
    vehicles: number
    avgResponseTime: string
    status: "On Duty" | "Off Duty" | "Busy"
    photo?: string
  }
  
  export interface PartnerProfile {
    id: string
    name: string
    role: string
    emailAddress: string
    contactNumber: string
    address: string
    startDate: string
    endDate: string
    vehicles: number
    payment: {
      bankName: string
      accountNumber: string
      frequency: string
    }
    assignedItems: string[]
  }
  
  export interface PartnerMetrics {
    activePartners: {
      value: number
      change: string
      timeframe: string
    }
    avgResponseTime: {
      value: string
      change: string
      timeframe: string
    }
    customerSatisfaction: {
      value: number
      change: string
      timeframe: string
    }
    revenue: {
      value: string
      change: string
      timeframe: string
    }
  }
  
  