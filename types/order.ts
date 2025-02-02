export interface Order {
    id: string
    customerName: string
    location: string
    time: string
    responderId: string
    status: "New" | "In Progress" | "Resolved" | "Canceled"
  }
  
  export interface MonthlyStats {
    totalOrders: number
    completedOrders: number
    canceledOrders: number
    avgResponseTime: string
    totalRevenue: string
    peakTimes: string
    changes: {
      totalOrders: string
      completedOrders: string
      canceledOrders: string
      avgResponseTime: string
      totalRevenue: string
      peakTimes: string
    }
  }
  
  export interface OrderTrendData {
    date: string
    resolved: number
    canceled: number
  }
  
  export interface OrderDetails {
    id: string;
    status: string;
    customer: {
      name: string;
      contact: string;
      email: string;
    };
    location: {
      address: string;
      city: string;
      state: string;
      zip: string;
      dropoff: string;
    };
    responder: {
      id: string
      name: string;
      status?: string
      contact: string
      eta?: string
      role: string
      currentLocation: string
    };
    activities: readonly {
      time: string;
      activity: string;
      note: string;
    }[];
  }